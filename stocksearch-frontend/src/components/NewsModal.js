import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsModal = ({ show, handleClose, article }) => {
	const handleTweet = () => {
		const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			article.headline
		)}&url=${encodeURIComponent(article.url)}`;
		window.open(twitterIntentUrl, "_blank");
	};
	const handlePost = () => {
		const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			article.url
		)}`;
		window.open(facebookShareUrl, "_blank");
	};

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton onHide={handleClose}>
				<Modal.Title>{article.source}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5>{article.headline}</h5>
				<h6>{article.summary}</h6>
				<p>
					For more info click <Link to={article.url}>here</Link>
				</p>
			</Modal.Body>
			<Modal.Footer className="">
				Share
				<div>
					<Button variant="secondary" onClick={handleTweet} className="me-2">
						<i className="bi bi-twitter-x"></i>
					</Button>
					<Button variant="primary" onClick={handlePost}>
						<i className="bi bi-facebook"></i>
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default NewsModal;
