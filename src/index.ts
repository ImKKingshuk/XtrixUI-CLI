import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { frameworks } from "./frameworks";
import { generatePackageJson } from "./utils/generatePackageJson";
import { installDependencies } from "./utils/installDependencies";
import { copyTemplate } from "./utils/copyTemplate";

async function main() {
  console.log(chalk.blue("Welcome to XtrixUI CLI! 🚀"));

  // Prompt for framework selection
  const frameworkChoices = Object.entries(frameworks).map(([key, value]) => ({
    name: value.name,
    value: key,
  }));

  const { frameworkKey } = await inquirer.prompt([
    {
      type: "list",
      name: "frameworkKey",
      message: "Select a framework:",
      choices: frameworkChoices,
    },
  ]);

  // Prompt for project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Your project name:",
      default: "my-xtrixui-app",
    },
  ]);

  // Prompt for package manager
  const { packageManager } = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Select a package manager:",
      choices: ["npm", "yarn", "pnpm", "bun"],
    },
  ]);

  const frameworkConfig = frameworks[frameworkKey];
  const targetPath = path.resolve(process.cwd(), projectName);

  try {
    console.log(chalk.green("Creating project..."));

    // Create project folder
    await fs.ensureDir(targetPath);

    // Copy template files
    await copyTemplate(frameworkConfig.templatePath, targetPath);

    // Generate package.json
    console.log(chalk.green("Generating package.json..."));
    const packageJson = generatePackageJson(projectName, frameworkConfig);
    await fs.writeFile(
      path.join(targetPath, "package.json"),
      JSON.stringify(packageJson, null, 2),
    );

    // Install dependencies
    console.log(
      chalk.green(`Installing dependencies using ${packageManager}...`),
    );
    await installDependencies(packageManager, targetPath);

    // Initialize Git
    console.log(chalk.green("Initializing Git repository..."));
    await execa("git", ["init"], { cwd: targetPath });
    await execa("git", ["add", "."], { cwd: targetPath });
    await execa("git", ["commit", "-m", "Initial commit from XtrixUI CLI"], {
      cwd: targetPath,
    });

    console.log(chalk.blue("🎉 Project created successfully!"));
    console.log(
      chalk.blue(
        `Next steps:\n\n  cd ${projectName}\n  ${packageManager} dev\n`,
      ),
    );
  } catch (error) {
    console.error(
      chalk.red("An error occurred during project creation:", error),
    );
    process.exit(1);
  }
}

main();
