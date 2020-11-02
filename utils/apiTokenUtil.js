import jwt from 'jsonwebtoken';

export function generateToken(userId, secret, seconds) {
    const token = jwt.sign(
        { userId: userId, expire: Math.floor(Date.now() / 1000) + seconds},
        secret
    );
    return token;
}

export function verifyToken(token, secret) {
  try {
    const data = jwt.verify(token, Buffer.from(secret, 'base64'));
    if(data.expire < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch(e) {
    return false;
  }
}
