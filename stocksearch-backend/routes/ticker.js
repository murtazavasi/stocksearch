import express from "express";
import { getAutocompleteData } from "../controllers/tickerController.js";

const tickerRouter = express.Router();

tickerRouter.get("/search/autocomplete/:symbol", getAutocompleteData);

export { tickerRouter };
