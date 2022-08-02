module.exports = {
  "extends": ["taro/react"],
  "rules": {
    "no-undef": 1,
    "no-unused-vars": 1,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "./src"],
          ["@/assets", "./src/assets"],
          ["@/components", "./src/components"],
          ["@/constants", "./src/constants"],
          ["@/hooks", "./src/hooks"],
          ["@/layouts", "./src/layouts"],
          ["@/modules", "./src/modules"],
          ["@/stores", "./src/stores"],
          ["@/styles", "./src/styles"],
          ["@/utils", "./src/utils"],
          ["@/packageActivity", "./src/packageActivity"]
        ],
        "extensions": [".ts", ".tsx", ".js", ".jsx", ".json"]
      }
    },
  },
}
