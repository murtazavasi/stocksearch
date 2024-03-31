import { Modal, Button, Form } from "react-bootstrap";

const BuyModal = ({
	show,
	handleClose,
	ticker,
	currentPrice,
	balance,
	quantity,
	setQuantity,
	onClickHandler,
	btnText,
}) => {
	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>{ticker}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Current Price: {currentPrice} </p>
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
				<p>Total: {(currentPrice * quantity).toFixed(2)}</p>
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
