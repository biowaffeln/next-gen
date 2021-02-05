// @ts-check
import addImports from "jscodeshift-add-imports";

/**
 * @typedef {import("jscodeshift").JSCodeshift} JSCodeshift
 * @typedef {import("jscodeshift").Collection} Collection
 * @typedef {import("jscodeshift").ObjectProperty} ObjectProperty
 */

/**
 * Adds an import statement to a .js or .ts file.
 * Merges imports if they exist, otherwise it appends
 * the import after the existing ones.
 *
 * Similar to `jscodeshift-add-imports`, but fixes some
 * formatting issues regarding blank lines.
 *
 * @param {JSCodeshift} j
 * @param {Collection} root
 * @param {string} statement
 */
export function addImport(j, root, statement) {
	const s = j.template.statement([statement]);

	const imports = root.find(j.ImportDeclaration);
	const newImport = j(s);

	// only merge when the sources and importKinds are the same
	const shouldMerge =
		imports.filter(
			(p) =>
				p.get("source").node.value === newImport.get("source").node.value &&
				p.get().node.importKind === newImport.get().node.importKind
		).length !== 0;

	// if there are no imports, add statement with two line breaks
	if (imports.length === 0) {
		const s = j.template.statement([statement + "\n\n"]);
		root.get().node.program.body.unshift(s);
	}
	// if there are imports but no merging is required,
	// add the statement at the end of the imports (without blank lines inbetween)
	else if (!shouldMerge) {
		imports.at(-1).replaceWith((p) =>
			j.template.statements([
				`${j(p).toSource()}
${statement}`,
			])
		);
	}
	// otherwise, merge imports
	else {
		addImports(root, [s]);
	}
}

/**
 * Adds a require statement to a .js file.
 * Does not merge existing require calls.
 *
 * @param {JSCodeshift} j
 * @param {Collection} root
 * @param {string} statement
 */
export function addRequire(j, root, statement) {
	// find variable declarations that call require
	const declarations = root.find(j.VariableDeclaration, {
		declarations: {
			0: { init: { callee: { name: "require" } } },
		},
	});

	// if there aren't any, add require to top of the file
	if (declarations.length === 0) {
		const s = j.template.statement([statement + "\n\n"]);
		root.get().node.program.body.unshift(s);
	}
	// otherwise add it after last require
	else {
		declarations.at(-1).replaceWith((p) =>
			j.template.statements([
				`${j(p).toSource()}
	${statement};`,
			])
		);
	}
}

/**
 *
 * @param {JSCodeshift} j
 * @param {Collection} root
 * @param  {ObjectProperty[]} objectProperties
 */
export function addWebpackOptions(j, root, ...objectProperties) {
	root
		.find(j.ObjectExpression)
		.at(-1)
		.forEach((p) => p.node.properties.push(...objectProperties));
}
