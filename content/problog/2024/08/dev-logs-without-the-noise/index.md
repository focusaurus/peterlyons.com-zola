+++
title = "Dev Logs Without the Noise"
date = 2024-08-24T20:12:16Z
+++

For local development, json logs often have a bunch of fields you might want for production observability, but almost never care about for local development. The script below is a template you can use to filter out fields you know are noise while allowing all other fields to come through unchanged. It'll also pretty-print for easier reading. The basic approach is using `jq` to delete noise fields with some looseness encoded to handle unexpected schema.

The exact filters and selects will need to be tailored for you specific logs, but a project I recently worked on had things roughly as below that were usually noise I wanted to hide.

```bash
# Delete the noisy fields we usually don't care about
# in dev and let jq pretty print and colorize
jq '. |
    del(.request.ip?) |
    del(.duration?) |
    del(.time?) |
    del(.env?) |
    del(.user_id?) |
    del(.msg? | select(. == "request served")) |
    del(.level? | select(. == "INFO")) |
    if .msg? | contains("[core]") then empty else . end |
    del(.revision?)'
```

To use this, pipe you server's json log output to this script. You can throw `tee` in the pipeline too if you want the full unfiltered log to disk, but the pretty version in your terminal.
