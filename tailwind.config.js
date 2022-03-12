module.exports = {
    theme: {
        extend: {
          skew: {
            '30': '30deg',
            '20': '20deg',
          },
          colors: {
            'main': '#76b38f',
          },
        }
    },
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
