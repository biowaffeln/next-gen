import type { Collection, JSCodeshift, ObjectProperty } from "jscodeshift";
import type { ExpressionKind } from "ast-types/gen/kinds";
import addImports from "jscodeshift-add-imports";

/**
 * Adds an import statement to a .js or .ts file.
 * Merges imports if they exist, otherwise it appends
 * the import after the existing ones.
 *
 * Similar to `jscodeshift-add-imports`, but fixes some
 * formatting issues regarding blank lines.
 */
export function addImport(j: JSCodeshift, root: Collection, statement: string) {
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
 */
export function addRequire(
	j: JSCodeshift,
	root: Collection,
	statement: string
) {
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

export function wrapNextConfig(
	j: JSCodeshift,
	root: Collection,
	wrapper: ExpressionKind
) {
	const moduleExport = root.find(j.AssignmentExpression, {
		left: {
			object: { name: "module" },
			property: { name: "exports" },
		},
	});

	if (moduleExport.length === 0) {
		throw new Error("No module export was found.");
	}

	moduleExport.forEach((p) => {
		p.node.right = j.callExpression(wrapper, [p.node.right]);
	});
}

export function addConfigOptions(
	j: JSCodeshift,
	root: Collection,
	...objectProperties: ObjectProperty[]
) {
	const moduleExport = root.find(j.AssignmentExpression, {
		left: {
			object: { name: "module" },
			property: { name: "exports" },
		},
	});

	if (moduleExport.length === 0) {
		throw new Error("Failed to add nextConfig properties.");
	}

	const right = moduleExport.get("right");

	// simple case
	if (right.node.type === "ObjectExpression") {
		right.node.properties.push(...objectProperties);
	}
	// complex case
	else if (right.node.type === "CallExpression") {
		const composePlugin = root.find(j.VariableDeclarator, {
			init: {
				callee: { name: "require" },
				arguments: { 0: { value: "next-compose-plugins" } },
			},
		});

		// error if next config requires `next-compose-plugins`
		// TODO: fix
		if (composePlugin.length > 0) {
			throw new Error("Faild to add nextConfig properties.");
		}

		// find the innermost call expression
		moduleExport
			.find(j.CallExpression, (value) => {
				return j(value).find(j.CallExpression).length === 0;
			})
			// add objectExpression or insert into existing one
			.forEach((p) => {
				if (
					p.node.arguments[0] &&
					p.node.arguments[0].type === "ObjectExpression"
				) {
					p.node.arguments[0].properties.push(...objectProperties);
				} else {
					p.node.arguments.push(j.objectExpression(objectProperties));
				}
			});
	} else {
		throw new Error("Failed to add nextConfig properties.");
	}
}
