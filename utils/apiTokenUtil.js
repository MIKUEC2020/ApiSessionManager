import jwt from 'jsonwebtoken';

export function generateToken(userId, secret, seconds) {
    const token = jwt.sign(
        { userId: userId, expire: Math.floor(Date.now() / 1000) + seconds},
        secret
    );
    return token;
}

export function verifyTokenExpiration(token, secret) {
  try {
    const data = jwt.verify(token, Buffer.from(secret, 'base64'));
    if(data.expire < Math.floor(Date.now() / 1000)) return 'Token expired';
    return data;
  } catch(e) {
    return 'Invalid token signature';
  }
}
