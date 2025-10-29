module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
  ],
  rules: {
    // Allow Tailwind at-rules in CSS files
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
  },
  ignoreFiles: [
    '**/.next/**/*.css',
    '**/node_modules/**/*.css',
  ],
};