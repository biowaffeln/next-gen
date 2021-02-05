// prettier-ignore
export const APP_JS =
`function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
`

// prettier-ignore
export const APP_TSX =
`import { AppProps } from "next/app";

function MyApp({ Component, pagesProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;`

// prettier-ignore
export const DOCUMENT_JS =
`import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
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
`;

// prettier-ignore
export const BABELRC =
`{
  "presets": ["next/babel"]
}
`

export const NEXT_CONFIG = `module.exports = {};
`;
