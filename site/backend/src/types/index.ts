export interface PortalConfig {
  portalName: string
  requiresTerms: boolean
  termsText: string
  welcomeMessage: string
}

export interface AuthenticationRequest {
  email: string
  password: string
  termsAccepted: boolean
  mac?: string
  ap?: string
  ssid?: string
  token?: string
}

export interface AuthenticationResponse {
  success: boolean
  redirectUrl: string
  sessionExpires: Date
  email: string
}

export interface EmailCaptureRequest {
  email: string
  termsAccepted: boolean
  timestamp: Date
  ip?: string
  userAgent?: string
}

export interface EmailCaptureResponse {
  success: boolean
  id: string
  email: string
}