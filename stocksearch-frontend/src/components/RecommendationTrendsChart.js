import { useState, useEffect } from "react";

import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import axios from "axios";

const RecommendationTrendsChart = ({ ticker }) => {
	const [recommendationTrends, setRecommendationTrends] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [chartOptions, setChartOptions] = useState(null);

	const fetchColumnChartData = async () => {
		const response = await axios.get(`/stock/recommendation-trends/${ticker}`);
		const data = await response.data;

		// Extract all keys present in the input data
		const allKeys = Array.from(
			new Set(data.flatMap((item) => Object.keys(item)))
		);

		// Initialize an object to store values for each key
		const valuesByKeys = {};

		// Iterate over each key
		allKeys.forEach((key) => {
			// Initialize an array for the values corresponding to the key
			valuesByKeys[key] = [];

			// Push the values corresponding to the key from each object into the array
			data.forEach((item) => {
				valuesByKeys[key].push(item[key]);
			});
		});

		console.log(valuesByKeys);

		let finalData = [];
		let categories = [];
		Object.entries(valuesByKeys).forEach(([key, value]) => {
			if (key !== "period" && key !== "symbol") {
				finalData.push({
					name: key,
					data: Array.from(value),
				});
			}
			if (key === "period") {
				categories = Array.from(value);
			}
		});
		console.log(finalData);
		updateOptions(categories, finalData);
		setRecommendationTrends(data);
		setCategories(categories);
	};

	const updateOptions = (categories, finalData) => {
		const options = {
			chart: {
				type: "column",
			},
			title: {
				text: "Recommendations Trends",
			},
			xAxis: {
				categories: categories,
			},
			yAxis: {
				min: 0,
				title: {
					text: "#Analysis",
				},
				stackLabels: {
					enabled: true,
				},
				opposite: false,
			},
			tooltip: {
				headerFormat: "<b>{point.x}</b><br/>",
				pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
			},
			plotOptions: {
				column: {
					stacking: "normal",
					dataLabels: {
						enabled: true,
					},
				},
			},
			series: finalData,
			rangeSelector: {
				enabled: false,
			},
			navigator: {
				enabled: false,
			},
			scrollbar: {
				enabled: false,
			},
			legend: {
				enabled: true,
			},
		};
		console.log(options);
		setChartOptions(options);
	};

	useEffect(() => {
		setLoading(true);
		fetchColumnChartData();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<>
			{loading ? (
				<h1>Loading</h1>
			) : chartOptions ? (
				<HighchartsReact
					highcharts={HighCharts}
					constructorType={"stockChart"}
					options={chartOptions}
				>
					RecommendationTrendsChart
				</HighchartsReact>
			) : (
				<div>Failed to fetch data</div>
			)}
		</>
	);
};

export default RecommendationTrendsChart;
