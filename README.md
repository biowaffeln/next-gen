<div align="center">
  <img src="assets/logo.svg" alt="next-gen logo" height="100px">
  <h1>next-gen</h1>
  <p>The <b>Next</b>.js Codebase <b>Gen</b>erator</p>
</div>

## Getting Started

you can either install `next-gen` globally:

```sh
npm install -g next-gen
```

or run it with directly with `npx`:

```sh
npx next-gen [command]
```

### `next-gen init`

Simply answer the questions in the interactive prompt and a Next.js project will be generated for you.

### `next-gen add [recipe]`

This plugin adds support for various tools and frameworks to an existing Next.js project, all within seconds! To add a recipe, run `next-gen add [recipe]`.

> ⚠️ Warning! This feature is experimental and might modify your code in unexpected ways. It's advised to save your changes in git before running this command.

Currently available recipes are:

- Sass - `sass`
- Typescript - `typescript`
- Tailwind CSS - `tailwind`
- Preact - `preact`
- styled-components - `styled-components`
- Chakra UI - `chakra-ui`
- MDX - `mdx`

Alternatively, you can omit the argument and run `next-gen add`, which will launch an interactive prompt that lists all the available recipes.

If you don't see your favourite tool/framework and would like it to be added then just go ahead and [create an issue](https://github.com/biowaffeln/next-gen/issues/new?title=Recipe%20Request%20-) for it!
