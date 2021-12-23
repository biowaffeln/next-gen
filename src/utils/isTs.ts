import { existsAsync } from 'fs-jetpack';

export const isTs = () => existsAsync('tsconfig.json');
