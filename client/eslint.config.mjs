import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: [
      "src/lib/api.ts",
      "src/lib/strapi-utils.ts", 
      "src/lib/utils.ts",
      "src/lib/logger.ts",
      "src/types/strapi.ts",
      "src/components/sections/**/*.tsx"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];

export default eslintConfig;
