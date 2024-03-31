import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import StockSummary from "./StockSummary";
import CompanyDescription from "./CompanyDescription";
import WorkingDayChart from "./WorkingDayChart";

const Summary = ({ ticker }) => {
	useEffect(() => {}, [ticker]);

	return (
		<Container>
			<Row>
				<Col>
					<Row>
						<StockSummary />
					</Row>
					<Row>
						<CompanyDescription />
					</Row>
				</Col>
				<Col>
					<WorkingDayChart />
				</Col>
			</Row>
		</Container>
	);
};

export default Summary;
