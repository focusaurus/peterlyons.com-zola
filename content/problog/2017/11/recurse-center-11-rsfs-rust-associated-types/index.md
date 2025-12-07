+++
title = "Recurse Center 11: rsfs rust associated types"
date = 2017-11-21T23:01:17.418Z
+++
So I'm working on a tool that will interact heavily with the filesystem. This has always presented a unit testing problem both from a test speed perspective but as well as the perspective of simulating unusual errors.

Yesterday I shopped on crates.io and found the `filesystem` crate which looked to be built exactly to what I needed. However, I quickly discovered it was missing some key things like exposing a file's size without having to read it and getting detailed permissions.

Today I shopped again and found `rsfs` which had the detailed unix stuff I needed. In theory I want to be able to use the real filesystem when my tool is run for real and a throw-away in-memory filesystem for unit tests (including being able to simulate rare error cases). In my mind this meant passing in some abstract filesystem interface to the guts of my module as a function argument. So I set out to learn the basics of the `rsfs` crate.

Here's the first thing that prints out the permissions mode in octal of a real file that exists on my filesystem.

```rust
extern crate rsfs;
use rsfs::GenFS; // trait gives us .metadata()
use rsfs::Metadata; // trait gives us .permissions()
use rsfs::unix_ext::PermissionsExt; // trait gives us .mode()

fn main() {
    let fs  = rsfs::disk::FS;
    let meta = fs.metadata("/tmp/foo.txt").unwrap();
    let perms = meta.permissions();
    let mode = perms.mode();
    println!("{:o}", mode);
}
```
----
```sh
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running `target/debug/fstool`
644

$ chmod 755 /tmp/foo.txt

$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running `target/debug/fstool`
755
```

OK, so far so good. Now, can we simulate that with an in-memory filesystem?

```rust
extern crate rsfs;
use rsfs::GenFS; // trait gives us .metadata()
use rsfs::Metadata; // trait gives us .permissions()
use rsfs::unix_ext::PermissionsExt; // trait gives us .mode()

fn main() {
    let fs  = rsfs::mem::unix::FS::new();
    fs.create_dir_all("/tmp").unwrap();
    fs.create_file("/tmp/foo.txt").unwrap();
    let meta = fs.metadata("/tmp/foo.txt").unwrap();
    let perms = meta.permissions();
    let mode = perms.mode();
    println!("{:o}", mode);
}

// fn main_disk() {
//     let fs  = rsfs::disk::FS;
//     let meta = fs.metadata("/tmp/foo.txt").unwrap();
//     let perms = meta.permissions();
//     let mode = perms.mode();
//     println!("{:o}", mode);
// }
```
----
```sh
$ cargo run
   Compiling fstool v0.1.0 (file:///private/tmp/x)
    Finished dev [unoptimized + debuginfo] target(s) in 1.11 secs
     Running `target/debug/fstool`
666
```

Yup, looks acceptable.

OK let's try to extract a helper function that works on either. My first thought would be the filesystem argument would be of type `rsfs::GenFS` which is the "generic filesystem" trait whose whole purpose is to be agnostic about which specific filesystem implementation is used.

