import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from "./routes/index";
import { error } from "console";

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT , () => {
    console.log("Server running on http://localhost:" + process.env.PORT + "/")
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error' , (error: Error) => console.log(error));

app.use("/", router());


