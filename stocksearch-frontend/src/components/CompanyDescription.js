import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

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
			<h4 className="text-decoration-underline">About the Company</h4>
			<p>IPO Start Date: {companyData.ipo}</p>
			<p>Industry: {companyData.finnhubIndustry}</p>
			<p>Webpage: {companyData.weburl}</p>
			<p>Company Peers: {peers.join(" ")}</p>
		</Container>
	);
};

export default CompanyDescription;
