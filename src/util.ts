import { pathExists } from "fs-extra";
import { RecipeEntry } from "./recipes";

export const pick = (...keys: string[]) => (obj: object) =>
	keys.reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

export const pipe = (...fns: Function[]) => (x: any) =>
	fns.reduce((v, f) => f(v), x);

export const makeChoice = (recipeMap: Record<string, RecipeEntry>) =>
	Object.entries(recipeMap).map(([k, v]) => ({ value: k, ...v }));

export const toKebab = (input: string) =>
	input.replace(/\s+/g, "-").toLowerCase();

export const getPackageManager = async () =>
	// prettier-ignore
	(await pathExists("package-lock.json")) ? "npm"  :
	(await pathExists("yarn.lock"))         ? "yarn" :
	(await pathExists("pnpm-lock.yaml"))    ? "pnpm" :
	"npm";
