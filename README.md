<div align="center">
  <img src="assets/logo.svg" alt="next-gen logo" height="100px">
  <h1>next-gen</h1>
  <p>The <b>Next</b>.js Codebase <b>Gen</b>erator</p>
</div>

## Introduction

This project is meant to help you with two things:

1. It helps you to scaffold new Next.js applications that are custom-tailored to exactly the features you want.
2. It allows you to quickly add support for various tools and frameworks to existing Next.js applications.

Think of it as a mix of [`npx init gatsby`](https://www.gatsbyjs.com/blog/new-gatsby-interactive) and [Blitz Recipes](https://blitzjs.com/docs/using-recipes), but for Next.js.

## Getting Started

You can either install `next-gen` globally:

```sh
npm install -g @biowaffeln/next-gen
```

or try it out directly with `npx`:

```sh
npx @biowaffeln/next-gen [command]
```

next-gen comes with two commands, `next-gen init` for scaffolding new projects, and `next-gen add` for adding tools to existing projects:

### `next-gen init`

Simply answer the questions in the interactive prompt and a Next.js project will be generated for you.

### `next-gen add [recipe]`

This plugin adds support for various tools and frameworks to an existing Next.js project, all within seconds! To add a recipe, run `next-gen add [recipe]`.

> ⚠️ Warning! This command will modify files in your project. It's advised to commit your changes to git before running this command.

Currently available recipes are:

- Sass - `sass`
- Typescript - `typescript`
- Tailwind CSS - `tailwind`
- Preact - `preact`
- styled-components - `styled-components`
- Chakra UI - `chakra-ui`
- MDX - `mdx`

Alternatively, you can omit the argument and run `next-gen add`, which will launch an interactive prompt that lists all the available recipes.

Don't see your favourite tool/framework and would like it to be added? Just go ahead and [create an issue](https://github.com/biowaffeln/next-gen/issues/new?title=Recipe%20Request%20-) for it!
