import * as j from 'jscodeshift';

export function addImport(
	program: j.Collection<j.Program>,
	importToAdd: j.ImportDeclaration
): j.Collection<j.Program> {
	const imports = program.find(j.ImportDeclaration);
	if (imports.length === 0) {
		program.find(j.Statement).at(0).insertBefore(importToAdd);
	} else {
		imports.at(-1).insertAfter(importToAdd);
	}
	return program;
}
