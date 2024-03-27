import { Container } from "react-bootstrap";

import WatchListItem from "./WatchListItem";
import CustomAlert from "./CustomAlert";

const WatchList = ({ watchlist, loading, setLoading, setWatchlist }) => {
	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<Container>
			{watchlist.length === 0 ? (
				<CustomAlert variant={"warning"} content={"The Watch list is empty"} />
			) : (
				watchlist.map((item, idx) => (
					<WatchListItem
						key={idx}
						ticker={item}
						loading={loading}
						setLoading={setLoading}
						setWatchlist={setWatchlist}
					/>
				))
			)}
		</Container>
	);
};

export default WatchList;
