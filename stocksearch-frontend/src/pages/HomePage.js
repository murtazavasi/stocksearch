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
	// const params = useParams();
	// const [user, setUser] = useState(
	// 	JSON.parse(localStorage.getItem("userInfo"))
	// );

	// const fetchUserData = async () => {
	// 	const response = await axios.get(
	// 		`/user/`
	// 	);
	// };

	// useEffect(() => {}, []);

	return (
		<Container>
			<h2 className="mt-4 text-center">STOCK SEARCH</h2>
			<SearchBox ticker={ticker} setTicker={setTicker} />
			{ticker && (
				<>
					<StockDetails userInfo={{ watchList: [] }} ticker={ticker} />
					<TickerInfo ticker={ticker} />
				</>
			)}
		</Container>
	);
};

export default HomePage;
