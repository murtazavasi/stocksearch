import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import axios from "axios";

const StockDetails = ({ userInfo, ticker }) => {
	const { watchList } = userInfo;

	const [companyDescription, setCompanyDescription] = useState({});
	const [timestamp, setTimestamp] = useState(new Date());
	const [stockQuote, setStockQuote] = useState({});
	const [loading, setLoading] = useState(false);
	const [isMarketOpen, setIsMarketOpen] = useState(true);

	const fetchStockQuote = async () => {
		const response = await axios.get(`/stock/quote/${ticker}`);
		const data = await response.data;
		setStockQuote(data);
		setTimestamp(new Date(data["t"] * 1000));

		let difference = Math.abs(new Date() - data["t"] * 1000);
		let minutes = Math.floor(difference / 1000 / 60);
		setIsMarketOpen(minutes < 5);
	};

	const fetchCompanyDescription = async () => {
		const response = await axios.get(`/stock/company/${ticker}`);
		const data = await response.data;

		setCompanyDescription(data);
	};

	useEffect(() => {
		setLoading(true);
		fetchCompanyDescription();
		fetchStockQuote();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<Container className="my-4">
			<Row>
				<Col className="text-center" xl={4}>
					<h2>
						{companyDescription.ticker}
						{watchList.includes(companyDescription.ticker) ? (
							<i className="bi bi-star-fill"></i>
						) : (
							<i className="bi bi-star"></i>
						)}
					</h2>
					<h3>{companyDescription.name}</h3>
					<p>{companyDescription.exchange}</p>
					<Button variant="primary" className="mr-2">
						Buy
					</Button>
					<Button variant="success">Sell</Button>
				</Col>
				<Col className="text-center" xl={4}>
					<Image
						fluid
						className="w-50 object-fit-contain"
						src={companyDescription.logo}
					/>
				</Col>
				<Col className="text-center" xl={4}>
					<h2>{stockQuote.c}</h2>
					<h4>
						{stockQuote.dp > 0 ? (
							<i className="bi bi-caret-up-fill"></i>
						) : (
							<i className="bi bi-caret-down-fill"></i>
						)}
						{stockQuote.d} ({stockQuote.dp})
					</h4>
					<p>{timestamp.toISOString()}</p>
				</Col>
			</Row>
			<Row>
				{isMarketOpen ? (
					<p className="text-center">Market is Open</p>
				) : (
					<p className="text-center">Market closed </p>
				)}
			</Row>
		</Container>
	);
};

export default StockDetails;
