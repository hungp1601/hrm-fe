import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const MyTheme = {
  colors: {
    green: {
      DEFAULT: '#3BA676',
      '50': '#B4E4CF',
      '100': '#A5DFC5',
      '200': '#87D4B2',
      '300': '#69CA9E',
      '400': '#4BBF8B',
      '500': '#3BA676',
      '600': '#2C7D59',
      '700': '#1E533B',
      '800': '#0F2A1E',
      '900': '#000000',
    },
    blue: {
      DEFAULT: '#2684FF',
      '50': '#E6EDF9',
      '100': '#DEEBFF',
      '200': '#B3D4FF',
      '300': '#4C9AFF',
      '400': '#4C9AFF',
      '500': '#0096FF',
      '600': '#0065FF',
      '700': '#0052CC',
      '800': '#0747A6',
      '900': '#0747A6',
    },
    red: {
      DEFAULT: '#FF6464',
      '50': '#FFFFFF',
      '100': '#FFFFFF',
      '200': '#FFDEDE',
      '300': '#FFB6B6',
      '400': '#FF8D8D',
      '500': '#FF6464',
      '600': '#FF2C2C',
      '700': '#F30000',
      '800': '#BB0000',
      '900': '#830000',
    },

    grey: {
      '700': '#263238',
      '500': '#4D4D4D',
      '300': '#717171',
    },
    neutral: {
      '900': '#263238',
      '700': '#374151',
      '500': '#6B7280',
      '100': '#E5E7EB',
      '50': '#F2F4F7',
    },
  },
}

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
    './Error.{js,ts,vue}',
    './error.{js,ts,vue}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      colors: {
        primary: MyTheme.colors.green,
        green: MyTheme.colors.green,
        blue: MyTheme.colors.blue,
        red: MyTheme.colors.red,
        grey: MyTheme.colors.grey,
        neutral: MyTheme.colors.neutral,
        slate: colors.slate,

        warning: '#FBC02D',
        success: '#E53835',
        confirm: '#2E7D31',
        silver: '#F5F7FA',
        'l-grey': '#ADADAD',
        'd-grey': '#4D4D4D',
        bblack: '#263238',
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],

        hel: 'Helvetica, Arial, sans-serif',
      },
    },
  },
}
