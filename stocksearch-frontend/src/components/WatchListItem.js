import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const WatchListItem = ({ ticker, loading, setLoading, setWatchlist }) => {
	const [stockInfo, setStockInfo] = useState({});
	const [companyInfo, setCompanyInfo] = useState({});
	// const [loading, setLoading] = useState(true);

	const fetchStockInfo = async () => {
		try {
			const response = await axios.get(`/stock/quote/${ticker}`);
			const data = await response.data;
			setStockInfo(data);
			console.log("stock", data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCompanyDescription = async () => {
		const response = await axios.get(`/stock/company/${ticker}`);
		const data = await response.data;

		setCompanyInfo(data);
		console.log("company description", data);
	};

	const handleRemoveItem = async () => {
		try {
			console.log(ticker);
			const response = await axios.delete(`/watchlist`, {
				data: {
					ticker: ticker,
				},
			});
			const data = await response.data;
			setWatchlist(data["watchList"]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// setLoading(true);
		fetchStockInfo();
		fetchCompanyDescription();
		setLoading(false);
	}, [ticker]);

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<Container className="my-4 border p-4">
			{stockInfo && (
				<>
					<Row>
						<i className="bi bi-x" onClick={handleRemoveItem}></i>
					</Row>
					<Row>
						<Col>
							<h2>{ticker}</h2>
						</Col>
						<Col>
							<h2>{stockInfo.c}</h2>
						</Col>
					</Row>
					<Row>
						<Col>
							<h6>{companyInfo.name}</h6>
						</Col>
						<Col>
							<h6>
								{stockInfo?.dp > 0 ? (
									<i className="bi bi-caret-up-fill"></i>
								) : (
									<i className="bi bi-caret-down-fill"></i>
								)}
								{stockInfo?.d?.toFixed(2)} ({stockInfo?.dp?.toFixed(2)} %)
							</h6>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default WatchListItem;
