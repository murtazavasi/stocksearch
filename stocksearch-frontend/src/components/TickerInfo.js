import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Summary from "./Summary.js";
import TopNews from "./TopNews";
import Charts from "./Charts.js";
import Insights from "./Insights";

const TickerInfo = ({ ticker }) => {
	const [key, setKey] = useState("summary");
	return (
		<Tabs
			id="controlled-tab-example"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="mb-3 my-tabs"
			style={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<Tab eventKey="summary" title="Summary" className="w-100 flex-grow-1">
				<Summary ticker={ticker} />
			</Tab>
			<Tab eventKey="top-news" title="Top News" className="w-100 flex-grow-1">
				<TopNews ticker={ticker} />
			</Tab>
			<Tab eventKey="charts" title="Charts" className="w-100 flex-grow-1">
				<Charts ticker={ticker} />
			</Tab>
			<Tab eventKey="insights" title="Insights" className="w-100 flex-grow-1">
				<Insights ticker={ticker} />
			</Tab>
		</Tabs>
	);
};

export default TickerInfo;
