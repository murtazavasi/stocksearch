import { Modal, Button, Form } from "react-bootstrap";
import { useTickerContext } from "../context/TickerContext";

const BuyModal = ({
	show,
	handleClose,
	balance,
	quantity,
	setQuantity,
	onClickHandler,
	btnText,
}) => {
	const { currentTickerSymbol: ticker, currentTickerData } = useTickerContext();
	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>{ticker}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Current Price: {currentTickerData.stockInfo.c} </p>
				<p>Money in the wallet: {balance?.toFixed(2)}</p>
				<Form.Label htmlFor="quantity">Quantity</Form.Label>
				<Form.Control
					type="number"
					id="quantity"
					value={quantity}
					onChange={(e) => setQuantity(parseInt(e.target.value))}
				/>
			</Modal.Body>
			<Modal.Footer className="justify-content-between">
				<p>Total: {(currentTickerData.stockInfo.c * quantity).toFixed(2)}</p>
				<Button
					variant={btnText === "Buy" ? "success" : "danger"}
					onClick={onClickHandler}
					disabled={quantity <= 0}
				>
					{btnText}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default BuyModal;
