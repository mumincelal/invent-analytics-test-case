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
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off'
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
