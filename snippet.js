const Redis = require('ioredis');
const redis = new Redis();
const jwt = require('jsonwebtoken');

async function issueToken(userId, expireMinutes, secret) {
    const issuePromise = new Promise((resolve, reject) => {
        jwt.sign(
            {userId: userId, expire: Math.floor(Date.now() / 1000) + (60*expireMinutes)},
            secret,
            (err, encoded) => {
                if (err) reject(err);
                resolve(encoded);
            }
        );
    });
    return issued = await issuePromise.catch(e => null);
}

async function verifyToken(token, secret) {
    const verifyPromise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
    return verify = await verifyPromise.catch(e => null);
}

(async function () {
    const initialTokenSecret = "gasd";
    const token = await issueToken('kai191', 5, initialTokenSecret);
    const decoded = await verifyToken(token, initialTokenSecret);
    console.log(decoded);
    redis.disconnect();
})();
