import { useState, useEffect } from "react";

import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import axios from "axios";

const RecommendationTrendsChart = ({ ticker }) => {
	const [recommendationTrends, setRecommendationTrends] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchColumnChartData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/stock/recommendation-trends/${ticker}`
		);
		const data = await response.data;

		let buy = [];
		let sell = [];
		let hold = [];
		let strongBuy = [];
		let strongSell = [];

		for (let item in data) {
			buy.push(item["buy"]);
			sell.push(item["sell"]);
			hold.push(item["hold"]);
			strongBuy.push(item["strongBuy"]);
			strongSell.push(item["strongSell"]);
		}

		const categoriesResult = data.map((item) => [item["period"]]);
		const recommendationTrendsResult = [
			{ data: buy },
			{ data: sell },
			{ data: hold },
			{ data: strongBuy },
			{ data: strongSell },
		];
		setRecommendationTrends(recommendationTrendsResult);
		setCategories(categoriesResult);
	};

	useEffect(() => {
		setLoading(true);
		fetchColumnChartData();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	const options = {
		xAxis: {
			categories: categories,
		},
		plotOptions: {
			column: {
				stacking: "normal",
				dataLabels: {
					enabled: true,
				},
			},
		},
		series: recommendationTrends,
	};
	return (
		<HighchartsReact
			highcharts={HighCharts}
			constructorType={"stockChart"}
			options={options}
		>
			RecommendationTrendsChart
		</HighchartsReact>
	);
};

export default RecommendationTrendsChart;
