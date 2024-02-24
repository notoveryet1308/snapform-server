import jwt from 'jsonwebtoken';
import appConfig from '../appConfig';


const publicKey = Buffer.from(
  appConfig.publicKey as string,
  'base64'
).toString('ascii');

const privateKey =  Buffer.from(
  appConfig.privateKey as string,
  'base64'
).toString('ascii');


export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  const token = jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
  return token;
}

export function verifyJwt<T>(token: string): T | null{
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
