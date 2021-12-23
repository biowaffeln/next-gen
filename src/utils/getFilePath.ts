import { isTs } from './isTs';

export const getAppPath = () => (isTs() ? 'pages/_app.tsx' : 'pages/_app.js');
