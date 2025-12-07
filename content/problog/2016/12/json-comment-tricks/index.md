+++
title = "JSON comment tricks"
date = 2016-12-10T21:18:24.497Z
+++
So as you have probably learnt and been frustrated by, JSON does not officially support comments. This, as I understand it, was done intentionally by JSON's creator Douglas Crockford to prevent abuse of comments for non-standard metadata. Be that as it may, and it may make sense for a data interchange format, JSON is used for configuration files commonly and the lack of comments can be frustrating. Here's some hacky tricks I sometimes use.

## Disable keys with a prefix

Let's say I need to quickly switch a config file between a version with and without a certain value:

```json
{"proxy": "http://proxy.example.com:8765"}
```

To disable it, I "comment it out" by changing the name of  the property.

```json
{"OFFproxy": "http://proxy.example.com:8765"}
```

Usually this has the desired effect and no ill side effects. I can imagine there are strict cases where it won't work, but mostly it's effective.

## Add comments above

Here's how I add "comments"

```json
{
  "// Use this when in the Narnia office": 0,
  "OFFproxy": "http://proxy-na.example.com:8765",
  "// Use this when in the Whoville office": 0,
  "proxy": "http://proxy-wv.example.com:8765"
}
```

I just start a key with "//" and set the value to zero. Usually works OK.
