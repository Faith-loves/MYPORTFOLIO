/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0F',
        mint: '#00FFB2',
        purple: '#7B2FFF',
        ember: '#FF6B35',
        rose: '#F6A6B8',
        gold: '#EBCB8B',
        cyan: '#7DD3FC'
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        mint: '0 0 34px rgba(0, 255, 178, 0.32)',
        purple: '0 0 34px rgba(123, 47, 255, 0.35)',
        ember: '0 0 34px rgba(255, 107, 53, 0.26)'
      }
    }
  },
  plugins: []
}
