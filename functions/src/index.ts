import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import AccountRouter from "./routes/unplannedRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", AccountRouter);
export const api = functions.https.onRequest(app);
