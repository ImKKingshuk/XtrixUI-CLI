export const frameworks = {
  "next-app-js": {
    name: "Next.js (App Router + JavaScript)",
    templatePath: "templates/next/app-router/js",
    dependencies: {
      next: "latest",
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    },
    devDependencies: {
      tailwindcss: "^3.0.0",
      autoprefixer: "^10.0.0",
      postcss: "^8.0.0",
    },
  },
  "next-app-ts": {
    name: "Next.js (App Router + TypeScript)",
    templatePath: "templates/next/app-router/ts",
    dependencies: {
      next: "latest",
      react: "^18.0.0",
      "react-dom": "^18.0.0",
      typescript: "^5.0.0",
    },
    devDependencies: {
      tailwindcss: "^3.0.0",
      autoprefixer: "^10.0.0",
      postcss: "^8.0.0",
    },
  },
  // Add more frameworks
};