```rust
extern crate rsfs;
use rsfs::GenFS; // trait gives us .metadata()
use rsfs::Metadata; // trait gives us .permissions()
use rsfs::unix_ext::PermissionsExt; // trait gives us .mode()

fn get_mode(fs: &GenFS, path: &str) -> u32 {
    let meta = fs.metadata(path).unwrap();
    let perms = meta.permissions();
    let mode = perms.mode();
    mode
}

fn main() {
    let mem = rsfs::mem::unix::FS::new();
    mem.create_dir_all("/tmp").unwrap();
    mem.create_file("/tmp/foo.txt").unwrap();

    let disk = rsfs::disk::FS;

    println!("{:o}", get_mode(mem, "/tmp/foo.txt"));
    println!("{:o}", get_mode(disk, "/tmp/foo.txt"));
}
```
----
```sh
$ cargo run
   Compiling fstool v0.1.0 (file:///private/tmp/x)
error[E0191]: the value of the associated type `DirBuilder` (from the trait `rsfs::GenFS`) must be specified
 --> src/main.rs:6:18
  |
6 | fn get_mode(fs: &GenFS, path: &str) -> u32 {
  |                  ^^^^^ missing associated type `DirBuilder` value

error[E0191]: the value of the associated type `Permissions` (from the trait `rsfs::GenFS`) must be specified
 --> src/main.rs:6:18
  |
6 | fn get_mode(fs: &GenFS, path: &str) -> u32 {
  |                  ^^^^^ missing associated type `Permissions` value

error[E0191]: the value of the associated type `ReadDir` (from the trait `rsfs::GenFS`) must be specified
 --> src/main.rs:6:18
  |
6 | fn get_mode(fs: &GenFS, path: &str) -> u32 {
  |                  ^^^^^ missing associated type `ReadDir` value

error[E0191]: the value of the associated type `Metadata` (from the trait `rsfs::GenFS`) must be specified
 --> src/main.rs:6:18
  |
6 | fn get_mode(fs: &GenFS, path: &str) -> u32 {
  |                  ^^^^^ missing associated type `Metadata` value

error[E0191]: the value of the associated type `OpenOptions` (from the trait `rsfs::GenFS`) must be specified
 --> src/main.rs:6:18
  |
6 | fn get_mode(fs: &GenFS, path: &str) -> u32 {
  |                  ^^^^^ missing associated type `OpenOptions` value

error[E0191]: the value of the associated type `DirEntry` (from the trait `rsfs::GenFS`) must be specified
 --> src/main.rs:6:18
  |
6 | fn get_mode(fs: &GenFS, path: &str) -> u32 {
  |                  ^^^^^ missing associated type `DirEntry` value

error[E0191]: the value of the associated type `File` (from the trait `rsfs::GenFS`) must be specified
 --> src/main.rs:6:18
  |
6 | fn get_mode(fs: &GenFS, path: &str) -> u32 {
  |                  ^^^^^ missing associated type `File` value

error: aborting due to 7 previous errors

error: Could not compile `fstool`.

To learn more, run the command again with --verbose.
```

Damn, the compiler sure is mad about a bunch of associated types. OK let's try to specify the associated types, at least for the bits we think we really need.

We tried many variants and sadly I can't really walk you through the whole sequence of compiler error, code change, rinse repeat, but it was probably 19 iterations. We knew that basically when we called `.metadata().permissions()` we needed to tell the type system "Hey, use PermissionsExt there because that has the .mode() function we need and don't just give me back Permissions because there's no .mode() function there". But because that's nested underneath the Metadata associated type, we had to first say, OK for Metadata, we want a Permissions associated type that has all the combined functionality of both Permissions and PermissionsExt, which looks like `Permissions + PermissionExt` in trait sublanguage.

However, the syntax here doesn't let us write it exactly that way. We get an error `the trait rsfs::Permissions cannot be made into an object`. At this point I'm basically 2 levels below my depth here but a fellower RCer was pairing with me and knew that we basically needed to define that combination of associated types as `P` and then explain to the typesystem to use it both for our `Metadata` associated type and our `GenFS` type. That ultimately ends up looking like the next snippet. Even though the compiler initially complained about needing ALL the associated types specified, I think because we are only actually using APIs related to permissions, we got away with only specifying the associated types necessary for the API calls we actually use in our code.

```rust
extern crate rsfs;
use rsfs::GenFS; // trait gives us .metadata()
use rsfs::Metadata; // trait gives us .permissions()
use rsfs::unix_ext::PermissionsExt; // trait gives us .mode()
use rsfs::Permissions;

fn get_mode<P: Permissions + PermissionsExt,
            M: Metadata<Permissions = P>,
            F: GenFS<Permissions = P, Metadata = M>>
    (fs: &F,
     path: &str)
     -> u32 {
    let meta = fs.metadata(path).unwrap();
    let perms = meta.permissions();
    let mode = perms.mode();
    mode
}

fn main() {
    let mem = rsfs::mem::unix::FS::new();
    mem.create_dir_all("/tmp").unwrap();
    mem.create_file("/tmp/foo.txt").unwrap();

    let disk = rsfs::disk::FS;

    println!("{:o}", get_mode(&mem, "/tmp/foo.txt"));
    println!("{:o}", get_mode(&disk, "/tmp/foo.txt"));
}
```
----
```sh
$ cargo run
   Compiling fstool v0.1.0 (file:///private/tmp/x)
    Finished dev [unoptimized + debuginfo] target(s) in 1.5 secs
     Running `target/debug/fstool`
666
755
```

Success! We now have a business logic function that works identically on both an in-memory filesystem and the real filesystem. This is pretty exciting for me especially since the rsfs crate docs indicate you can synthesize error cases, which lights up my "100% code coverage" light bulb.
