const Redis = require("ioredis");

let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);

export default async function handler(req, res) {
  const { name, score } = req.body;

  console.log("--> 1", name, score);
  console.log(process.env.NEXT_PUBLIC_REDIS_URL);

  await redis.zadd("scores", score, name);
  const rank = await redis.zrevrank("scores", name);

  console.log("--> 2", name, score, rank);

  res.status(200).json({ success: true, rank });
}
