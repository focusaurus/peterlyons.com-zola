+++
title = "rust converting bytes chars and strings"
date = 2017-12-16T18:57:12.635Z
+++
I found converting from many representations of essentially the same data really inconsistent and hard to memorize in rust. I was doing a lot of work that frequently switched between text and binary and couldn't find a good quick reference cheat sheet, so I sat down to pair with [Jared McDonald](https://jaredmcdonald.github.io/) at Recurse Center and code one up.

Whether you've got some bytes, chars, Strings, strs, arrays, or vecs, we'll get you from A to B!

```rust
use std::str;

fn main() {
    // This is "hello world" as an array of bytes.
    // You can also start from a byte string b"hello world" and debug print that to get the
    // utf8 encoded decimal values
    println!("hello byte string: {:?}", b"hello world");

    // OK so let's say you have an array of u8s
    let array_of_u8 = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100];

    // [u8] to String (lossy)
    // Any invalid bytes that are not utf8 will be replaced with
    // the unicode replacement character '\u{FFFD}'
    // You get a Cow (Clone on Write) not exactly a String
    let string_utf8_lossy = String::from_utf8_lossy(&array_of_u8);
    println!("string_utf8_lossy: {}", string_utf8_lossy);

    // [u8] to String (result)
    // The non-lossy version needs a vec not an array
    let mut vec_of_u8 = vec![];
    vec_of_u8.extend_from_slice(&array_of_u8);
    let string_utf8_result = String::from_utf8(vec_of_u8).unwrap();
    println!("string_utf8_result: {}", string_utf8_result);

    // [u8] to str (result)
    let str_utf8_result = str::from_utf8(&array_of_u8).unwrap();
    println!("str_utf8_result: {}", str_utf8_result);

    // [u8] to str (lossy)
    // There is no str::from_utf8_lossy. Have to use String::from_utf8_lossy

    // [u8] to Vec<char>
    let vec_of_chars: Vec<char> = array_of_u8.iter().map(|byte| *byte as char).collect();
    println!("vec_of_chars: {:?}", vec_of_chars);

    // Vec<char> to Vec<u8>
    let vec_of_u8s: Vec<u8> = vec_of_chars.iter().map(|c| *c as u8).collect();
    println!("vec_of_u8s: {:?}", vec_of_u8s);

    // Vec<char> to String
    let mut string_of_collected_chars: String = vec_of_chars.iter().collect();
    println!("string_of_collected_chars: {}", string_of_collected_chars);

    // Now we have a mutable String. We can push chars
    string_of_collected_chars.push('!');

    // and we can push a str
    string_of_collected_chars.push_str("!!");

    // String to str
    let str_slice = &string_of_collected_chars[..5];
    println!("str_slice: {}", &str_slice);

    // String to [u8]
    let array_of_u8_from_string = string_of_collected_chars.as_bytes();
    println!("array_of_u8_from_string: {:?}", array_of_u8_from_string);

    // String to Vec<char>
    let vec_of_chars_to_string: Vec<char> = string_of_collected_chars.chars().collect();
    println!("vec_of_chars: {:?}", vec_of_chars_to_string);

    // String from several Strings
    let concat_strings = vec!["abc".to_string(), "def".to_string()].concat();
    println!("concat_strings: {}", concat_strings);
    let joined_strings = vec!["abc".to_string(), "def".to_string()].join("---");
    println!("joined_strings: {}", joined_strings);
}
```
