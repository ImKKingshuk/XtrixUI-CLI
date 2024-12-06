import fs from "fs-extra";
import path from "path";

export async function copyTemplate(templatePath: string, targetPath: string) {
  try {
    await fs.copy(path.resolve(templatePath), targetPath);
    console.log("Template files copied successfully!");
  } catch (error) {
    console.error("Failed to copy template files:", error);
    throw error;
  }
}
