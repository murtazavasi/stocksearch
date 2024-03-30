import { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";

import axios from "axios";

import RecommendationTrendsChart from "./RecommendationTrendsChart";
import HistoricalSurprisesChart from "./HistoricalSurprisesChart";

const Insights = ({ ticker }) => {
	const [insights, setInsights] = useState({});
	const [loading, setLoading] = useState(false);

	let [totalMSPR, setTotalMSPR] = useState(0);
	let [positiveMSPR, setPositiveMSPR] = useState(0);
	let [negativeMSPR, setNegativeMSPR] = useState(0);
	let [totalChange, setTotalChange] = useState(0);
	let [negativeChange, setNegativeChange] = useState(0);
	let [positiveChange, setPositiveChange] = useState(0);

	const fetchInsights = async () => {
		try {
			const response = await axios.get(`/stock/insider-sentiment/${ticker}`);
			const data = await response.data;
			setInsights(data);

			let tempTotalMSPR = 0;
			let tempPositiveMSPR = 0;
			let tempNegativeMSPR = 0;
			let tempTotalChange = 0;
			let tempNegativeChange = 0;
			let tempPositiveChange = 0;

			data.data.forEach((item) => {
				tempTotalMSPR += item["mspr"];
				tempTotalChange += item["change"];

				if (item["mspr"] > 0) {
					tempPositiveMSPR += item["mspr"];
				} else {
					tempNegativeMSPR += item["mspr"];
				}

				if (item["change"] > 0) {
					tempPositiveChange += item["change"];
				} else {
					tempNegativeChange += item["change"];
				}
			});

			setTotalMSPR(tempTotalMSPR.toFixed(2));
			setTotalChange(tempTotalChange.toFixed(2));
			setPositiveChange(tempPositiveChange.toFixed(2));
			setPositiveMSPR(tempPositiveMSPR.toFixed(2));
			setNegativeChange(tempNegativeChange.toFixed(2));
			setNegativeMSPR(tempNegativeMSPR.toFixed(2));
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchInsights();
		setLoading(false);
	}, [ticker]);

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<>
			<Row>
				<h4 className="text-center">Insider Sentiments</h4>
				<Table borderless hover className="w-50 mx-auto text-center">
					<thead>
						<tr>
							<th>{ticker}</th>
							<th>MSPR</th>
							<th>Change</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Total</td>
							<td>{totalMSPR}</td>
							<td>{totalChange}</td>
						</tr>
						<tr>
							<td>Positive</td>
							<td>{positiveMSPR}</td>
							<td>{positiveChange}</td>
						</tr>
						<tr>
							<td>Negative</td>
							<td>{negativeMSPR}</td>
							<td>{negativeChange}</td>
						</tr>
					</tbody>
				</Table>
			</Row>
			<Row>
				<Col>
					<RecommendationTrendsChart ticker={ticker} />
				</Col>
				<Col>
					<HistoricalSurprisesChart ticker={ticker} />
				</Col>
			</Row>
		</>
	);
};

export default Insights;
