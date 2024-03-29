import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

import NewsArticle from "./NewsArticle";

const TopNews = ({ ticker }) => {
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchTopNews = async () => {
		const response = await axios.get(`/stock/news/${ticker}`);
		const data = await response.data;
		setNews(data);
	};

	useEffect(() => {
		setLoading(true);
		fetchTopNews();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

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
