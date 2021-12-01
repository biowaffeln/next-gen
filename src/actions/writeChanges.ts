import { writeAsync } from 'fs-jetpack';

export interface Change {
	path: string;
	content: string | Record<string, unknown>;
}

const writeChange = (result: Change) => writeAsync(result.path, result.content);

export const writeChanges = (...results: Change[]) =>
	Promise.all(results.map(writeChange));
