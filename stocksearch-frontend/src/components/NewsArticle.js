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
				className="h-100 my-auto p-2"
				onClick={() => showModal(article)}
				style={{ cursor: "pointer" }}
			>
				<Row
					className="justify-content-space-around align-items-stretch align-content-center"
					// style={{ height: "100px" }}
				>
					<Col xl={3} className="mx-auto my-auto">
						<div className="rounded w-100">
							<Image
								fluid
								src={article.image}
								className="object-fit-cover rounded mw-100 mh-100"
							/>
						</div>
					</Col>
					<Col className="my-auto">
						<Card.Body>
							<Card.Title
								className="text-center"
								style={{ fontSize: "0.75rem" }}
							>
								{article.headline}
							</Card.Title>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default NewsArticle;
