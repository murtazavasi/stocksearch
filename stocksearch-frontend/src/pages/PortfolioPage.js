import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import axios from "axios";

import StockInfoList from "../components/StockInfoList";

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
		// const temp = async () => {
		// 	await fetchUserInfo();
		// };
		// temp();
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}
	return (
		<Container className="mt-4">
			{Object.keys("stocksBought") && (
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
