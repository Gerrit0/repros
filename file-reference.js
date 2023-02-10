const ts = require("typescript");

const opts = ts.getParsedCommandLineOfConfigFile(
  "tsconfig.json",
  undefined,
  ts.sys
);

const program = ts.createProgram({
  options: opts.options,
  rootNames: opts.fileNames,
  configFileParsingDiagnostics: opts.configFileParsingDiagnostics,
  projectReferences: opts.projectReferences,
});
const checker = program.getTypeChecker();

const issues = ts.getPreEmitDiagnostics(program);

if (issues.length) {
  console.log(ts.formatDiagnosticsWithColorAndContext(issues, ts.sys));
  process.exit(1);
}

const file = program.getSourceFile("src/file2.ts");

/** @type {ts.FunctionDeclaration} */
const func = file.statements[1];
console.log(func.getText());

const param = func.parameters[0];
const type = checker.getTypeAtLocation(param);

console.log("type is", checker.typeToString(type));

if (type.aliasSymbol) {
  console.log("type is aliased to", type.aliasSymbol.name);
  console.log(
    "which is declared at",
    type.aliasSymbol.declarations[0].getSourceFile().fileName
  );
}
