import { writeAsync } from 'fs-jetpack';
import { Resolved } from '../changes/resolveNextPaths';
import { NextFile } from '../changes/types';

export const writeNextFiles = async (files: NextFile[]) => {
	for (const file of files) {
		await writeAsync(file.path, file.content);
	}
};

export const writeResolvedNextFiles = writeNextFiles as (
	files: Resolved<NextFile>[]
) => Promise<void>;
