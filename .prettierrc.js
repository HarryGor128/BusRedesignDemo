module.exports = {
  printWidth: 80,
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
  tabWidth: 4,
  useTabs: false,
  semi: true,
  jsxSingleQuote: true,
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 0,
  },
  importOrder: [
    '^(react|react-(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '^(Components/(.*)$|./Components/(.*)$|../Components/(.*)$)',
    '^(Hook/(.*)$|./Hook/(.*)$|../Hook/(.*)$)',
    '^(Type/(.*)$|./Type/(.*)$|../Type/(.*)$)',
    '^(Services/(.*)$|./Services/(.*)$|../Services/(.*)$)',
    '^(store/(.*)$|./store/(.*)$|../store/(.*)$)',
    '^(Page/(.*)$|./Page/(.*)$|../Page/(.*)$)',
    '^[./(.*)$|../(.*)$]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"]
};
