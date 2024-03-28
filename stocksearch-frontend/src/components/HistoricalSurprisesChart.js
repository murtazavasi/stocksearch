import { useState, useEffect } from "react";
import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const HistoricalSurprisesChart = ({ ticker }) => {
	const [seriesData, setSeriesData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [chartOptions, setChartOptions] = useState(null);

	const fetchColumnChartData = async () => {
		const response = await axios.get(`/stock/earnings/${ticker}`);
		const data = await response.data;

		let series1_data = [];
		let series2_data = [];

		data.map((item) => {
			const date = new Date(item.period);
			const timestamp = date.getTime();

			series1_data.push([timestamp, item.estimate]);
			series2_data.push([timestamp, item.surprisePercent]);
		});

		updateOptions([
			{
				name: "Series 1",
				data: series1_data,
				marker: {
					enabled: true,
					radius: 4,
				},
			},
			{
				name: "Series 2",
				data: series2_data,
				marker: {
					enabled: true,
					radius: 4,
				},
			},
		]);
	};

	useEffect(() => {
		setLoading(true);
		fetchColumnChartData();
		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}

	const updateOptions = (seriesData) => {
		const options = {
			chart: {
				type: "spline",
			},
			yAxis: {
				opposite: false,
			},
			xAxis: {
				type: "datetime",
				labels: {
					format: "{value:%Y-%m-%d}",
				},
				showLastLabel: true,
			},
			plotOptions: {
				spline: {
					marker: {
						enable: false,
					},
				},
			},
			series: seriesData,
			title: {
				text: "Historical EPS Surprises",
			},
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

export default HistoricalSurprisesChart;
