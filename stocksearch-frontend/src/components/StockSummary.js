import { Container } from "react-bootstrap";
import { useTickerContext } from "../context/TickerContext";

const StockSummary = () => {
	const { currentTickerData } = useTickerContext();
	return (
		<Container fluid className="text-center my-4">
			<p className="mb-0">
				<b>High Price:</b> {currentTickerData.stockInfo.h}
			</p>
			<p className="mb-0">
				<b>Low Price:</b> {currentTickerData.stockInfo.l}
			</p>
			<p className="mb-0">
				<b>Open Price: </b> {currentTickerData.stockInfo.o}
			</p>
			<p className="mb-0">
				<b>Prev Close:</b> {currentTickerData.stockInfo.pc}
			</p>
		</Container>
	);
};

export default StockSummary;
