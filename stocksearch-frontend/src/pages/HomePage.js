import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

import SearchBox from "../components/SearchBox";
import TickerInfo from "../components/TickerInfo";
import StockDetails from "../components/StockDetails";
import CustomAlert from "../components/CustomAlert";
import Loader from "../components/utils/Loader";

const HomePage = () => {
	const { keyword: searchTicker } = useParams();

	const [ticker, setTicker] = useState(searchTicker || "");
	const [companyDescription, setCompanyDescription] = useState({});
	const [stockQuote, setStockQuote] = useState({});
	const [hourlyChartData, setHourlyChartData] = useState([]);
	const [peers, setPeers] = useState([]);
	const [news, setNews] = useState([]);
	const [chartData, setChartData] = useState(null);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("userInfo"))
	);

	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [alertVariant, setAlertVariant] = useState("info");
	const [loading, setLoading] = useState(false);

	const fetchStockQuote = async (value) => {
		try {
			const response = await axios.get(`/stock/quote/${value}`);
			const data = await response.data;
			setStockQuote(data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCompanyDescription = async (value) => {
		try {
			const response = await axios.get(`/stock/company/${value}`);
			const data = await response.data;

			setCompanyDescription(data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchPeerData = async (value) => {
		try {
			const response = await axios.get(`/stock/peers/${value}`);
			const data = await response.data;
			setPeers(data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchTopNews = async (value) => {
		try {
			const response = await axios.get(`/stock/news/${value}`);
			const data = await response.data;
			setNews(data);
		} catch (error) {
			console.log(error);
		}
	};

	const determineMarketStatus = () => {
		let lastMarketTime = new Date(stockQuote["t"] * 1000);
		let difference = Math.abs(new Date() - lastMarketTime);
		let minutes = Math.floor(difference / 1000 / 60);
		return minutes < 5;
	};

	const fetchHourlyChartData = async (value) => {
		try {
			const response = await axios.get(
				`/stock/charts/hourly-validation/${value}`
			);
			const data = await response.data;
			const temp = data.results.map((item) => [item["t"], item["c"]]);
			console.log(temp);

			setHourlyChartData(temp);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchChartData = async (value) => {
		try {
			const response = await axios.get(`/stock/charts/${value}`);
			const data = await response.data;

			setChartData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const fetchUserData = async () => {
		try {
			const response = await axios.get(`/user/`);
			const data = response.data;
			setUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// Update ticker state when searchTicker changes
		setTicker(searchTicker || "");
		const fetchData = async () => {
			try {
				setLoading(true);
				await Promise.all([
					fetchCompanyDescription(searchTicker),
					fetchStockQuote(searchTicker),
					fetchHourlyChartData(searchTicker),
					fetchPeerData(searchTicker),
					fetchTopNews(searchTicker),
					fetchChartData(searchTicker),
					fetchUserData(),
				]);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		if (searchTicker) {
			fetchData();
		}
	}, [searchTicker]);

	useEffect(() => {
		const updateData = async () => {
			console.log("interval executed");
			// TODO: This ticker is coming undefined or empty. Why?
			console.log(ticker);
			console.log(determineMarketStatus());
			if (searchTicker && determineMarketStatus()) {
				setLoading(true);
				try {
					await Promise.all([
						fetchCompanyDescription(searchTicker),
						fetchStockQuote(searchTicker),
						fetchHourlyChartData(searchTicker),
						fetchPeerData(searchTicker),
					]);
				} catch (error) {
					setLoading(false);
					console.log(error);
				}
				setLoading(false);
			}
		};
		let intervalId = setInterval(updateData, 15000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<Container>
			<h2 className="mt-4 text-center">STOCK SEARCH</h2>
			<SearchBox
				ticker={ticker}
				setTicker={setTicker}
				setAlertContent={setAlertContent}
				setAlertVariant={setAlertVariant}
				setIsAlertVisible={setIsAlertVisible}
			/>
			{isAlertVisible && (
				<CustomAlert content={alertContent} variant={alertVariant} />
			)}
			{loading ? (
				<Loader />
			) : (
				ticker && (
					<>
						<StockDetails
							ticker={ticker}
							stockQuote={stockQuote}
							companyDescription={companyDescription}
							user={user}
							setUser={setUser}
							setAlertContent={setAlertContent}
							setAlertVariant={setAlertVariant}
							setIsAlertVisible={setIsAlertVisible}
						/>
						<TickerInfo
							ticker={ticker}
							stockQuote={stockQuote}
							companyDescription={companyDescription}
							user={user}
							hourlyChartData={hourlyChartData}
							peers={peers}
							news={news}
							chartData={chartData}
						/>
					</>
				)
			)}
		</Container>
	);
};

export default HomePage;
