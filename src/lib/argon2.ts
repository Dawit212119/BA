import { hash, verify, type Options } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  const res = await hash(password, opts);
  return res;
}
export async function verifyPassword(data: { hash: string; password: string }) {
  const { hash, password } = data;
  const res = await verify(hash, password, opts);
  return res;
}
