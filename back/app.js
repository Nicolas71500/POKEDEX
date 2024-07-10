import "dotenv/config";

import express from "express";
import cors from "cors";


import { router } from "./app/router.js";


const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use(express.json()); 



app.use(router);


const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`🚀 API demarrée à l'adresse : http://localhost:${port}`);