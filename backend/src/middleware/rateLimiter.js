import ratelimit from "../config/upstash.js";

const rateLimiter = async(req,res,next) => {
    
    try {
        const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        const { success } = await ratelimit.limit(ip);

        if (!success) return res.status(429).json({message: "too many requests, try again later"});

        next();

    } catch (error) {
        console.log("rate limit error:", error)
        return res.status(500).json({ message: "Internal server error" });

    }

} 

export default rateLimiter;