import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import axios from "axios";

import SearchBox from "../components/SearchBox";
import TickerInfo from "../components/TickerInfo";
import StockDetails from "../components/StockDetails";
import { useParams } from "react-router-dom";

const HomePage = () => {
	const { ticker: searchTicker } = useParams();
	const [ticker, setTicker] = useState(searchTicker || "");

	return (
		<Container>
			<h2 className="mt-4 text-center">STOCK SEARCH</h2>
			<SearchBox ticker={ticker} setTicker={setTicker} />
			{ticker && (
				<>
					<StockDetails ticker={ticker} />
					<TickerInfo ticker={ticker} />
				</>
			)}
		</Container>
	);
};

export default HomePage;
