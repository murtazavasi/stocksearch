import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

import StockSummary from "./StockSummary";
import CompanyDescription from "./CompanyDescription";
import WorkingDayChart from "./WorkingDayChart";

const Summary = ({ ticker }) => {
	const [companyInfo, setCompanyInfo] = useState({});

	const fetchData = async () => {
		try {
			const response = await axios.get(`/stock/company/${ticker}`);
			const data = await response.data;
			setCompanyInfo(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [ticker]);

	return (
		<Container>
			<Row>
				<Col>
					<Row>
						<StockSummary ticker={ticker} />
					</Row>
					<Row>
						<CompanyDescription ticker={ticker} companyData={companyInfo} />
					</Row>
				</Col>
				<Col>
					<WorkingDayChart ticker={ticker} />
				</Col>
			</Row>
		</Container>
	);
};

export default Summary;
