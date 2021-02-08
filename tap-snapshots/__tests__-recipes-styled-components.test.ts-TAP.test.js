/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/recipes/styled-components.test.ts TAP should add styled-components to a js project > must match snapshot 1`] = `
{
  "name": "test-project",
  "dependencies": {
    "react": "17.0.0",
    "react-dom": "17.0.0",
    "next": "latest",
    "styled-components": "^5.0.0"
  },
  "devDependencies": {
    "babel-plugin-styled-components": "^1.8.0"
  }
}

`

exports[`__tests__/recipes/styled-components.test.ts TAP should add styled-components to a js project > must match snapshot 2`] = `
import { ThemeProvider } from "styled-components";

 
const theme = {
	colors: {
		primary: "#0070f3",
	},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

`

exports[`__tests__/recipes/styled-components.test.ts TAP should add styled-components to a js project > must match snapshot 3`] = `
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });
      const initialProps = await Document.getInitialProps(ctx);
      return {
          ...initialProps,
          styles: (
              <>{initialProps.styles}{sheet.getStyleElement()}</>
          )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

`

exports[`__tests__/recipes/styled-components.test.ts TAP should add styled-components to a ts project > must match snapshot 1`] = `
{
  "name": "test-project",
  "dependencies": {
    "react": "17.0.0",
    "react-dom": "17.0.0",
    "next": "latest",
    "styled-components": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^17.0.0",
    "@types/node": "^14.14.22",
    "typescript": "^4.1.3",
    "babel-plugin-styled-components": "^1.8.0",
    "@types/styled-components": "^5.1.7"
  }
}

`

exports[`__tests__/recipes/styled-components.test.ts TAP should add styled-components to a ts project > must match snapshot 2`] = `
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
 
const theme = {
	colors: {
		primary: "#0070f3",
	},
};

function MyApp({
  Component,
  pageProps
}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

`

exports[`__tests__/recipes/styled-components.test.ts TAP should add styled-components to a ts project > must match snapshot 3`] = `
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });
      const initialProps = await Document.getInitialProps(ctx);
      return {
          ...initialProps,
          styles: (
              <>{initialProps.styles}{sheet.getStyleElement()}</>
          )
      };
    } finally {
      sheet.seal();
    }
  }

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

`
