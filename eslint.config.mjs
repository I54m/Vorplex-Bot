import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // 1. Files to check and global files/folders to ignore
  {
    files: ['src/**/*.ts'],
  },
  {
    ignores: ['node_modules/', 'dist/'],
  },

  // 2. Load recommended configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Integrate Prettier plugin rules
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Treats Prettier formatting issues as ESLint errors
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },

  // 4. Overrides conflicting formatting rules (must be placed last)
  prettierConfig,
);