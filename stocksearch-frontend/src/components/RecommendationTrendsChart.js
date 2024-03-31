import { useState, useEffect } from "react";

import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { useTickerContext } from "../context/TickerContext";

const RecommendationTrendsChart = ({ ticker }) => {
	const [chartOptions, setChartOptions] = useState(null);
	const { currentTickerData } = useTickerContext();

	const updateOptions = ([categories, finalData]) => {
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
		updateOptions(currentTickerData.recommendationChartData);
	}, [currentTickerData.recommendationChartData]);

	return (
		<>
			{chartOptions ? (
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
