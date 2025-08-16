import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export async function isRateLimited(userId: string): Promise<Boolean> {
  const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  const POST_LIMIT = Number(process.env.POST_LIMIT) || 3;

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Upstash Redis credentials missing!");
  }

  const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  });

  const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(POST_LIMIT, "1 d"),
    analytics: true,
  });

  const { success } = await rateLimit.limit(userId);
  return success;
}
