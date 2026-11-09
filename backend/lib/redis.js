import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// TLS is opt-in: managed Redis (e.g. Upstash, Redis Cloud) needs it,
// the bundled docker-compose Redis container does not.
const useTLS = process.env.REDIS_TLS === "true";

export const redis = new Redis(process.env.REDIS_URL, {
  ...(useTLS ? { tls: {} } : {}),
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
  console.log("❌ Redis Error:", err);
});
