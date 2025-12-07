+++
title = "Learning elm"
slug = "2016/12/learning-elm/"
date = 2016-12-10T22:19:10.383Z
+++
## A Report from the weeds

So I've been trying to learn [The Elm Programming Language](http://elm-lang.org/), which is a language/architecture for building browser applications. The core ideas have been adopted into react and redux and I consider Elm to be taking the ideas deeper than you can do while still in JavaScript. So elm actually gives you a totally new programming language supporting static types, pure functional programming, and immutability in a high-integrity way.

Why am I bothering? Well, work-wise I've been floating around with abandoning the label of "full-stack developer" and "niching down" as we say in the consulting game to a purely back-end focused consultant. I think the state of browser development now is quite terrible and rapidly getting worse. So learning elm isn't necessarily about doing real apps in it. It's mostly for the experience of learning a program language with static types, immutability, and pure functions.

This post is not a hindsight, well-thought-out summary. I'm actively in the weeds porting an app from Angular 1.x to Elm. This is a snapshot of what I've seen so far. I don't know all of Elm yet, not even half way there. I wanted to write while things are still confusing and chaotic to create an honest snapshot.

**compiler messages**: Elm has a reputation about friendly/good compiler error messages. This plays out to be mostly true. However, I mostly still can't read them because the available docs so far that I've seen don't really teach the language as a language. It's all examples and "type this here" without giving me words and concepts for the syntax. So while the error messages are helpful, I still have to basically keyword scan them and guess what the problem might be.

**examples**: I also read that the elm examples are great. I found them to be almost laughably basic and non-comprehensive. In elm, it turns out that doing an HTTP GET and doing an HTTP POST require significantly different code, but the example only shows you a basic GET and that's not enough to cover the gaps between GET and POST in terms of encoding bodies, interpretting responses, decoding, etc. This was really frustrating several times. Need to decode a simple flat JSON object? Here's a clear example right in the docs. Got an JSON object containing a child object or a list, as you would in any real-world application? Not mentioned at all in the docs, have to ask in slack/FAQ and it turns out to be much more complicated. When dealing with HTML events, the docs mention there are `stopPropagation` and `preventDefault` things, but nothing about how to use them.

**if it compiles, it works**: This is a claim you often see about elm as well as Haskell. I want to state for the record that in my small number of hours programming elm, I have already managed to make at least 2 programs that compiled and ran with incorrect behavior. This did not manifest as runtime exceptions, but the program was wrong nonetheless. In one case I had done a refactoring to split my app up into modules and I ended up with 2 things both named `model`, one of which was just returning static initial data. Both worked as used, but one was totally wrong. Another time I was trying to decode a string enum (think names of playing card suits like "diamonds", "hearts", "spades", "clubs") to elm types. I had a version that compiled and ran but because I was doing decoding wrong, it was always hitting my default "unrecognized value" pattern match and using the default. My success pattern matches would never have matched. Only found it when the app was misbehaving.

**syntax**: Elm's syntax is I think mostly OK. I'm not used to the comma-first thing `elm-format` does and at the moment it fails to provide clean git diffs and defeats sorting properties, which I like to do. So if I had to make a call now, I'd say it's terrible but I'm keeping an open mind until I have more hours in the trenches. I'm also not sure why the function name must be repeated above the type annotation. Seems totally unnecessary. I don't like the ambiguity between calling a function and referencing a variable in scope. This has annoyed me in ruby as well. I prefer these 2 things to have different syntax. It's also weird that if you declare a function with no arguments, it's not a function, it's just a value. Same syntax, but declare at least 1 argument and you get a function. I understand why this is possible and that a function without arguments does not make sense in a side-effect-free language, but still I find the lack of syntax distinction unclear and confusing to read.

**docs**: The core language/library docs are coded in way that all of the current module's functions are directly in scope so they are bare references like `decodeString` or even just `int` which is actually `Json.Decode.int`. This is completely baffling to me as a beginner. I can't go into the `elm-repl` and type what I see. They are not written the way you would write them in an application using the module. You can't copy/paste them and most of the time you are confused about which module each name belongs to. I also now realize that almost without exception the core docs examples use ONLY functions from the module at hand. They aren't real-world use cases combining modules to do something useful. They are super-isolated 1-liners. The JSON docs make no mention of how to decode dates. I had to go find a community module.

**order of constructor params**: After banging my head against a compiler error message, I eventually figured out that when you define a type, the order that you declare the named fields matters. When you construct that type, you must pass things in that order, even though the fields have names. This came as a total shock to me. So for example:

```elm
-- given this type alias
type alias Entry =
    { id : Int
    , body : String
    , tags : List String
    , created : Date
    }

-- If I want to decode from JSON,
-- which I do in a different file

entriesDecoder : JD.Decoder (List Entry)
entriesDecoder =
    JD.list
        (JD.map4 Entry
            (JD.field "id" JD.int)
            (JD.field "body" JD.string)
            (JD.field "tags" (JD.list JD.string))
            (JD.field "created" Json.Decode.Extra.date)
        )

-- The order of the fields: id, body, tags, created must exactly match!
-- I was staring at compiler error messages for a long time
-- It is actually mentioned in the docs, but it didn't click with me
-- exactly what the docs meant
```

**BDFL issues?**: I'm not deep enough in it to really comment here, but talking with friends it seems like the community enthusiasm is outpacing evancz's ability to review and accept PRs, even just people expanding the documentation. At the moment there's a [1-line doc add PR](https://github.com/elm-lang/elm-lang.org/pull/597) that's been open for 6 months. I'm still keeping hope alive that time will sort this out, but at the moment I'm worried things are not in a good state in terms of community in the actual codebases. The slack channel though is very active and helpful.

----
Anyway I'm still charging forward with both my Angular to Elm side project port and reading the early access "Elm in Action" book as it comes out. More posts on this topic as things progress.
