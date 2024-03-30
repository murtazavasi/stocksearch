import { Container } from "react-bootstrap";

const StockSummary = ({ stockQuote }) => {
	return (
		<Container fluid className="text-center my-4">
			<p className="mb-0">
				<b>High Price:</b> {stockQuote.h}
			</p>
			<p className="mb-0">
				<b>Low Price:</b> {stockQuote.l}
			</p>
			<p className="mb-0">
				<b>Open Price: </b> {stockQuote.o}
			</p>
			<p className="mb-0">
				<b>Prev Close:</b> {stockQuote.pc}
			</p>
		</Container>
	);
};

export default StockSummary;
