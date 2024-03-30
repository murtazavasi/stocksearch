import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Summary from "./Summary.js";
import TopNews from "./TopNews";
import Charts from "./Charts.js";
import Insights from "./Insights";

const TickerInfo = ({
	ticker,
	companyDescription,
	stockQuote,
	user,
	hourlyChartData,
	peers,
	news,
	chartData,
}) => {
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
					hourlyChartData={hourlyChartData}
					peers={peers}
				/>
			</Tab>
			<Tab eventKey="top-news" title="Top News" className="">
				<TopNews ticker={ticker} news={news} />
			</Tab>
			<Tab eventKey="charts" title="Charts" className="">
				<Charts ticker={ticker} chartData={chartData} />
			</Tab>
			<Tab eventKey="insights" title="Insights" className="">
				<Insights ticker={ticker} />
			</Tab>
		</Tabs>
	);
};

export default TickerInfo;
