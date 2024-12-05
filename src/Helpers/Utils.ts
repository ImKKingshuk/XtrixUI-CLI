import fs from "fs";
import path from "path";
import chalk from "chalk";

// Log helper
export function log(message: string) {
  console.log(chalk.blue(message));
}

// Copy files from template directory to the target directory
export function copyTemplateFiles(templateDir: string, targetDir: string) {
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template directory "${templateDir}" does not exist.`);
  }

  const files = fs.readdirSync(templateDir);
  files.forEach((file) => {
    const src = path.join(templateDir, file);
    const dest = path.join(targetDir, file);

    if (fs.statSync(src).isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      copyTemplateFiles(src, dest); // Recursive copy
    } else {
      fs.copyFileSync(src, dest);
    }
  });
}