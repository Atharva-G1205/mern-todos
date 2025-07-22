import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

// middleware

// the cors function can also have no arguments, that basically allows requests all ips / domains
// only needed if a service is requested from another domain or ip

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
})
}

/*   
What is an endpoint? 
An endpoint is a combination of a URL + HTTP method that lets the client interact with ecific resource.
*/

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
})
