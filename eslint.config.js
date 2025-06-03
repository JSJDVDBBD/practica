const js = require('@eslint/js')
const react = require('eslint-plugin-react')

module.exports = [
  {
    languageOptions: {
      parser: require('@babel/eslint-parser'), // Usa Babel para soportar JSX
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false, // Evita la necesidad de un archivo de configuración extra
        babelOptions: {
          presets: ['@babel/preset-react'], // Asegura que JSX sea interpretado correctamente
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect', // Detecta la versión de React automáticamente
      },
    },
    plugins: {
      react,
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'off',
      'react/react-in-jsx-scope': 'off', // Next.js no necesita importar React en cada archivo
      'no-unused-vars': 'warn',
    },
    ignores: ['node_modules', 'android', 'ios', 'build'],
  },
]
