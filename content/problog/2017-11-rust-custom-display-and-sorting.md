+++
title = "rust custom Display and sorting"
slug = "2017/11/rust-custom-display-and-sorting/"
date = 2017-11-28T21:16:34.323Z
+++
So as an exercise I wanted to make a rust struct with custom order and blog the process. I did this in my tealeaves project to get some data to group/sort by severity (errors then warnings then infos) and it worked nicely but it was mostly the derived implementations and I wanted to review. So let's make a basic Person struct (very similar to the example in the official rust docs, but we'll get fancier).

```rust
struct Person {
    name: String,
}

fn main() {
    println!("{}", Person { name: "Sheena".to_string() });
}
```

"No can do!" says the compiler:

```
error[E0277]: the trait bound `Person: std::fmt::Display` is not satisfied
 --> src/main.rs:6:20
  |
6 |     println!("{}", Person { name: "Sheena".to_string() });
  |                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `Person` cannot be formatted with the default formatter; try using `:?` instead if you are using a format string
  |
  = help: the trait `std::fmt::Display` is not implemented for `Person`
  = note: required by `std::fmt::Display::fmt`

error: aborting due to previous error
```

OK, let's make Person displayable.

```rust
use std::fmt;

struct Person {
    name: String,
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name)
    }
}

fn main() {
    println!("{}", Person { name: "Sheena".to_string() });
}
```
We run that and it prints "Sheena". Pretty neat!

OK but now I wanted to make my Person struct sortable by age. As is often the case in rust, one part of this was way harder than in most languages and another part was also way harder than in other languages :-p.

First, we need a way to compute a person's age based on their birthday, so I extended my Person struct to also store a `born` property, but in order to model that as a calendar date, we need the `chrono` crate and a while reading the docs to figure out what type we should use. After my research, I decided `chrono::NaiveDate` would be viable.

```rust
extern crate chrono;
use chrono::NaiveDate;
use std::fmt;

struct Person {
    name: String,
    born: NaiveDate,

}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name)
    }
}

fn main() {
    println!("{}", Person { name: "Sheena".to_string(), born: NaiveDate::from_ymd(1970, 1, 17) });
}
```

OK now I wanted a more concise way to define instances of Person, so I added a constructor function.

```rust
extern crate chrono;
use chrono::NaiveDate;
use std::fmt;

struct Person {
    name: String,
    born: NaiveDate,
}

impl Person {
    pub fn new(name: String, year: i32, month: u32, day: u32) -> Self {
        Person {
            name,
            born: NaiveDate::from_ymd(year, month, day),
        }
    }
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name)
    }
}

fn main() {
    println!("{}", Person::new("Sheena".to_string(), 1970, 1, 17));
}
```

Next let's write an `age` function so we can see how old a person is at this moment. Again I had to read the docs for a long time, and there may be a better way to do this, but my basic approach ended up being get a Duration between now and their birthday, convert that to a number of days, and divide by 365 to get something approximately yearish. While we're at it we'll update our Display trait to print their age.

```rust
extern crate chrono;
use chrono::NaiveDate;
use chrono::Local;
use std::fmt;

struct Person {
    name: String,
    born: NaiveDate,
}

impl Person {
    pub fn new(name: String, year: i32, month: u32, day: u32) -> Self {
        Person {
            name,
            born: NaiveDate::from_ymd(year, month, day),
        }
    }

    pub fn age(&self) -> i64 {
        NaiveDate::signed_duration_since(Local::today().naive_local(), self.born).num_days() / 365
    }
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} (age: {})", self.name, self.age())
    }
}

fn main() {
    println!("{}", Person::new("Sheena".to_string(), 1970, 1, 17));
}
```

OK now to make them sortable by age we need 4 total traits: `Eq, PartialEq, Ord, and PartialOrd`. `Eq` we can derive satisfactorily. The other three are mostly  boilerplate we copy from the rust documentation and adjust to sort people based on their `born` attribute with youngest first.

```rust
extern crate chrono;
use chrono::{NaiveDate, Local};
use std::{cmp, fmt};

#[derive(Eq)]
struct Person {
    name: String,
    born: NaiveDate,
}

impl Person {
    pub fn new(name: String, year: i32, month: u32, day: u32) -> Self {
        Person {
            name,
            born: NaiveDate::from_ymd(year, month, day),
        }
    }

    pub fn age(&self) -> i64 {
        NaiveDate::signed_duration_since(Local::today().naive_local(), self.born).num_days() / 365
    }
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Person) -> Option<cmp::Ordering> {
        Some(other.cmp(self))
    }
}

impl Ord for Person {
    fn cmp(&self, other: &Person) -> cmp::Ordering {
        self.born.cmp(&other.born)
    }
}

impl PartialEq for Person {
    fn eq(&self, other: &Person) -> bool {
        self.born == other.born
    }
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} (age: {})", self.name, self.age())
    }
}

fn main() {
    let mut people = vec![];
    people.push(Person::new("Imogen Heap".to_string(), 1977, 12, 9));
    people.push(Person::new("Fatboy Slim".to_string(), 1963, 7, 31));
    people.push(Person::new("Weird Al".to_string(), 1959, 10, 23));
    people.push(Person::new("Zoë Keating".to_string(), 1972, 2, 2));
    people.sort();
    for person in people.iter() {
        println!("{}", person);
    }
}
```

So now we run this and we see a nice display format for people and they are sorted youngest first:

```
Imogen Heap (age: 39)
Zoë Keating (age: 45)
Fatboy Slim (age: 54)
Weird Al (age: 58)
```
