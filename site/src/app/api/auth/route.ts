import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { guests } from "@/lib/db/schema";
import { ensureDbInit } from "@/lib/db/migrate";
import { serverConfig } from "@/lib/server-config";
import { authorizeGuest } from "@/lib/unifi";

export async function POST(request: NextRequest) {
	try {
		ensureDbInit();
		const body = await request.json();
		const { email, password, mac, ip, ap, ssid } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password are required" },
				{ status: 400 },
			);
		}


		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Auth error:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 500 },
		);
	}
}
