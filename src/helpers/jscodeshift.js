// @ts-check
import addImports from "jscodeshift-add-imports"

/**
 *
 * @param {import("jscodeshift")} j
 * @param {import("jscodeshift").Collection} root
 * @param {string} statement
 */
export function addImport(j, root, statement) {
	const s = j.template.statement([statement])

	const imports = root.find(j.ImportDeclaration)
	const newImport = j(s)

	// only merge when the sources and importKinds are the same
	const shouldMerge =
		imports.filter(
			(p) =>
				p.get("source").node.value === newImport.get("source").node.value &&
				p.get().node.importKind === newImport.get().node.importKind
		).length !== 0

	// if there are no imports, add statement with two line breaks
	if (imports.length === 0) {
		const s = j.template.statement([statement + "\n\n"])
		root.get().node.program.body.unshift(s)
	}
	// if there are imports but no merging is required,
	// add the statement at the end of the imports (without blank lines before)
	else if (!shouldMerge) {
		imports.at(-1).replaceWith((p) =>
			j.template.statements([
				`${j(p).toSource()}
${statement}`,
			])
		)
	}
	// otherwise, merge imports
	else {
		addImports(root, [s])
	}
}
