import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import axios from "axios";
import BuyModal from "./BuyModal";
import Loader from "./utils/Loader";
import { useTickerContext } from "../context/TickerContext";

const StockDetails = ({
	user,
	setUser,
	setAlertContent,
	setAlertVariant,
	setIsAlertVisible,
}) => {
	const [timestamp, setTimestamp] = useState(new Date());
	const [loading, setLoading] = useState(false);
	const [isMarketOpen, setIsMarketOpen] = useState(true);

	const [quantity, setQuantity] = useState(0);
	const [isBuyVisible, setIsBuyVisible] = useState(false);
	const [isSellVisible, setIsSellVisible] = useState(false);

	const { currentTickerSymbol: ticker, currentTickerData } = useTickerContext();

	console.log(currentTickerData);

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
			name: currentTickerData.companyDescription.name,
			quantity: parseInt(quantity),
			totalCost: (
				parseInt(quantity) * parseFloat(currentTickerData.stockInfo.c)
			).toFixed(2),
		});
		const updatedUser = await response.data;
		setQuantity(0);

		// Updating the alert to show relevant info
		setIsBuyVisible(false);
		setIsAlertVisible(true);
		setAlertContent(ticker + " bought successfully");
		setAlertVariant("success");

		// Update the user and stockList to update the quantity
		setUser(updatedUser);
	};

	const handleSell = async () => {
		const response = await axios.post(`/sell`, {
			ticker: ticker,
			quantity: parseInt(quantity),
			cost: (
				parseInt(quantity) * parseFloat(currentTickerData.stockInfo.c)
			).toFixed(2),
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
		setTimestamp(new Date(currentTickerData.stockInfo["t"] * 1000));
		let difference = Math.abs(
			new Date() - currentTickerData.stockInfo["t"] * 1000
		);
		let minutes = Math.floor(difference / 1000 / 60);
		setIsMarketOpen(minutes < 5);
	}, [ticker, user]);

	return (
		<Container className="my-4">
			<BuyModal
				show={isBuyVisible}
				handleClose={() => setIsBuyVisible(false)}
				quantity={quantity}
				setQuantity={setQuantity}
				// ticker={ticker}
				// currentPrice={stockQuote.c}
				balance={user?.money}
				onClickHandler={handleBuy}
				btnText={"Buy"}
			/>
			<BuyModal
				show={isSellVisible}
				handleClose={() => setIsSellVisible(false)}
				quantity={quantity}
				setQuantity={setQuantity}
				// ticker={ticker}
				// currentPrice={stockQuote.c}
				balance={user?.money}
				onClickHandler={handleSell}
				btnText={"Sell"}
			/>
			{loading ? (
				<Loader />
			) : (
				<>
					<Row className="gy-4">
						<Col className="text-center" xs={4}>
							<h2 className="fs-1">
								{ticker}
								<span onClick={toggleWatchList} className="fs-3 mx-2">
									{user && user.watchList && user.watchList.includes(ticker) ? (
										<i className="bi bi-star-fill"></i>
									) : (
										<i className="bi bi-star"></i>
									)}
								</span>
							</h2>
							<h3 className="fs-4 text-body-secondary">
								{currentTickerData.companyDescription.name}
							</h3>
							<p className="fs-6">
								{currentTickerData.companyDescription.exchange}
							</p>
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
						<Col className="text-center" xs={4}>
							<Image
								fluid
								className="w-75 object-fit-contain"
								src={currentTickerData.companyDescription.logo}
							/>
						</Col>
						<Col className="text-center" xs={4}>
							{currentTickerData.stockInfo.dp > 0 ? (
								<>
									<h2 className="text-success fs-1">
										{currentTickerData.stockInfo.c}
									</h2>
									<h4 className="text-success fs-4">
										<i className="bi bi-caret-up-fill"></i>
										{currentTickerData.stockInfo.d} (
										{currentTickerData.stockInfo?.dp?.toFixed(2)} %)
									</h4>
								</>
							) : (
								<>
									<h2 className="text-danger fs-1">
										{currentTickerData.stockInfo.c}
									</h2>
									<h4 className="text-danger fs-4">
										<i className="bi bi-caret-down-fill"></i>
										{currentTickerData.stockInfo.d} (
										{currentTickerData.stockInfo?.dp?.toFixed(2)} %)
									</h4>
								</>
							)}
							<p className="fs-6 text-body-secondary">
								{timestamp
									.toISOString()
									.slice(0, 19)
									.replace("T", " ")
									.replace("Z", " ")}
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
								Market closed on{" "}
								{timestamp
									.toISOString()
									.slice(0, 19)
									.replace("T", " ")
									.replace("Z", " ")}
							</p>
						)}
					</Row>
				</>
			)}
		</Container>
	);
};

export default StockDetails;
