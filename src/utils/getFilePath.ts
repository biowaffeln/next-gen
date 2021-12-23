import { isTs } from './isTs';

export const getAppPath = () =>
	isTs().then((ts) => (ts ? 'pages/_app.tsx' : 'pages/_app.js'));
