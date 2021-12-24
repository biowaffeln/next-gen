import * as j from 'jscodeshift';
import { addImport } from '../../src/transforms/addImport';

const p = j.withParser('tsx');

const emptyProgram = p('');
const programWithStatement = p('export const test = 123;');
const programWithImports = p(`import { render } from 'react-dom';

render(<div />, document.getElementById('root'));`);

const importToAdd = j.template.statement`import { foo } from "bar";`;

test('should add imports to empty file', () => {
	expect(addImport(emptyProgram, importToAdd).toSource()).toMatchSnapshot();
});

test('should add imports to file with content', () => {
	expect(
		addImport(programWithStatement, importToAdd).toSource()
	).toMatchSnapshot();
});

test('should add imports to file with existing imports', () => {
	expect(
		addImport(programWithImports, importToAdd).toSource()
	).toMatchSnapshot();
});
