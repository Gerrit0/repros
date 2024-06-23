To reproduce:

```bash
npm install
npx tsx src/bug.ts
```

This will log:

```text
req false
```

When it should log:

```text
req false
opt false
```

This is caused by the `target` option in `tsconfig.json`.
It works as expected when set to a value of `es2022` or later.
