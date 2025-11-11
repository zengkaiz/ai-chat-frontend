/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
          primary: '#9333EA', // 淡紫色
          'primary-hover': '#7E22CE', // 深紫色
        },
        // 深色主题 - 暗黑风格
        dark: {
          bg: '#0f0f23',
          'bg-secondary': '#1a1a2e',
          text: '#e0e0e0',
          'text-secondary': '#a0a0a0',
          border: '#2d2d44',
          primary: '#6366f1', // 现代风格靛色
          'primary-hover': '#4f46e5', // 深靛色
        },
      },
      borderRadius: {
        bubble: '16px',
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
    function ({ addUtilities }) {
      const newUtilities = {
        '.glass-light': {
          'backdrop-filter': 'blur(10px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(10px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          'box-shadow': '0 8px 32px 0 rgba(147, 51, 234, 0.1)',
        },
        '.glass-dark': {
          'backdrop-filter': 'blur(16px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          'box-shadow': '0 8px 32px 0 rgba(99, 102, 241, 0.15)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
