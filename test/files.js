export const PACKAGE_JSON = JSON.stringify(
	{
		name: "test-project",
		dependencies: {
			react: "17.0.0",
			"react-dom": "17.0.0",
			next: "latest",
		},
	},
	null,
	2
)

// prettier-ignore
export const APP_JS =
`function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
`

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
export const DOCUMENT_JS_WITH_INITIAL_PROPS =
`import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
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
`;
