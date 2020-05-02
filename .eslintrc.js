module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'max-len': 'off',
        'no-plusplus': 'off',
        'no-nested-ternary': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'arrow-parens': ['error', 'as-needed'],
        'import/extensions': ['error', 'always', {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            vue: 'never',
        }],
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
                'vue/script-indent': ['error', 4, {
                    baseIndent: 1,
                    switchCase: 1,
                }],
            },
        },
    ],
};
