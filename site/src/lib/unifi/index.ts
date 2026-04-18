import { serverConfig } from "@/lib/server-config";

let cookie: string | null = null;

async function ensureAuthenticated() {
  if (cookie) return cookie;

  const res = await fetch(`${serverConfig.unifiUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: serverConfig.unifiUser,
      password: serverConfig.unifiPassword,
    }),
  });

  if (!res.ok) {
    throw new Error(`UniFi login failed: ${res.status}`);
  }

  const setCookie = res.headers.getSetCookie();
  cookie = setCookie.join("; ");
  return cookie;
}

export async function authorizeGuest(mac: string): Promise<void> {
  const authCookie = await ensureAuthenticated();

  const res = await fetch(
    `${serverConfig.unifiUrl}/api/s/${serverConfig.unifiSite}/cmd/stamgr`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({
        cmd: "authorize-guest",
        mac,
        minutes: serverConfig.sessionTimeout / 60,
      }),
    },
  );

  if (!res.ok) {
    cookie = null;
    throw new Error(`UniFi authorize failed: ${res.status}`);
  }
}
