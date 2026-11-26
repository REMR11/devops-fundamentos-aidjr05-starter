import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = process.cwd();
const publicDir = join(rootDir, 'public');
const distDir = join(rootDir, 'dist');

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}

mkdirSync(distDir, { recursive: true });
cpSync(publicDir, distDir, { recursive: true });

writeFileSync(
  join(distDir, 'build-info.json'),
  JSON.stringify(
    {
      app: 'devops-fundamentos-aidjr05',
      builtAt: new Date().toISOString(),
    },
    null,
    2
  )
);

console.log('Build completado en ./dist');
