import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../../.env') })

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  uniFi: {
    url: process.env.UNIFI_URL || 'https://unifi-controller:8443',
    user: process.env.UNIFI_USER || '',
    password: process.env.UNIFI_PASSWORD || '',
    site: process.env.UNIFI_SITE || 'default',
  },
  
  portal: {
    guestPassword: process.env.GUEST_PASSWORD || '',
    name: process.env.PORTAL_NAME || 'Guest Portal',
    welcomeMessage: process.env.WELCOME_MESSAGE || 'Welcome to our guest network!',
    termsText: process.env.TERMS_TEXT || 'Please accept our terms and conditions to use the guest network.',
  },
  
  session: {
    timeout: parseInt(process.env.SESSION_TIMEOUT || '3600', 10),
  },
} as const