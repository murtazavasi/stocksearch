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

	const fetchUserData = async () => {
		try {
			const response = await axios.get(`/user/`);
			const data = response.data;
			setUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	console.log("loading ", loading);
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
						/>
					</>
				)
			)}
		</Container>
	);
};

export default HomePage;
