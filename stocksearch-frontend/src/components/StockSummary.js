import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const StockSummary = ({ ticker }) => {
	const [stockData, setStockData] = useState({});
	const [loading, setLoading] = useState(false);

	const fetchStockData = async () => {
		const response = await axios.get(`/stock/quote/${ticker}`);
		const data = await response.data;
		setStockData(data);
	};

	useEffect(() => {
		setLoading(true);
		fetchStockData();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading Stock Quote</h1>;
	}

	return (
		<Container fluid className="text-center my-4">
			<p className="mb-0">
				<b>High Price:</b> {stockData.h}
			</p>
			<p className="mb-0">
				<b>Low Price:</b> {stockData.l}
			</p>
			<p className="mb-0">
				<b>Open Price: </b> {stockData.o}
			</p>
			<p className="mb-0">
				<b>Prev Close:</b> {stockData.pc}
			</p>
		</Container>
	);
};

export default StockSummary;
