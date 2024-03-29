import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

import { userRouter } from "./routes/users.js";
import { tickerRouter } from "./routes/ticker.js";
import { stockRouter } from "./routes/stock.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

connectDB();
app.use(userRouter);
app.use(tickerRouter);
app.use("/stock", stockRouter);

// Build changes
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(join(__dirname, "./../stocksearch-frontend/build/")));

	app.get("*", (req, res) => {
		res.sendFile(join(__dirname, "./../stocksearch-frontend/build/index.html"));
	});
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
});
