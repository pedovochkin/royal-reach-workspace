import { build } from 'esbuild';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await build({ entryPoints: ['src/main.jsx'], bundle: true, minify: true, format: 'esm', target: ['es2020'], outdir: 'dist', entryNames: 'app', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' } });
for (const file of ['index.html', 'favicon.svg']) await copyFile(`public/${file}`, `dist/${file}`);
await writeFile('dist/.nojekyll', '');
console.log('Built static application in dist/');
