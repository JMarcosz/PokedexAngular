/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}", // Incluye tus archivos de Angular
      "./node_modules/flowbite/**/*.js" // Incluye las clases de Flowbite
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin') // Registra el plugin de Flowbite
    ],
  }
  