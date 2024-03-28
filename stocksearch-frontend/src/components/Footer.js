import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<p>
				Powered by{" "}
				<Link to="https://finnhub.io" target="_blank" rel="noopener noreferrer">
					Finnhub.io
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
