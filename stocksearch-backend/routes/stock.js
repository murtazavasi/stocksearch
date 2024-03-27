import express from "express";

import {
	getCompanyDescription,
	getChartData,
	getCompanyNews,
	getRecommendationTrends,
	getInsiderSentiment,
	getCompanyPeers,
	getCompanyEarnings,
	getStockQuote,
	getHourlyValidation,
} from "../controllers/stockController.js";

const stockRouter = express.Router();

stockRouter.get("/company/:symbol", getCompanyDescription);
stockRouter.get("/quote/:symbol", getStockQuote);
stockRouter.get("/recommendation-trends/:symbol", getRecommendationTrends);
stockRouter.get("/news/:symbol", getCompanyNews);
stockRouter.get("/charts/:symbol", getChartData);
stockRouter.get("/charts/hourly-validation/:symbol", getHourlyValidation);
stockRouter.get("/insider-sentiment/:symbol", getInsiderSentiment);
stockRouter.get("/peers/:symbol", getCompanyPeers);
stockRouter.get("/earnings/:symbol", getCompanyEarnings);

export { stockRouter };
