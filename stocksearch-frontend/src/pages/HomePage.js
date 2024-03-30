import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import SearchBox from "../components/SearchBox";
import TickerInfo from "../components/TickerInfo";
import StockDetails from "../components/StockDetails";
import CustomAlert from "../components/CustomAlert";

const HomePage = () => {
	const { keyword: searchTicker } = useParams();
	const [ticker, setTicker] = useState(searchTicker || "");
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [alertVariant, setAlertVariant] = useState("info");

	useEffect(() => {
		// Update ticker state when searchTicker changes
		setTicker(searchTicker || "");
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
			{ticker && (
				<>
					<StockDetails
						ticker={ticker}
						setAlertContent={setAlertContent}
						setAlertVariant={setAlertVariant}
						setIsAlertVisible={setIsAlertVisible}
					/>
					<TickerInfo ticker={ticker} />
				</>
			)}
		</Container>
	);
};

export default HomePage;
