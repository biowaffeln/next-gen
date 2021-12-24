import { tailwind } from '../../src/recipes/tailwind/tailwind';

const packageJSON = `{
	"name": "test-app",
	"version": "1.0.0",
	"dependencies": {
		"react": "latest",
		"react-dom": "latest",
		"next": "latest"
	}
}`;

const appJS = `export default function App({ Component, pageProps }) {
	return (
		<Component {...pageProps} />
	);
}
`;

test('should transform files correctly', () => {
	const [pkg, styles, app] = tailwind();
	expect(pkg.transform(packageJSON)).toMatchSnapshot();
	expect(app.transform(appJS)).toMatchSnapshot();
	expect(styles.transform('')).toMatchSnapshot();
});
