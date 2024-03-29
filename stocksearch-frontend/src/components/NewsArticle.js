import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

import NewsModal from "./NewsModal";

const NewsArticle = ({ article }) => {
	const [isOpen, setIsOpen] = useState(false);

	const showModal = () => {
		setIsOpen(true);
	};

	return (
		<>
			<NewsModal
				show={isOpen}
				handleClose={() => setIsOpen(false)}
				article={article}
			/>
			<Card
				className="h-100 my-auto"
				onClick={() => showModal(article)}
				style={{ cursor: "pointer" }}
			>
				<Row
					className="justify-content-space-around align-items-stretch align-content-center"
					style={{ height: "100px" }}
				>
					<Col xl={3} className="">
						<div className="overflow-hidden rounded d-flex justify-content-center">
							<Image
								fluid
								src={article.image}
								className="object-fit-contain rounded"
							/>
						</div>
					</Col>
					<Col>
						<Card.Body>
							<Card.Title className="fs-6">{article.headline}</Card.Title>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default NewsArticle;
