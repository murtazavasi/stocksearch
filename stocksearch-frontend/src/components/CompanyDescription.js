import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const CompanyDescription = ({ companyData, ticker }) => {
	const [peers, setPeers] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchPeerData = async () => {
		const response = await axios.get(`/stock/peers/${ticker}`);
		const data = await response.data;
		setPeers(data);
	};

	useEffect(() => {
		setLoading(true);
		fetchPeerData();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading Company Description</h1>;
	}

	return (
		<Container fluid className="text-center">
			<h4 className="text-decoration-underline fs-4">About the Company</h4>
			<p className="mb-2 fs-6">IPO Start Date: {companyData.ipo}</p>
			<p className="mb-2 fs-6">Industry: {companyData.finnhubIndustry}</p>
			<p className="mb-2 fs-6">
				Webpage:{" "}
				<Link to={companyData.weburl} target="_blank">
					{companyData.weburl}
				</Link>
			</p>
			<p className="mb-2 fs-6">
				Company Peers:
				{peers.map((peer) => (
					<Link to={`/search/${peer}`}>{peer}</Link>
				))}
				{/* {peers.join(" ")} */}
			</p>
		</Container>
	);
};

export default CompanyDescription;
