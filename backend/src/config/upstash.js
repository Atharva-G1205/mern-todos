import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

import dotenv from 'dotenv';
dotenv.config();


// create a rate limiter that allows 10 requests per 20 sec
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '20 s'),
})

export default ratelimit;