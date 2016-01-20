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

    -h, --help         output usage information
    -V, --version      output the version number
    -t, --type [type]  Type of crawler to use

```

## Built-in modules

- [google](https://github.com/korczis/microcrawler-ng/blob/master/lib/modules/google.js)
- [hackernews](https://github.com/korczis/microcrawler-ng/blob/master/lib/modules/hackernews.js)
- [xkcd](https://github.com/korczis/microcrawler-ng/blob/master/lib/modules/xkcd.js)
- [youjizz](https://github.com/korczis/microcrawler-ng/blob/master/lib/modules/youjizz.js)

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
