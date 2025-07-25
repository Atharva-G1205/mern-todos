import ratelimit from "../config/upstash.js";

const rateLimiter = async(req,res,next) => {
    
    try {
        // const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        let ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.connection.remoteAddress;

    // Normalize IPv6-mapped IPv4 addresses like ::ffff:192.168.1.1
        if (ip?.startsWith("::ffff:")) {
        ip = ip.substring(7);
        }
        const { success } = await ratelimit.limit(ip);

        if (!success) return res.status(429).json({message: "too many requests, try again later"});

        next();

    } catch (error) {
        console.log("rate limit error:", error)
        return res.status(500).json({ message: "Internal server error" });

    }

} 

export default rateLimiter;