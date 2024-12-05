import { execa } from 'execa';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { log, copyTemplateFiles } from './Helpers/Utils';
// Function to initialize Git and make the initial commit
async function initializeGit(projectPath: string) {
  try {
    await execa('git', ['init'], { cwd: projectPath });
    console.log(chalk.green('◇ Initialized a Git repository'));

    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit from xtrixui'], {
      cwd: projectPath,
    });
    console.log(chalk.green('◇ Created an initial commit'));
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(`Failed to initialize Git: ${err.message}`));
    } else {
      console.error(chalk.red(`An unknown error occurred: ${String(err)}`));
    }
  }
}

// Main CLI function
async function main() {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: '◇ Your Project Name:',
      initial: 'my-XtrixUI-app',
    },
    {
      type: 'select',
      name: 'framework',
      message: '◇ Select Framework:',
      choices: [
        { title: 'NextJS (App Router)', value: 'nextjs-app' },
        { title: 'NextJS (Pages Router)', value: 'nextjs-pages' },
        { title: 'Vite (React + SWC)', value: 'vite' },
        { title: 'Remix', value: 'remix' },
        { title: 'Laravel', value: 'laravel' },
        { title: 'Ruby on Rails', value: 'rails' },
        { title: 'RedwoodJS', value: 'redwood' },
        { title: 'Astro', value: 'astro' },
        { title: 'Qwik', value: 'qwik' },
        { title: 'SolidJS', value: 'solid' },
        { title: 'Gatsby', value: 'gatsby' },
        { title: 'React', value: 'react' },
      ],
    },
    {
      type: 'select',
      name: 'packageManager',
      message: '◇ Select a package manager:',
      choices: [
        { title: 'bun', value: 'bun' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'yarn', value: 'yarn' },
        { title: 'npm', value: 'npm' },
      ],
    },
  ]);

  const { projectName, framework, packageManager } = response;
  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, 'templates', framework);

  // Copy project template
  fs.mkdirSync(targetDir, { recursive: true });
  copyTemplateFiles(templateDir, targetDir);
  log('◇ Project files copied!');

  // Initialize Git and make the initial commit
  await initializeGit(targetDir);

  // Install dependencies
  try {
    await execa(packageManager, ['install'], {
      cwd: targetDir,
      stdio: 'inherit',
    });
    log('◇ Dependencies installed!');
  } catch (err) {
    console.error(chalk.red(`Failed to install dependencies: ${err}`));
  }

  // Output next steps
  console.log(`
◇ Project created successfully!
◇ Next steps ───────╮
│                    │
│  cd ${projectName} │
│  ${packageManager} dev │
│                    │
├────────────────────╯
└  🚀 3 2 1, GO!
`);
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
});
