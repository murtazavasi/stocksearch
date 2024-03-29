import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<Container className="text-center py-4">
			<Spinner variant="primary" />
		</Container>
	);
};

export default Loader;
