import { useState } from "react";

import StockInfoListItem from "./StockInfoListItem";
import CustomAlert from "./CustomAlert";

const StockInfoList = ({ user, loading, setLoading, setUserInfo }) => {
	const { stocksBought, money } = user;

	const [balance, setBalance] = useState(user.money || 0);
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [alertVariant, setAlertVariant] = useState("info");
	const [stockList, setStockList] = useState(user.stocksBought || []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<>
			{isAlertVisible && (
				<CustomAlert content={alertContent} variant={alertVariant} />
			)}
			<h2>My Portfolio</h2>
			<h4>Money in Wallet: ${money?.toFixed(2)}</h4>
			{stockList.map((stock) => (
				<StockInfoListItem
					stock={stock}
					money={money}
					loading={loading}
					setLoading={setLoading}
					setIsAlertVisible={setIsAlertVisible}
					setAlertContent={setAlertContent}
					setAlertVariant={setAlertVariant}
					setUserInfo={setUserInfo}
				/>
			))}
			{/* {stockList.forEach((stock) => (
				<StockInfoListItem stock={stock} money={balance} />
			))} */}
		</>
	);
};

export default StockInfoList;
