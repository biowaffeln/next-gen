import { readAsync } from 'fs-jetpack';
import path from 'path';

export const getTemplate = (dir: string) => (template: string) =>
	readAsync(path.join(dir, 'templates', `${template}.template`)).then(
		(content) => {
			if (!content) throw new Error(`template not found: ${template}`);
			return content;
		}
	);
