export const frameworks = {
  "next-app-js": {
    name: "Next.js (App Router + JavaScript)",
    templatePath: "templates/next/app-router-js",
    scripts: {
      dev: "next dev --turbopack",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      next: "latest",
      react: "latest",
      "react-dom": "latest",
    },
    devDependencies: {
      tailwindcss: "latest",
      postcss: "latest",
      eslint: "latest",
      "eslint-config-next": "latest",
    },
  },
  "next-app-ts": {
    name: "Next.js (App Router + TypeScript)",
    templatePath: "templates/next/app-router-ts",
    scripts: {
      dev: "next dev --turbopack",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      next: "latest",
      react: "latest",
      "react-dom": "latest",
    },
    devDependencies: {
      tailwindcss: "latest",
      typescript: "latest",
      "@types/node": "latest",
      "@types/react": "latest",
      "@types/react-dom": "latest",
      postcss: "latest",
      eslint: "latest",
      "eslint-config-next": "latest",
    },
  },
  // Add more frameworks
};
