/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/recipes/tailwind.test.ts TAP should create files > must match snapshot 1`] = `
@tailwind base;
@tailwind components;
@tailwind utilities;

`

exports[`__tests__/recipes/tailwind.test.ts TAP should create files > must match snapshot 2`] = `
module.exports = {
	purge: ["./pages/**/*.js", "./components/**/*.js"],
	darkMode: "media", // or "media" or "class"
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: []
}
`

exports[`__tests__/recipes/tailwind.test.ts TAP should create files > must match snapshot 3`] = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

exports[`__tests__/recipes/tailwind.test.ts TAP should create files > must match snapshot 4`] = `
{
  "name": "test-project",
  "dependencies": {
    "react": "17.0.0",
    "react-dom": "17.0.0",
    "next": "latest"
  },
  "devDependencies": {
    "autoprefixer": "^10.2.1",
    "postcss": "^8.2.4",
    "tailwindcss": "^2.0.2"
  }
}

`

exports[`__tests__/recipes/tailwind.test.ts TAP should create files > must match snapshot 5`] = `
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`__tests__/recipes/tailwind.test.ts TAP should create typescript files > must match snapshot 1`] = `
module.exports = {
	purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	darkMode: "media", // "media" or "class"
	theme: {
		extend: {}
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
`

exports[`__tests__/recipes/tailwind.test.ts TAP should create typescript files > must match snapshot 2`] = `
import { AppProps } from "next/app";
import "../styles/tailwind.css";

function MyApp({ Component, pagesProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
`
