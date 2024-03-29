import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import axios from "axios";
import BuyModal from "./BuyModal";

const StockDetails = ({
	ticker,
	setAlertContent,
	setAlertVariant,
	setIsAlertVisible,
}) => {
	const [companyDescription, setCompanyDescription] = useState({});
	const [timestamp, setTimestamp] = useState(new Date());
	const [stockQuote, setStockQuote] = useState({});
	const [loading, setLoading] = useState(false);
	const [isMarketOpen, setIsMarketOpen] = useState(true);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("userInfo"))
	);
	const [quantity, setQuantity] = useState(0);
	const [isModalVisible, setIsModalVisible] = useState(false);

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

	const fetchUserData = async () => {
		const response = await axios.get(`/user/`);
		const data = response.data;
		setUser(data);
	};

	const toggleWatchList = async () => {
		try {
			let response;
			if (user.watchList.includes(ticker)) {
				response = await axios.delete(`/watchlist`, {
					data: {
						ticker: ticker,
					},
				});
			} else if (!user.watchList.includes(ticker)) {
				response = await axios.post(`/watchlist`, {
					ticker: ticker,
				});
			}
			const data = await response.data;
			setUser(data);
		} catch (error) {
			console.log(`Error occurred while toggling watchlist item`);
		}
	};

	const handleBuy = async () => {
		const response = await axios.post(`/buy`, {
			ticker: ticker,
			name: companyDescription.name,
			quantity: quantity,
			totalCost: (parseInt(quantity) * parseFloat(stockQuote.c)).toFixed(2),
		});
		await response.data;
		setIsModalVisible(false);
		setIsAlertVisible(true);
		setAlertContent(ticker + " bought successfully");
		setAlertVariant("info");
	};

	useEffect(() => {
		setLoading(true);
		fetchCompanyDescription();
		fetchStockQuote();
		fetchUserData();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<Container className="my-4">
			<BuyModal
				show={isModalVisible}
				handleClose={() => setIsModalVisible(false)}
				quantity={quantity}
				setQuantity={setQuantity}
				ticker={ticker}
				currentPrice={stockQuote.c}
				balance={user?.money}
				onClickHandler={handleBuy}
				btnText={"Buy"}
			/>
			<Row>
				<Col className="text-center" xl={4}>
					<h2>
						{companyDescription.ticker}
						<span onClick={toggleWatchList}>
							{user &&
							user.watchList &&
							user.watchList.includes(companyDescription.ticker) ? (
								<i className="bi bi-star-fill"></i>
							) : (
								<i className="bi bi-star"></i>
							)}
						</span>
					</h2>
					<h3>{companyDescription.name}</h3>
					<p>{companyDescription.exchange}</p>
					<Button variant="primary" onClick={() => setIsModalVisible(true)}>
						Buy
					</Button>
				</Col>
				<Col className="text-center" xl={4}>
					<Image
						fluid
						className="w-25 object-fit-contain"
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
