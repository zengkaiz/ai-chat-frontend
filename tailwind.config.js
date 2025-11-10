/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 浅色主题 - 更新为淡紫色系
        light: {
          bg: '#FFFFFF',
          'bg-secondary': '#F7F7F8',
          text: '#2D2D2D',
          'text-secondary': '#6B7280',
          border: '#E5E5E5',
          primary: '#9333EA',        // 淡紫色
          'primary-hover': '#7E22CE', // 深紫色
        },
        // 深色主题 - 更新为紫色系
        dark: {
          bg: '#0F0F0F',
          'bg-secondary': '#1F1F1F',
          text: '#ECECEC',
          'text-secondary': '#9CA3AF',
          border: '#3F3F3F',
          primary: '#C084FC',        // 亮紫色
          'primary-hover': '#A855F7', // 中紫色
        },
      },
      borderRadius: {
        'bubble': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-in-left': 'slideInLeft 300ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.glass-light': {
          'backdrop-filter': 'blur(10px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(10px) saturate(180%)',
          'background': 'rgba(255, 255, 255, 0.75)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
          'box-shadow': '0 8px 32px 0 rgba(147, 51, 234, 0.1)',
        },
        '.glass-dark': {
          'backdrop-filter': 'blur(10px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(10px) saturate(180%)',
          'background': 'rgba(15, 15, 15, 0.7)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'box-shadow': '0 8px 32px 0 rgba(142, 45, 226, 0.2)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
