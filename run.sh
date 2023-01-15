npm i

echo =========================== Compiling
npx tsc && echo ok

echo =========================== Applying patch
git --no-pager diff --no-index node_modules/minimatch/package.json minimatch.package.json
cp minimatch.package.json node_modules/minimatch/package.json

echo =========================== Compiling
npx tsc && echo ok
