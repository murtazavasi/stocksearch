import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import SearchBox from "../components/SearchBox";
import TickerInfo from "../components/TickerInfo";
import StockDetails from "../components/StockDetails";
import CustomAlert from "../components/CustomAlert";
import Loader from "../components/utils/Loader";

import { useTickerContext } from "../context/TickerContext";

const HomePage = () => {
	const { keyword: searchTicker } = useParams();
	const navigate = useNavigate();

	const { addTicker, loading, removeCurrentTicker, currentTickerSymbol } =
		useTickerContext();

	const [ticker, setTicker] = useState(
		currentTickerSymbol !== undefined ? currentTickerSymbol : searchTicker || ""
	);

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("userInfo"))
	);

	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [alertVariant, setAlertVariant] = useState("info");

	// const determineMarketStatus = () => {
	// 	let lastMarketTime = new Date(stockQuote["t"] * 1000);
	// 	let difference = Math.abs(new Date() - lastMarketTime);
	// 	let minutes = Math.floor(difference / 1000 / 60);
	// 	return minutes < 5;
	// };

	useEffect(() => {
		console.log(searchTicker);
		console.log(ticker);
		// Update ticker state when searchTicker changes
		setTicker(searchTicker || "");

		if (!searchTicker && currentTickerSymbol) {
			setTicker(currentTickerSymbol);
			navigate("/search/" + currentTickerSymbol);
		}

		if (searchTicker) {
			addTicker(searchTicker);
		}

		// This indicates that we don't have any data from prev state
		if (!searchTicker && !currentTickerSymbol) {
			removeCurrentTicker(searchTicker);
		}
	}, [searchTicker]);

	// useEffect(() => {
	// 	const updateData = async () => {
	// 		console.log("interval executed");
	// 		// TODO: This ticker is coming undefined or empty. Why?
	// 		console.log(ticker);
	// 		console.log(determineMarketStatus());
	// 		if (searchTicker && determineMarketStatus()) {
	// 			setLoading(true);
	// 			try {
	// 				await Promise.all([
	// 					fetchCompanyDescription(searchTicker),
	// 					fetchStockQuote(searchTicker),
	// 					fetchHourlyChartData(searchTicker),
	// 				]);
	// 			} catch (error) {
	// 				setLoading(false);
	// 				console.log(error);
	// 			}
	// 			setLoading(false);
	// 		}
	// 	};
	// 	let intervalId = setInterval(updateData, 15000);
	// 	return () => {
	// 		clearInterval(intervalId);
	// 	};
	// }, []);

	return (
		<Container>
			<h2 className="mt-4 text-center">STOCK SEARCH</h2>
			<SearchBox
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
							user={user}
							setUser={setUser}
							setAlertContent={setAlertContent}
							setAlertVariant={setAlertVariant}
							setIsAlertVisible={setIsAlertVisible}
						/>
						<TickerInfo ticker={ticker} />
					</>
				)
			)}
		</Container>
	);
};

export default HomePage;
