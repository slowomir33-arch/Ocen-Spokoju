import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      colors: {
        'brand-gold': '#D4AF37',
        'brand-gold-light': '#E8D4A0',
        'brand-purple': '#4C2882',
        'brand-purple-light': '#7B4FB8',
        'brand-amethyst': '#9966CC',
        'brand-light': '#FFF9F0',
        'brand-cream': '#F5F0E8',
        'dark-bg': '#0A0A0F',
        'dark-card': '#1A1A2E',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #F5F0E8 0%, #E8D4A0 50%, #D4AF37 100%)',
        'gradient-purple-gold': 'linear-gradient(135deg, #4C2882 0%, #7B4FB8 50%, #D4AF37 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #2D2D44 100%)',
        'mesh-gradient': 'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.2) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(43, 89%, 70%, 0.2) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(270, 87%, 68%, 0.2) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-strong': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow-gold': '0 0 40px rgba(212, 175, 55, 0.3)',
        'glow-purple': '0 0 40px rgba(123, 79, 184, 0.3)',
        'inner-glow': 'inset 0 0 30px rgba(212, 175, 55, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
