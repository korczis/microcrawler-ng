# microcrawler-ng

Microcrawler

## Features

- Simple to use
- Written using modern javascript
- Easy to write plugins (using jQuery like selectors)

## Usage

```
$ microcrawler

  Usage: microcrawler [options]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -l, --list-modules  List supported crawlers/modules
    -t, --type [type]   Type of crawler to use
```

## Built-in modules

You can list built-in modules with following command:

`microcrawler -l`

***Output***

```
┌────────────┬──────────────────────────────┐
│ Name       │ URL                          │
├────────────┼──────────────────────────────┤
│ google     │ https://google.com           │
├────────────┼──────────────────────────────┤
│ hackernews │ https://news.ycombinator.com │
├────────────┼──────────────────────────────┤
│ xkcd       │ http://xkcd.com              │
├────────────┼──────────────────────────────┤
│ youjizz    │ http://youjizz.com           │
└────────────┴──────────────────────────────┘
```

## Examples

Examples how to use built-in modules.

### google

`microcrawler -t google "https://google.com/search?hl=en&q=korczis"`

### hackernews

`microcrawler -t hackernews https://news.ycombinator.com`

### xkcd

`microcrawler -t xkcd http://xkcd.com/`

### youjizz

`microcrawler -t youjizz http://youjizz.com`
