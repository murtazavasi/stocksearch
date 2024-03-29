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

	// if (loading) {
	// 	return <h1>Loading</h1>;
	// }
	console.log(stockList);

	return (
		<>
			{isAlertVisible && (
				<CustomAlert content={alertContent} variant={alertVariant} />
			)}
			{!loading && <h4>Money in Wallet: ${money?.toFixed(2)}</h4>}
			{!loading &&
				stockList &&
				stockList.length > 0 &&
				stockList.map((stock, idx) => (
					<StockInfoListItem
						key={idx}
						stock={stock}
						money={money}
						loading={loading}
						setLoading={setLoading}
						setIsAlertVisible={setIsAlertVisible}
						setAlertContent={setAlertContent}
						setAlertVariant={setAlertVariant}
						setUserInfo={setUserInfo}
						setStockList={setStockList}
					/>
				))}
		</>
	);
};

export default StockInfoList;
