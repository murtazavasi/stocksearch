import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

import NewsModal from "./NewsModal";

const NewsArticle = ({ article }) => {
	const [isOpen, setIsOpen] = useState(false);

	const showModal = (article) => {
		console.log("Hello");
		setIsOpen(true);
	};

	return (
		<Card onClick={() => showModal(article)}>
			<NewsModal
				show={isOpen}
				handleClose={() => setIsOpen(false)}
				article={article}
			/>
			<Row className="justify-content-center">
				<Col xl={3}>
					<Image src={article.image} className="object-fit-cover w-100" />
				</Col>
				<Col>
					<Card.Body>
						<Card.Title>{article.headline}</Card.Title>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
};

export default NewsArticle;
