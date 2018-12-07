module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'angular',
    'jest',
  ],
  rules: {
    'max-len': ['error', { code: 120 }],
    'arrow-parens': ['error', 'always'],
    'no-else-return': 'off',
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
  },
  env: {
    'jest/globals': true
  }
};
