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
            fontFamily: {
                'sansita': ['Sansita Swashed', 'font-family'],
            },
            backgroundImage: {
                'date-range-start': "linear-gradient(to right, #F9FAFB 50% , #0891B2 50%);",
                'date-range-end': "linear-gradient(to left, #F9FAFB 50% , #0891B2 50%);"
            }
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
