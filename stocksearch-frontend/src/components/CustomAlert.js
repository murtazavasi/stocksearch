import { Alert } from "react-bootstrap";

const CustomAlert = ({ variant, content }) => {
	return (
		<Alert variant={variant} className="text-center mt-4">
			{content}
		</Alert>
	);
};

export default CustomAlert;
