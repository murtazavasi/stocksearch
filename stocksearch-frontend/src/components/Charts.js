import React, { useState, useEffect } from "react";
import axios from "axios";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Indicators from "highcharts/indicators/indicators";
import VBP from "highcharts/indicators/volume-by-price";

// Initialize the indicators
Indicators(Highcharts);
VBP(Highcharts);

const Chart = ({ ticker }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [chartData, setChartData] = useState(null);
	const [chartOptions, setChartOptions] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(`/stock/charts/${ticker}`);
			const data = await response.data;

			setChartData(data);
			updateOptions(data);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setIsLoading(false);
		}
	};

	const updateOptions = (data) => {
		const groupingUnits = [
			[
				"week", // unit name
				[1], // allowed multiples
			],
			["month", [1, 2, 3, 4, 6]],
		];
		let volume = data.results.map((item) => [item["t"], item["v"]]);
		let ohlc = data.results.map((item) => [
			item["t"],
			item["o"],
			item["h"],
			item["l"],
			item["c"],
		]);

		console.log(volume);
		console.log(ohlc);
		const options = {
			title: {
				text: "AAPL Historical",
			},

			subtitle: {
				text: "With SMA and Volume by Price technical indicators",
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
			yAxis: [
				{
					startOnTick: false,
					endOnTick: false,
					labels: {
						align: "right",
						x: -3,
					},
					title: {
						text: "OHLC",
					},
					height: "60%",
					lineWidth: 2,
					resize: {
						enabled: true,
					},
				},
				{
					labels: {
						align: "right",
						x: -3,
					},
					title: {
						text: "Volume",
					},
					top: "65%",
					height: "35%",
					offset: 0,
					lineWidth: 2,
				},
			],

			tooltip: {
				split: true,
			},
			series: [
				{
					type: "candlestick",
					name: "AAPL",
					id: "aapl",
					zIndex: 2,
					data: ohlc,
					dataGrouping: {
						units: groupingUnits,
					},
				},
				{
					type: "column",
					name: "Volume",
					id: "volume",
					data: volume,
					yAxis: 1,
				},
				{
					type: "vbp",
					linkedTo: "aapl",
					params: {
						volumeSeriesID: "volume",
					},
					dataLabels: {
						enabled: false,
					},
					zoneLines: {
						enabled: false,
					},
				},
				{
					type: "sma",
					linkedTo: "aapl",
					zIndex: 1,
					marker: {
						enabled: false,
					},
				},
			],
		};
		console.log("chartOptions", options);
		setChartOptions(options); // Set updated options state
	};

	return (
		<div>
			{isLoading ? (
				<div>Loading...</div>
			) : chartOptions ? ( // Check if chartOptions is not null
				<HighchartsReact highcharts={Highcharts} options={chartOptions} />
			) : (
				<div>Error: No chart data available</div>
			)}
		</div>
	);
};
window.Highcharts = Highcharts;
export default Chart;
