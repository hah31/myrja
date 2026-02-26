import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-bloom': '#3b82f6',
        'deep-blue': '#1e40af',
        'site-bg': '#050508',
      },
      letterSpacing: {
        editorial: '0.25em',
        'editorial-wide': '0.4em',
        'editorial-max': '0.6em',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '30%': { transform: 'translate(3%,-15%)' },
          '50%': { transform: 'translate(-7%,3%)' },
          '70%': { transform: 'translate(5%,15%)' },
          '90%': { transform: 'translate(-4%,8%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
