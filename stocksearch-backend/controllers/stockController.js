import axios from "axios";

import { addDays, addMonths } from "./../utils/addMonths.js";

const getCompanyDescription = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;
	let finnhub_url = `${process.env.FINNHUB_BASE_URL}/stock/profile2?symbol=${ticker_symbol}&token=${finnhub_api_key}`;

	let response = await axios.get(finnhub_url);
	console.log(response.data);

	res.status(200).json(response.data);
};

const getStockQuote = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;
	let finnhub_url = `${process.env.FINNHUB_BASE_URL}/quote?symbol=${ticker_symbol}&token=${finnhub_api_key}`;

	let response = await axios.get(finnhub_url);
	console.log(response.data);

	res.json(response.data);
};

const getChartData = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const polygon_api_key = process.env.POLYGON_API_KEY;
	const polygon_base_url = process.env.POLYGON_BASE_URL;
	const multiplier = 1;
	const timespan = "day";
	const toDate = new Date().toISOString().split("T")[0];
	// console.log(toDate);

	let fromDate = addMonths(new Date(), -6);
	fromDate = addDays(fromDate, -1).toISOString().split("T")[0];
	// console.log(fromDate);

	let polygon_url = `${polygon_base_url}/aggs/ticker/${ticker_symbol.toUpperCase()}/range/${multiplier}/${timespan}/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${polygon_api_key}`;

	// console.log(polygon_url);

	const response = await axios.get(polygon_url);
	res.json(response.data);
};

const getHourlyValidation = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const polygon_api_key = process.env.POLYGON_API_KEY;
	const polygon_base_url = process.env.POLYGON_BASE_URL;
	const multiplier = 1;
	const timespan = "hour";
	const toDate = new Date().toISOString().split("T")[0];

	let fromDate = addDays(new Date(), -3).toISOString().split("T")[0];
	console.log(fromDate);

	let polygon_url = `${polygon_base_url}/aggs/ticker/${ticker_symbol.toUpperCase()}/range/${multiplier}/${timespan}/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${polygon_api_key}`;

	const response = await axios.get(polygon_url);
	res.json(response.data);
};

const getCompanyNews = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;

	const toDate = new Date().toISOString().split("T")[0];
	let fromDate = addMonths(new Date(), -1);
	fromDate = fromDate.toISOString().split("T")[0];

	let finnhub_url = `${process.env.FINNHUB_BASE_URL}/company-news?symbol=${ticker_symbol}&&from=${fromDate}&to=${toDate}&token=${finnhub_api_key}`;

	const response = await axios.get(finnhub_url);
	const data = await response.data;
	const articles = [];
	data.forEach((article) => {
		if (
			article.image != "" &&
			article.url != "" &&
			article.headline != "" &&
			article.datetime != ""
		) {
			articles.push(article);
		}
	});
	res.json(articles);
	// res.json(data);
};

const getRecommendationTrends = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;

	let finnhub_url = `${process.env.FINNHUB_BASE_URL}/stock/recommendation?symbol=${ticker_symbol}&&token=${finnhub_api_key}`;

	const response = await axios.get(finnhub_url);
	console.log(response.data);
	res.json(response.data);
};

const getInsiderSentiment = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;

	const toDate = new Date().toISOString().split("T")[0];
	const fromDate = "2022-01-01";

	let finnhub_url = `${process.env.FINNHUB_BASE_URL}/stock/insider-sentiment?symbol=${ticker_symbol}&&from=${fromDate}&&to=${toDate}&&token=${finnhub_api_key}`;

	const response = await axios.get(finnhub_url);
	console.log(response.data);
	res.json(response.data);
};

const getCompanyPeers = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;

	let finnhub_url = `${process.env.FINNHUB_BASE_URL}/stock/peers?symbol=${ticker_symbol}&&token=${finnhub_api_key}`;

	const response = await axios.get(finnhub_url);
	console.log(response.data);
	res.json(response.data);
};

const getCompanyEarnings = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;

	let finnhub_url = `${process.env.FINNHUB_BASE_URL}/stock/earnings?symbol=${ticker_symbol}&&token=${finnhub_api_key}`;

	const response = await axios.get(finnhub_url);

	// TODO: Replace any values that are null with 0

	console.log(response.data);
	res.json(response.data);
};

export {
	getCompanyDescription,
	getStockQuote,
	getChartData,
	getHourlyValidation,
	getCompanyNews,
	getRecommendationTrends,
	getInsiderSentiment,
	getCompanyPeers,
	getCompanyEarnings,
};
