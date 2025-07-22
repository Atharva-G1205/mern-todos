import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware

// the cors function can also have no arguments, that basically allows requests all ips / domains
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

/*   
What is an endpoint? 
An endpoint is a combination of a URL + HTTP method that lets the client interact with ecific resource.
*/

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
})
