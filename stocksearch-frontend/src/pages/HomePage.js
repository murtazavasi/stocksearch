import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import axios from "axios";

import SearchBox from "../components/SearchBox";
import TickerInfo from "../components/TickerInfo";
import StockDetails from "../components/StockDetails";
import { useParams } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

const HomePage = () => {
	const { ticker: searchTicker } = useParams();
	const [ticker, setTicker] = useState(searchTicker || "");
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [alertVariant, setAlertVariant] = useState("info");

	return (
		<Container>
			<h2 className="mt-4 text-center">STOCK SEARCH</h2>
			<SearchBox ticker={ticker} setTicker={setTicker} />
			{ticker && (
				<>
					{isAlertVisible && (
						<CustomAlert content={alertContent} variant={alertVariant} />
					)}
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
