import { read } from 'fs-jetpack';
import path from 'path';

export const getTemplate = (dir: string) => (template: string) => {
	const content = read(path.join(dir, 'templates', `${template}.template`));
	if (!content) throw Error(`Template ${template} not found`);
	return content;
};
