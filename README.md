# Footnotes.js: Footnotes and Sidenotes for HTML Documents

Footnotes.js is a simple library for generating footnotes and sidenotes for html documents.
I use it on my <a href="https://delimitedoptions.com">personal website</a>.

## Usage

You can either build the library yourself (see the `Makefile` for an example of how to do that) or you can just include
the pre-generated `footnotes.js` file, found in the top level directory. If you build the library yourself you will need
to have [parcel](https://parceljs.org/) installed and in your path.

If you include the pre-generated `footnotes.js` in your application you will need to call the `init()` function directly. If you
build using `parcel`, this is already done for you in the `main.js` that `parcel` outputs.

## Customizing

I've tried to make it easy to customize this library to your own use case by using constants for the values that will probably
change in your application. These are mostly css class names so that you can style things the way you want to.

## Building

Footnotes.js is actually a typescript library. Mostly I wrote it this way to try out typescript. However, the compiled
javascript can be found in the file `footnotes.js`. If you want to build it yourself you just need a typescript compiler
that can target ES2016 or above. The command to run is

    tsc -t 'ES2016' footnotes.ts

This will generate a javascript module called `footnotes.js`. You can then use whatever build system you want to in order to
include this in your application.

## Contributing

This software is in the public domain so feel free to modify it and republish it however you want. I may accept PRs
if they are not too complicated and if they contain features I would plausibly use as well. Please don't be offended
if I don't approve your PR. It very likely has nothing to do with the quality of your code or your ideas. I am busy
and do not want to commit to maintaing a project I don't have time to give my full attention to.

If you do fork this software, feel free to let me know and I may link to it from here. But this is in no way an
expectation or a requirement, you can do whatever you want with the software!.
