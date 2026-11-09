import { SignJWT, jwtVerify } from "jose";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const secretKey = "existence";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { info: unknown; expires: Date }) {
  return await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function setSession(info: any, key: string, expires: Date) {
  const session = await encrypt({ info, expires });

  setCookie(key, session, {
    path: "/",
    expires,
  });
}

export function deleteCookies(key: string | string[]) {
  if (Array.isArray(key)) {
    for (let index = 0; index < key.length; index++) {
      const cookieKey = key[index];
      deleteCookie(cookieKey);
    }
  } else {
    return deleteCookie(key);
  }
}

export async function getSession<K = any>(key: string): Promise<K | null> {
  const session = getCookie(key);
  if (!session) return null;
  const decrypted = await decrypt(session);
  return decrypted.info as K;
}
