import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import NewsArticle from "./NewsArticle";
import { useTickerContext } from "../context/TickerContext";

const TopNews = ({ ticker }) => {
	useEffect(() => {}, [ticker]);

	const { currentTickerData } = useTickerContext();

	return (
		<Container>
			<Row className="g-4">
				{currentTickerData.topNews.map((item, idx) => {
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
