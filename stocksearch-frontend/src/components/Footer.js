import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer
			style={{
				backgroundColor: "#dddddd",
				position: "sticky",
				bottom: 0,
				left: 0,
			}}
		>
			<p className="text-center fw-medium py-1" style={{ margin: 0 }}>
				Powered by{" "}
				<Link to="https://finnhub.io" target="_blank" rel="noopener noreferrer">
					Finnhub.io
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
