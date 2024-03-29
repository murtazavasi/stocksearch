import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import StockInfoList from "../components/StockInfoList";
import Loader from "../components/utils/Loader";

const PortfolioPage = () => {
	const [userInfo, setUserInfo] = useState({});
	const [loading, setLoading] = useState(false);

	const fetchUserInfo = async () => {
		try {
			console.log(process.env.REACT_APP_BACKEND_URL);
			const response = await axios.get("/user");
			const user = await response.data;
			setUserInfo(user);
			console.log(user);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchUserInfo();
	}, []);

	return (
		<Container className="mt-4">
			<h2>My Portfolio</h2>
			{loading && <Loader />}
			{userInfo.stocksBought && (
				<StockInfoList
					user={userInfo}
					loading={loading}
					setLoading={setLoading}
					setUserInfo={setUserInfo}
				/>
			)}
		</Container>
	);
};

export default PortfolioPage;
