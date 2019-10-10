module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        commonjs: false,
    },
    extends: [
        'plugin:vue/essential'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }]
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    globals: {}
};
