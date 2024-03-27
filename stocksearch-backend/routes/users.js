import express from "express";
import {
	addItemToWatchlist,
	buyStock,
	deleteItemFromWatchlist,
	getDefaultUser,
	getWatchlist,
	sellStock,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/watchlist", getWatchlist);
userRouter.get("/user", getDefaultUser);
userRouter.post("/watchlist", addItemToWatchlist);
userRouter.post("/buy", buyStock);
userRouter.post("/sell", sellStock);
userRouter.delete("/watchlist", deleteItemFromWatchlist);

export { userRouter };
