import React, { useEffect, useState } from "react";

import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import axios from "axios";

const WorkingDayChart = ({ ticker }) => {
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchChartData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/stock/charts/hourly-validation/${ticker}`
		);
		const data = await response.data;
		const temp = data.results.map((item) => [item["t"], item["c"]]);
		setChartData(temp);
	};

	useEffect(() => {
		setLoading(true);
		fetchChartData();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading Chart Data</h1>;
	}

	const options = {
		title: {
			text: ticker + " Hourly Price Variation",
		},
		navigator: {
			enabled: false,
		},
		navigation: {
			buttonOptions: {
				enabled: false,
			},
		},
		xAxis: [
			{
				type: "datetime",
				dateTimeLabelFormats: {
					hour: "%I %p",
					minute: "%I:%M %p",
				},
			},
		],
		rangeSelector: {
			allButtonsEnabled: false,
			inputEnabled: false,
			selected: 0,
			enabled: false,
			buttons: [
				{
					type: "hour",
					count: 6,
					text: "6h",
					title: "View 6 hours",
				},
			],
		},
		series: [
			{
				type: "spline",
				data: chartData,
			},
		],
	};

	return (
		<>
			{chartData.length > 0 ? (
				<HighchartsReact
					highcharts={HighCharts}
					constructorType={"stockChart"}
					options={options}
				></HighchartsReact>
			) : (
				<h1>Loading</h1>
			)}
		</>
	);
};

export default WorkingDayChart;
