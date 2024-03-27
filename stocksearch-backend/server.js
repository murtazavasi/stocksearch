import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import { connectDB } from "./config/db.js";

import { userRouter } from "./routes/users.js";
import { tickerRouter } from "./routes/ticker.js";
import { stockRouter } from "./routes/stock.js";

dotenv.config();

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.json());
app.use(morgan("dev"));

connectDB();
app.get("/", (req, res) => {
	res.send("Home");
});

app.use(userRouter);
app.use(tickerRouter);
app.use("/stock", stockRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
});
