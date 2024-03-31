import React, { useState, useContext } from "react";
import axios from "axios";

export const TickerContext = React.createContext({
	currentTickerSymbol: "",
	currentTickerData: {
		symbol: "",
		companyDescription: {},
		stockInfo: {},
		peers: [],
		topNews: [],
		insiderSentiments: {},
		chartData: [],
		recommendationChartData: [],
		historicalChartData: [],
		hourlyChartData: [],
	},
	tickers: [
		{
			symbol: "",
			companyDescription: {},
			stockInfo: {},
			peers: [],
			topNews: [],
			chartData: [],
			recommendationChartData: [],
			historicalChartData: [],
			hourlyChartData: [],
		},
	],
	loading: false,
	setCurrentTicker: () => {},
	addTicker: () => {},
	updateTicker: () => {},
	removeTicker: () => {},
	removeCurrentTicker: () => {},
});

export const TickerContextProvider = ({ children }) => {
	const [tickers, setTickers] = useState({ tickers: [] });
	const [currentTickerSymbol, setCurrentTickerSymbol] = useState("");
	const [currentTickerData, setCurrentTickerData] = useState("");
	const [loading, setLoading] = useState(false);

	const fetchStockQuote = async (value) => {
		try {
			const response = await axios.get(`/stock/quote/${value}`);
			const data = await response.data;
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCompanyDescription = async (value) => {
		try {
			const response = await axios.get(`/stock/company/${value}`);
			const data = await response.data;

			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchPeerData = async (value) => {
		try {
			const response = await axios.get(`/stock/peers/${value}`);
			const data = await response.data;
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchTopNews = async (value) => {
		try {
			const response = await axios.get(`/stock/news/${value}`);
			const data = await response.data;
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchHourlyChartData = async (value) => {
		try {
			const response = await axios.get(
				`/stock/charts/hourly-validation/${value}`
			);
			const data = await response.data;
			const temp = data.results.map((item) => [item["t"], item["c"]]);
			console.log(temp);

			return temp;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchChartData = async (value) => {
		try {
			const response = await axios.get(`/stock/charts/${value}`);
			const data = await response.data;

			return data;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const fetchRecommendationChartData = async (value) => {
		try {
			const response = await axios.get(`/stock/recommendation-trends/${value}`);
			const data = await response.data;

			// Extract all keys present in the input data
			const allKeys = Array.from(
				new Set(data.flatMap((item) => Object.keys(item)))
			);

			// Initialize an object to store values for each key
			const valuesByKeys = {};

			// Iterate over each key
			allKeys.forEach((key) => {
				// Initialize an array for the values corresponding to the key
				valuesByKeys[key] = [];

				// Push the values corresponding to the key from each object into the array
				data.forEach((item) => {
					valuesByKeys[key].push(item[key]);
				});
			});

			console.log(valuesByKeys);

			let finalData = [];
			let categories = [];
			Object.entries(valuesByKeys).forEach(([key, value]) => {
				if (key !== "period" && key !== "symbol") {
					finalData.push({
						name: key,
						data: Array.from(value),
					});
				}
				if (key === "period") {
					categories = Array.from(value);
				}
			});

			return [categories, finalData];
		} catch (error) {
			console.log(error);
		}
	};

	const fetchHistoricalChartData = async (value) => {
		try {
			const response = await axios.get(`/stock/earnings/${value}`);
			const data = await response.data;

			let series1_data = [];
			let series2_data = [];

			data.forEach((item) => {
				const date = new Date(item.period);
				const timestamp = date.getTime();

				series1_data.push([timestamp, item.estimate]);
				series2_data.push([timestamp, item.surprisePercent]);
			});

			return [series1_data, series2_data];
		} catch (error) {
			console.log(error);
		}
	};

	const fetchInsiderSentiments = async (value) => {
		const response = await axios.get(`/stock/insider-sentiment/${value}`);
		const data = await response.data;
		return data;
	};

	const addTicker = async (newTickerSymbol) => {
		try {
			setLoading(true);
			// TODO: Check if the ticker is already present if so just switch the current ticker value

			let existingTicker = tickers.tickers.filter(
				(item) => item.symbol === newTickerSymbol
			);

			console.log(existingTicker);

			if (existingTicker.length > 0) {
				setCurrentTickerSymbol(existingTicker[0].symbol);
				setCurrentTickerData(existingTicker[0]);
				return;
			}

			const [
				companyDescription,
				stockInfo,
				hourlyChartData,
				peers,
				topNews,
				chartData,
				recommendationChartData,
				historicalChartData,
				insiderSentiments,
			] = await Promise.all([
				fetchCompanyDescription(newTickerSymbol),
				fetchStockQuote(newTickerSymbol),
				fetchHourlyChartData(newTickerSymbol),
				fetchPeerData(newTickerSymbol),
				fetchTopNews(newTickerSymbol),
				fetchChartData(newTickerSymbol),
				fetchRecommendationChartData(newTickerSymbol),
				fetchHistoricalChartData(newTickerSymbol),
				fetchInsiderSentiments(newTickerSymbol),
			]);

			const newTickerData = {
				symbol: newTickerSymbol,
				companyDescription: companyDescription,
				stockInfo: stockInfo,
				peers: peers,
				topNews: topNews,
				insiderSentiments: insiderSentiments,
				chartData: chartData,
				recommendationChartData: recommendationChartData,
				historicalChartData: historicalChartData,
				hourlyChartData: hourlyChartData,
			};

			setTickers((prevState) => {
				return {
					tickers: [...prevState.tickers, newTickerData],
				};
			});
			setCurrentTickerSymbol(newTickerSymbol);
			setCurrentTickerData(newTickerData);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const updateTicker = async (tickerSymbol) => {};

	const removeTicker = (tickerSymbol) => {
		let tickerList = [...tickers.tickers];
		tickerList.filter((ticker) => ticker.symbol !== tickerSymbol);
		setTickers(tickerList);
		setCurrentTickerSymbol("");
	};

	const removeCurrentTicker = () => {
		setCurrentTickerSymbol("");
		setCurrentTickerData({});
	};

	return (
		<TickerContext.Provider
			value={{
				currentTickerSymbol,
				currentTickerData,
				tickers,
				loading,
				addTicker,
				removeTicker,
				removeCurrentTicker,
			}}
		>
			{children}
		</TickerContext.Provider>
	);
};

export const useTickerContext = () => {
	return useContext(TickerContext);
};
