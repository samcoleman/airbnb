function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const serverConfig = {
  get unifiUrl() {
    return getEnv("UNIFI_URL");
  },
  get unifiUser() {
    return getEnv("UNIFI_USER");
  },
  get unifiPassword() {
    return getEnv("UNIFI_PASSWORD");
  },
  get unifiSite() {
    return getEnv("UNIFI_SITE");
  },
  get guestPassword() {
    return getEnv("GUEST_PASSWORD");
  },
  get databasePath() {
    return getEnv("DATABASE_PATH");
  },
  get sessionTimeout() {
    return parseInt(getEnv("SESSION_TIMEOUT"), 10);
  },
};
