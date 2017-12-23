# karma-intl-shim

> A Karma shim for the `Intl` for internationalization

## Installation

```
npm install karma-intl-shim --save-dev
```

## Usage 

In your `karma.conf.js` file, add `intl-shim` to the `frameworks` in your `config.set`:

```
config.set({
  frameworks: ["intl-shim"],
```

You may need to also require it in your `plugins` array:

```
plugins: [
  require("karma-intl-shim")
  ]
```

Now when running `karma`, you should not get an error that `Intl` cannot be found.

## Issues

This shim simply attaches the `Intl` library to the window so it's available for testing. 

If you have issues, it's most likely an issue with [`anyearnshaw/Intl.js`](https://github.com/andyearnshaw/Intl.js), issues for the Intl project can be reported [here](https://github.com/andyearnshaw/Intl.js/issues).

## Contributing

Please create a new issue if you find that you have an issue unrelated to `Intl` under [karma-intl-shim](https://github.com/chaseadamsio/karma-intl-shim/issues/new).

Please submit a PR if you have made a modification. PRs will be reviewed within a 72 hour week day period of the initial PR.

### Why is it webpacked?

This project is built with webpack because the `shim.js` is injected into the browser, which we all know doesn't have a "require" and this is an easy way to do that.
