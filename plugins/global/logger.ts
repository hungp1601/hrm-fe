import VueLogger from 'vuejs3-logger'
import { createApp } from 'vue'

const isProduction = process.env.NODE_ENV === 'production'

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true,
}

createApp({}).use(VueLogger, options)
