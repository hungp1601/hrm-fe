import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const MyTheme = {
  colors: {
    warning: '#FBC02D',
    success: '#E53835',
    confirm: '#2E7D31',
    grey: '#717171',
    silver: '#F5F7FA',

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
      '50': '#B8E2FF',
      '100': '#DEEBFF',
      '200': '#B3D4FF',
      '300': '#4C9AFF',
      '400': '#2684FF',
      '500': '#0096FF',
      '600': '#2684FF',
      '700': '#0065FF',
      '800': '#0052CC',
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
        // if want to change primary color to blue
        // primary: MyTheme.colors.blue,
        green: MyTheme.colors.green,
        blue: MyTheme.colors.blue,
        red: MyTheme.colors.red,
        slate: colors.slate,
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
