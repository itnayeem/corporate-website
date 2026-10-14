import { setAuthTokenGetter } from "@workspace/api-client-react";

const TOKEN_KEY = "itnayeem_admin_token";

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("itnayeem-auth"));
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("itnayeem-auth"));
}

export function isAdminAuthed(): boolean {
  return Boolean(getAdminToken());
}

// Register a global getter so generated API hooks attach the admin bearer token
// to every request (used for the authenticated PUT /content endpoint).
setAuthTokenGetter(() => getAdminToken());
