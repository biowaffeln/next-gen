export const createFile = (
	path: string,
	content: string | Record<string, unknown>
) => ({ path, content });
