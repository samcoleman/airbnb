import { os, ORPCError } from '@orpc/server'
import * as z from 'zod'

const getPortalConfig = os
  .handler(async () => {
    return {
      portalName: process.env.PORTAL_NAME || 'Guest Portal',
      requiresTerms: true,
      termsText: process.env.TERMS_TEXT || 'Please accept our terms and conditions to use the guest network.',
      welcomeMessage: process.env.WELCOME_MESSAGE || 'Welcome to our guest network!',
    }
  })

const authenticatePortal = os
  .input(z.object({
    email: z.string().email(),
    password: z.string(),
    termsAccepted: z.boolean(),
    mac: z.string().optional(),
    ap: z.string().optional(),
    ssid: z.string().optional(),
    token: z.string().optional(),
  }))
  .handler(async ({ input }) => {
    if (!input.termsAccepted) {
      throw new ORPCError('BAD_REQUEST', {
        message: 'You must accept the terms and conditions',
      })
    }

    const guestPassword = process.env.GUEST_PASSWORD
    if (!guestPassword) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Guest password not configured',
      })
    }

    if (input.password !== guestPassword) {
      throw new ORPCError('UNAUTHORIZED', {
        message: 'Invalid guest password',
      })
    }

    return {
      success: true,
      redirectUrl: '/welcome',
      sessionExpires: new Date(Date.now() + 3600000),
      email: input.email,
    }
  })

const captureEmail = os
  .input(z.object({
    email: z.string().email(),
    termsAccepted: z.boolean(),
    timestamp: z.date(),
    ip: z.string().optional(),
    userAgent: z.string().optional(),
  }))
  .handler(async ({ input }) => {
    return {
      success: true,
      id: 'placeholder-id',
      email: input.email,
    }
  })

export const router = {
  portal: {
    config: getPortalConfig,
    authenticate: authenticatePortal,
    captureEmail: captureEmail,
  },
}

export type AppRouter = typeof router