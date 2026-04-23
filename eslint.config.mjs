import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"], plugins: { js }, rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "semi": ["error", "always"]
    }, languageOptions: { globals: globals.browser }
  },
]);
