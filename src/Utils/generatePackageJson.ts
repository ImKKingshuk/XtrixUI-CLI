export function generatePackageJson(projectName: string, frameworkConfig: any) {
  return {
    name: projectName,
    version: "1.0.0",
    private: true,
    scripts: {
      dev: frameworkConfig.devScript || "npm run dev",
      build: frameworkConfig.buildScript || "npm run build",
      start: frameworkConfig.startScript || "npm start",
    },
    dependencies: frameworkConfig.dependencies,
    devDependencies: frameworkConfig.devDependencies,
  };
}
