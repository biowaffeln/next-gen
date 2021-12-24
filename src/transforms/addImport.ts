import * as j from 'jscodeshift';

export const addImport = (
	program: j.Collection<j.Program>,
	importToAdd: j.ImportDeclaration
): j.Collection<j.Program> => {
	const imports = program.find(j.ImportDeclaration);
	if (imports.length === 0) {
		program.get().node.program.body.unshift(importToAdd, ' ');
	} else {
		imports.at(-1).insertAfter(importToAdd);
	}
	return program;
};
