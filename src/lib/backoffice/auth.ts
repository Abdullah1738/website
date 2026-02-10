import "server-only";

import crypto from "node:crypto";

import { cookies } from "next/headers";

const COOKIE_NAME = "arbatai_backoffice";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function sha256(input: string): Buffer {
  return crypto.createHash("sha256").update(input, "utf8").digest();
}

function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function verifyBackofficePassword(candidate: string): boolean {
  const expected = requiredEnv("BACKOFFICE_PASSWORD");
  return timingSafeEqual(sha256(candidate), sha256(expected));
}

function sessionSecret(): string {
  // Optional: separate signing secret; otherwise derive from the password.
  return process.env.BACKOFFICE_SESSION_SECRET ?? requiredEnv("BACKOFFICE_PASSWORD");
}

function sign(dataB64Url: string): Buffer {
  return crypto.createHmac("sha256", sessionSecret()).update(dataB64Url, "utf8").digest();
}

type SessionPayload = { exp: number };

function encodePayload(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodePayload(dataB64Url: string): SessionPayload | null {
  try {
    const raw = Buffer.from(dataB64Url, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as SessionPayload;
    if (!parsed || typeof parsed.exp !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function setBackofficeSessionCookie(): Promise<void> {
  const exp = Date.now() + SESSION_TTL_MS;
  const data = encodePayload({ exp });
  const sig = sign(data).toString("base64url");
  const value = `${data}.${sig}`;

  const store = await cookies();
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/backoffice",
    expires: new Date(exp),
  });
}

export async function clearBackofficeSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/backoffice",
    expires: new Date(0),
  });
}

export async function isBackofficeAuthed(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;

  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [data, sigB64] = parts;

  const expectedSig = sign(data);
  let actualSig: Buffer;
  try {
    actualSig = Buffer.from(sigB64, "base64url");
  } catch {
    return false;
  }

  if (!timingSafeEqual(actualSig, expectedSig)) return false;

  const payload = decodePayload(data);
  if (!payload) return false;
  if (payload.exp <= Date.now()) return false;

  return true;
}
