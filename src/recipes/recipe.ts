import { Changes } from '../changes/types';

export interface RecipeOptions {
	isTs: boolean;
}

export type Recipe = () => Promise<Changes>;
