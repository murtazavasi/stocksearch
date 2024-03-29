import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import axios from "axios";
import BuyModal from "./BuyModal";
import Loader from "./utils/Loader";

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
	const [isBuyVisible, setIsBuyVisible] = useState(false);
	const [isSellVisible, setIsSellVisible] = useState(false);

	const fetchStockQuote = async () => {
		try {
			const response = await axios.get(`/stock/quote/${ticker}`);
			const data = await response.data;
			setStockQuote(data);
			setTimestamp(new Date(data["t"] * 1000));

			let difference = Math.abs(new Date() - data["t"] * 1000);
			let minutes = Math.floor(difference / 1000 / 60);
			setIsMarketOpen(minutes < 5);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCompanyDescription = async () => {
		try {
			const response = await axios.get(`/stock/company/${ticker}`);
			const data = await response.data;

			setCompanyDescription(data);
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
			quantity: parseInt(quantity),
			totalCost: (parseInt(quantity) * parseFloat(stockQuote.c)).toFixed(2),
		});
		const updatedUser = await response.data;
		setQuantity(0);

		// Updating the alert to show relevant info
		setIsBuyVisible(false);
		setIsAlertVisible(true);
		setAlertContent(ticker + " bought successfully");
		setAlertVariant("info");

		// Update the user and stockList to update the quantity
		setUser(updatedUser);
	};

	const handleSell = async () => {
		const response = await axios.post(`/sell`, {
			ticker: ticker,
			quantity: parseInt(quantity),
			cost: (parseInt(quantity) * parseFloat(stockQuote.c)).toFixed(2),
		});
		const updatedUser = await response.data;
		setQuantity(0);

		// Updating the alert to show relevant info
		setIsSellVisible(false);
		setIsAlertVisible(true);
		setAlertContent(ticker + " sold successfully");
		setAlertVariant("danger");

		// Update the user and stockList to update the quantity
		setUser(updatedUser);
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
				show={isBuyVisible}
				handleClose={() => setIsBuyVisible(false)}
				quantity={quantity}
				setQuantity={setQuantity}
				ticker={ticker}
				currentPrice={stockQuote.c}
				balance={user?.money}
				onClickHandler={handleBuy}
				btnText={"Buy"}
			/>
			<BuyModal
				show={isSellVisible}
				handleClose={() => setIsSellVisible(false)}
				quantity={quantity}
				setQuantity={setQuantity}
				ticker={ticker}
				currentPrice={stockQuote.c}
				balance={user?.money}
				onClickHandler={handleSell}
				btnText={"Sell"}
			/>
			{loading ? (
				<Loader />
			) : (
				<>
					<Row className="gy-4">
						<Col className="text-center" xl={4}>
							<h2 className="fs-1">
								{companyDescription.ticker}
								<span onClick={toggleWatchList} className="fs-3 mx-2">
									{user &&
									user.watchList &&
									user.watchList.includes(companyDescription.ticker) ? (
										<i className="bi bi-star-fill"></i>
									) : (
										<i className="bi bi-star"></i>
									)}
								</span>
							</h2>
							<h3 className="fs-4 text-body-secondary">
								{companyDescription.name}
							</h3>
							<p className="fs-6">{companyDescription.exchange}</p>
							<Button variant="success" onClick={() => setIsBuyVisible(true)}>
								Buy
							</Button>
							{user?.stocksBought
								?.map((item) => item.ticker)
								.includes(ticker) && (
								<Button
									className="ms-2"
									variant="danger"
									onClick={() => setIsSellVisible(true)}
								>
									Sell
								</Button>
							)}
						</Col>
						<Col className="text-center" xl={4}>
							<Image
								fluid
								className="w-25 object-fit-contain"
								src={companyDescription.logo}
							/>
						</Col>
						<Col className="text-center" xl={4}>
							{stockQuote.dp > 0 ? (
								<>
									<h2 className="text-success fs-1">{stockQuote.c}</h2>
									<h4 className="text-success fs-4">
										<i className="bi bi-caret-up-fill"></i>
										{stockQuote.d} ({stockQuote?.dp?.toFixed(2)} %)
									</h4>
								</>
							) : (
								<>
									<h2 className="text-danger fs-1">{stockQuote.c}</h2>
									<h4 className="text-danger fs-4">
										<i className="bi bi-caret-down-fill"></i>
										{stockQuote.d} ({stockQuote?.dp?.toFixed(2)} %)
									</h4>
								</>
							)}
							<p className="fs-6 text-body-secondary">
								{timestamp.toISOString()}
							</p>
						</Col>
					</Row>
					<Row>
						{isMarketOpen ? (
							<p className="text-center text-success fw-medium">
								Market is Open
							</p>
						) : (
							<p className="text-center text-danger fw-medium">
								Market closed on {timestamp.toISOString()}
							</p>
						)}
					</Row>
				</>
			)}
		</Container>
	);
};

export default StockDetails;
