import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTickerContext } from "../context/TickerContext";

const CompanyDescription = () => {
	// useEffect(() => {}, [ticker]);

	const { currentTickerData } = useTickerContext();

	return (
		<Container fluid className="text-center">
			<h4 className="text-decoration-underline fs-4">About the Company</h4>
			<p className="mb-2 fs-6">
				IPO Start Date: {currentTickerData.companyDescription.ipo}
			</p>
			<p className="mb-2 fs-6">
				Industry: {currentTickerData.companyDescription.finnhubIndustry}
			</p>
			<p className="mb-2 fs-6">
				Webpage:{" "}
				<Link to={currentTickerData.companyDescription.weburl} target="_blank">
					{currentTickerData.companyDescription.weburl}
				</Link>
			</p>
			<p className="mb-2 fs-6">
				Company Peers:
				{currentTickerData.peers.map((peer) => (
					<Link to={`/search/${peer}`} key={peer}>
						{peer}
					</Link>
				))}
				{/* {peers.join(" ")} */}
			</p>
		</Container>
	);
};

export default CompanyDescription;
