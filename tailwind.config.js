/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  // theme: {
  //   extend: {},
  // },
  // tailwind.config.js

  // theme: {
  //   extend: {
  //     colors: {
  //       'music-dark': '#0F0F0F',  // Rich black
  //       'music-orange': '#FF5E1A', // Vibrant orange
  //       'music-accent': '#FFD600'  // Electric yellow accent
  //     },
  //     backgroundImage: {
  //       'music-gradient': 'linear-gradient(135deg, #0F0F0F 30%, #2A1A00 60%, #FF5E1A 100%)',
  //       'fire-gradient': 'linear-gradient(95deg, #0F0F0F 0%, #421E00 30%, #FF5E1A 70%)'
  //     }
  //   }
  // },
  // tailwind.config.js

  theme: {
    extend: {
      animation: {
        // Wave animation with elastic effect
        'wave-synced': 'wave 1s ease-in-out infinite',
        // Floating notes animation
        'float': 'float 3s ease-in-out infinite',
        // Gradient text animation
        'gradient-shift': 'gradientShift 4s linear infinite',
        // Custom pulse animation
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Particle animation
        'particle': 'particleMove 4s linear infinite'
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-40px) rotate(8deg)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        particleMove: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 1 },
          '100%': { transform: 'translateY(-100vh) scale(0)', opacity: 0 },
        }
      }
    }
  },

  plugins: [],
};