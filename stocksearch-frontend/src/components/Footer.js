import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer
			style={{
				backgroundColor: "#dddddd",
				position: "fixed",
				padding: "10px 0",
				bottom: 0,
				width: "100%",
				textAlign: "center",
			}}
		>
			<p className="fw-medium" style={{ margin: 0 }}>
				Powered by{" "}
				<Link to="https://finnhub.io" target="_blank" rel="noopener noreferrer">
					Finnhub.io
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
