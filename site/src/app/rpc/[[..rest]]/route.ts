import { RPCHandler } from '@orpc/server/fetch'
import { onError } from '@orpc/server'

import type { IncomingHttpHeaders } from 'node:http'
import { ORPCError, os } from '@orpc/server'
import * as z from 'zod'
import { NextResponse } from 'next/server'
import { guests } from '@/lib/db/schema'


export const createPlanet =
	os.$context<{ headers: IncomingHttpHeaders }>()
		.input(typeof guests.$inferInsert)
		.handler
		(async ({ input, context }) => {
			// your create code here
			if (password !== serverConfig.guestPassword) {
				return NextResponse.json(
					{ error: "Invalid WiFi password" },
					{ status: 401 },
				);
			}

			const db = getDb();

			await db.insert(guests).values({
				email,
				mac: mac || null,
				ip: ip || null,
				ap: ap || null,
				ssid: ssid || null,
			});

			if (mac) {
				await authorizeGuest(mac);
			}

			return {
				id
					: 1, name
					: 'name'
			}
		})

export const router = {
	portal: {
		auth: authClient
	}
}

const handler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error)
		}),
	],
})

async function handleRequest(request: Request) {
	const { response } = await handler.handle(request, {
		prefix: '/rpc',
		context: {}, // Provide initial context if needed
	})

	return response ?? new Response('Not found', { status: 404 })
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
