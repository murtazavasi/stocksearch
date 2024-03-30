import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import StockSummary from "./StockSummary";
import CompanyDescription from "./CompanyDescription";
import WorkingDayChart from "./WorkingDayChart";

const Summary = ({
	ticker,
	companyDescription,
	stockQuote,
	hourlyChartData,
	peers,
}) => {
	useEffect(() => {}, [ticker]);

	return (
		<Container>
			<Row>
				<Col>
					<Row>
						<StockSummary ticker={ticker} stockQuote={stockQuote} />
					</Row>
					<Row>
						<CompanyDescription
							ticker={ticker}
							companyData={companyDescription}
							peers={peers}
						/>
					</Row>
				</Col>
				<Col>
					<WorkingDayChart ticker={ticker} hourlyChartData={hourlyChartData} />
				</Col>
			</Row>
		</Container>
	);
};

export default Summary;
