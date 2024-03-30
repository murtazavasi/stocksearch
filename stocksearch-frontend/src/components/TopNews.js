import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import NewsArticle from "./NewsArticle";

const TopNews = ({ ticker, news }) => {
	useEffect(() => {}, [ticker]);

	return (
		<Container>
			<Row className="g-4">
				{news.map((item, idx) => {
					return (
						<Col xl={6} key={idx}>
							<NewsArticle article={item} />
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default TopNews;
