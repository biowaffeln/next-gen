import { readAsync } from 'fs-jetpack';
import { join } from 'path';

export const readTemplatePath = (dir: string) => (template: string) =>
	readAsync(join(dir, 'templates', template)) as Promise<string>;
