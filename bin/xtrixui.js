#!/usr/bin/env node
import("../src/main.js").catch((err) => {
  console.error("Failed to execute CLI:", err);
  process.exit(1);
});
