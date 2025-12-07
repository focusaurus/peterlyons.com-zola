+++
title = "Markdown to PDF with weasyprint"
date = 2023-02-21T00:01:47Z
+++

I have a lengthy history of cobbling together tools for working with documents written in markdown and getting them into PDF when interfacing with the default world who are not always plain text die hards. And I'm super excited about this post because this is finally actually both very easy and pretty nice. So I'll save some more of the journey and story for the bottom of this post, but here's the new tooling stack.

## Markdown to HTML with pandoc

I use the trusty old [pandoc](https://pandoc.org/) for this bit. And the beautiful part is all the defaults are fine so something as simple as `echo "# Test 1" | pandoc` spits out the expected HTML. For readability and reliability purposes, in my actual shell function, I have:

```bash
md-to-html() {
  pandoc --from=markdown --to=html
}
```

## HTML to PDF with weasyprint

A colleague pointed me to [weasyprint](https://weasyprint.org/) which is the hero we all need in this workflow. It does require file paths for input and output, but handles `-` meaning stdio just fine, so `weasyprint - -` makes it a standard unix filter. It can take a stylesheet to make the PDF pretty, so here's my final shell function.

```bash
html-to-pdf() {
  weasyprint --stylesheet ~/.config/markdown/screen.css - -
}
```

Of course you can customize the styles, but setting the page size to letter if you are in the US and making smaller margins is a reasonable starting point. Here's my stylesheet.

```css
@page {
  margin: 1cm;
  size: Letter;
}
body {
  margin: 0;
  font-family: sans-serif;
}
```

## Lazy PDF on filesystem ready to email/upload

Here's my final convenience wrapper that lets me have some markdown in a file or copied to my clipboard and easily get a PDF on disk I can upload to whatever agency I'm having to send a PDF to.

```bash
md-to-pdf-file() {
  input="/dev/stdin"
  output=$(mktemp /tmp/file-XXX.pdf)
  case $# in
  0) ;;
  1)
    case "$1" in
    *.md)
      input="$1"
      ;;
    *.pdf)
      output="$1"
      ;;
    *)
      echo "Expecting either a markdown file ending in .md or a PDF file ending in .pdf when run with one argument" 1>&2
      return 10
      ;;
    esac
    ;;
  2)
    input="$1"
    output="$2"
    ;;
  *)
    cat <<EOF
Converts markdown text into a PDF file.

Input and output are determined based on number of command line arguments provided.

With no arguments, markdown will be read from standard input and a PDF file will be generated in /tmp/file-XXX.pdf with a unique temporary filename. The temporary filename will be written to standard output.

With one argument, the file name will be matched based on .md or .pdf extension and treated as input or output accordingly. The input will come from standard input if a .pdf argument is provided, otherwise the .md argument will be processe as input to a temporary output PDF file.

In all cases, the name of the output .pdf file will be written to standard output.
EOF
    return 10
    ;;
  esac
  md-to-html <"${input}" | html-to-pdf >"${output}"
  echo "${output}"
}
```

## Hot reloading

I don't quite have hot reloading really working, but `entr` is great for watching the source markdown file for changes and automatically generating the PDF, which I can have open in `mupdf` and hit "r" to reload it. It's pretty effective while iterating on the stylesheet or checking layout, etc.

## Other tools for markdown rendering

Since I'm biased toward command line tools coded in rust, I previously used `pulldown-cmark` for the markdown to HTML conversion. But arch linux is kind of annoying with rust compiling and there's no binary package for it, so sticking with pandoc for simplicity.

## Other tools for PDF generation

For a while I tried to work with the oldie `wkhtmltopdf`. I tried various headless chrome thingies, most recently [html-pdf-chrome](https://www.npmjs.com/package/html-pdf-chrome) which can automatically fire up a headless chrome process and have it render the PDF. But this needed a small custom javascript file and node and npm and weasyprint has an AUR arch linux package that's ready to go, so I adopted that instead.

## Bonus: Formatting Email Messages

Even though I've grumped and grumped for years on the Internet that copy and paste should NOT retain formatting by default and what a scourge "Paste without formatting" not being the default is, I do like to send a lot of bullet lists in email and being able to compose those as markdown is nice. So my workflow is draft an email in neovim in markdown, copy it to the clipboard, then convert it to HTML and copy that to the clipboard with formatting. Then I can paste into an email and it's formatted correctly. Works in gmail and fastmail.

```
~/bin/paste | pandoc --from=markdown | xclip -t text/html -selection clipboard
```

## Kinda bonus: Slack bullet lists

Slack now kinda converts markdown bullet lists to formatted if you paste or type them in in markdown. It's still mostly slack's weird custom format and there's still no way to just let slack let us use markdown directly, and it doesn't work for all syntax, but it's better than it used to be when it would just send the message as plain text.
