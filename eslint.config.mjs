import typescriptEslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  ...typescriptEslint.configs.strict,
  ...typescriptEslint.configs.stylistic,
  prettier,
  {
    languageOptions: {
      globals: globals.node,
      parser: typescriptEslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    files: ['**/*.{ts,js}'],
    ignores: ['node_modules', 'build', '*.md'],
    rules: {
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true
        }
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-extraneous-class': [
        'error',
        { allowConstructorOnly: true, allowEmpty: true }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^ _',
          ignoreRestSiblings: true,
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.js']
        }
      }
    }
  }
];
