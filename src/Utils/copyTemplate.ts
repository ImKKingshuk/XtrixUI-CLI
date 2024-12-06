import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Copies template files from a given source path to a target path.
 * Resolves paths correctly and ensures proper error handling.
 *
 * @param templatePath - The relative path to the template directory.
 * @param targetPath - The path where the project should be created.
 */
export async function copyTemplate(templatePath: string, targetPath: string) {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const resolvedTemplatePath = path.resolve(__dirname, "../", templatePath);

    console.log("Resolved template path:", resolvedTemplatePath);
    console.log("Target path:", targetPath);

    const templateExists = await fs.pathExists(resolvedTemplatePath);
    if (!templateExists) {
      throw new Error(
        `Template directory not found at '${resolvedTemplatePath}'. Ensure the path is correct and the templates are included in the package.`,
      );
    }

    await fs.copy(resolvedTemplatePath, targetPath);
    console.log("Template files copied successfully!");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Failed to copy template files:", err.message);
    } else {
      console.error("An unexpected error occurred:", err);
    }
    throw err;
  }
}
