import { exists } from 'fs-jetpack';

export const isTs = () => exists('tsconfig.json');
