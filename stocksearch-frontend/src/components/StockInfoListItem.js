import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import axios from "axios";

import BuyModal from "./BuyModal";

const StockInfoListItem = ({
	stock,
	money,
	loading,
	setLoading,
	setIsAlertVisible,
	setAlertContent,
	setAlertVariant,
}) => {
	const [quantity, setQuantity] = useState(0);
	const [stockInfo, setStockInfo] = useState({});
	const [isBuyVisible, setIsBuyVisible] = useState(false);
	const [isSellVisible, setIsSellVisible] = useState(false);
	const [companyDescription, setCompanyDescription] = useState({});
	// const [loading, setLoading] = useState(false);

	const fetchStockInfo = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/stock/quote/${stock.ticker}`
			);
			const data = await response.data;
			setStockInfo(data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCompanyDescription = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/stock/company/${stock.ticker}`
		);
		const data = await response.data;

		setCompanyDescription(data);
	};

	const handleBuy = async () => {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/buy`,
			{
				ticker: stock.ticker,
				name: companyDescription.name,
				quantity: quantity,
				totalCost: (parseInt(quantity) * parseFloat(stockInfo.c)).toFixed(2),
			}
		);
		await response.data;
		setIsBuyVisible(false);
		setIsAlertVisible(true);
		setAlertContent(stock.ticker + " bought successfully");
		setAlertVariant("info");
	};

	const handleSell = async () => {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/sell`,
			{
				ticker: stock.ticker,
				quantity: quantity,
				cost: (parseInt(quantity) * parseFloat(stockInfo.c)).toFixed(2),
			}
		);
		await response.data;
		setIsSellVisible(false);
		setIsAlertVisible(true);
		setAlertContent(stock.ticker + " sold successfully");
		setAlertVariant("danger");
	};

	useEffect(() => {
		// setLoading(true);
		fetchStockInfo();
		fetchCompanyDescription();
		// setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	const costPerShare = (stock.totalCost / stock.quantity).toFixed(2);
	const change = costPerShare - stockInfo.c;
	const marketValue = stockInfo.c * stock.quantity;

	return (
		<Card className="my-4">
			<BuyModal
				show={isBuyVisible}
				handleClose={() => setIsBuyVisible(false)}
				quantity={quantity}
				setQuantity={setQuantity}
				ticker={stock.ticker}
				currentPrice={stockInfo.c}
				balance={money}
				onClickHandler={handleBuy}
				btnText={"Buy"}
			/>
			<BuyModal
				show={isSellVisible}
				handleClose={() => setIsSellVisible(false)}
				quantity={quantity}
				setQuantity={setQuantity}
				ticker={stock.ticker}
				currentPrice={stockInfo.c}
				balance={money}
				onClickHandler={handleSell}
				btnText={"Sell"}
			/>
			<Card.Header>
				<span className="fs-3 fw-medium">{stock.ticker}</span>
				{"  "}
				<span className="fs-6 text-secondary">{stock.name}</span>
			</Card.Header>
			<Card.Body className="fw-medium">
				<Row>
					<Col>Quantity:</Col>
					<Col>{stock.quantity}</Col>
					<Col>Change:</Col>
					<Col className={change > 0 ? "text-success" : "text-danger"}>
						{change > 0 ? (
							<i className="bi bi-caret-up-fill"></i>
						) : (
							<i className="bi bi-caret-down-fill"></i>
						)}
						{change}
					</Col>
				</Row>
				<Row>
					<Col>Avg. Cost / Share:</Col>
					<Col>{costPerShare}</Col>
					<Col>Current Price:</Col>
					<Col className={change > 0 ? "text-success" : "text-danger"}>
						{stockInfo.c}
					</Col>
				</Row>
				<Row>
					<Col>Total Cost:</Col>
					<Col>{stock.totalCost}</Col>
					<Col>Market Value:</Col>
					<Col className={change > 0 ? "text-success" : "text-danger"}>
						{marketValue}
					</Col>
				</Row>
			</Card.Body>
			<Card.Footer className="text-muted">
				<Button
					variant="primary"
					className="mr-2"
					onClick={() => setIsBuyVisible(true)}
				>
					Buy
				</Button>
				<Button variant="danger" onClick={() => setIsSellVisible(true)}>
					Sell
				</Button>
			</Card.Footer>
		</Card>
	);
};

export default StockInfoListItem;
