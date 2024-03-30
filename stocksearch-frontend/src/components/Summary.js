import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import StockSummary from "./StockSummary";
import CompanyDescription from "./CompanyDescription";
import WorkingDayChart from "./WorkingDayChart";

const Summary = ({ ticker, companyDescription, stockQuote }) => {
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
						/>
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
