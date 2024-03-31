import { useState, useEffect } from "react";
import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useTickerContext } from "../context/TickerContext";

const HistoricalSurprisesChart = ({ ticker }) => {
	const [chartOptions, setChartOptions] = useState(null);
	const { currentTickerData } = useTickerContext();

	useEffect(() => {
		updateOptions(currentTickerData.historicalChartData);
	}, [currentTickerData.historicalChartData]);

	const updateOptions = ([series1_data, series2_data]) => {
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
			series: [
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
			],
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

export default HistoricalSurprisesChart;
