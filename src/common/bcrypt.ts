import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  return bcrypt.hash(password, saltOrRounds);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
