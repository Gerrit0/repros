# Cross File Type Reference

Example of using the compiler api:

```bash
yarn
node file-reference.js
```

Example output:

```
export function foo(x: File1): void {}
type is File1
type is aliased to File1
which is declared at /home/gerrit/Desktop/repros/src/file1.ts
```
