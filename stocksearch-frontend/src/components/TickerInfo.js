import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Summary from "./Summary.js";
import TopNews from "./TopNews";
import Charts from "./Charts.js";
import Insights from "./Insights";

const TickerInfo = ({ ticker, companyDescription, stockQuote, user }) => {
	const [key, setKey] = useState("summary");
	return (
		<Tabs
			id="controlled-tab-example"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="mb-3 my-tabs"
			fill
			variant="underline"
		>
			<Tab eventKey="summary" title="Summary" className="">
				<Summary
					ticker={ticker}
					stockQuote={stockQuote}
					companyDescription={companyDescription}
				/>
			</Tab>
			<Tab eventKey="top-news" title="Top News" className="">
				<TopNews ticker={ticker} />
			</Tab>
			<Tab eventKey="charts" title="Charts" className="">
				<Charts ticker={ticker} />
			</Tab>
			<Tab eventKey="insights" title="Insights" className="">
				<Insights ticker={ticker} />
			</Tab>
		</Tabs>
	);
};

export default TickerInfo;
