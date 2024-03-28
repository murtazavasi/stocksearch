import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import WatchList from "../components/WatchList";

const WatchListPage = () => {
	const [watchlist, setWatchlist] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchWatchlist = async () => {
		try {
			const response = await axios.get(`/watchlist`);
			const data = await response.data;

			setWatchlist(data["watchList"]);
			console.log(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchWatchlist();
		// setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	console.log(watchlist);

	return (
		<Container className="mt-4">
			<h2>My WatchList</h2>
			{watchlist && (
				<WatchList
					watchlist={watchlist}
					loading={loading}
					setLoading={setLoading}
					setWatchlist={setWatchlist}
				/>
			)}
		</Container>
	);
};

export default WatchListPage;
