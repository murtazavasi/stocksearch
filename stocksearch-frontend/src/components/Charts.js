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
	}, [ticker]);

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

		const options = {
			title: {
				text: ticker + " Historical",
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
					opposite: true,
				},
				{
					opposite: true,
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

			navigator: {
				enabled: true,
			},
			scrollbar: {
				enabled: true,
			},
			rangeSelector: {
				enabled: true,
				buttons: [
					{
						type: "month",
						count: 1,
						text: "1m",
					},
					{
						type: "month",
						count: 3,
						text: "3m",
					},
					{
						type: "month",
						count: 6,
						text: "6m",
					},
					{
						type: "ytd",
						text: "YTD",
					},
					{
						type: "year",
						count: 1,
						text: "1y",
					},
					{
						type: "all",
						text: "All",
					},
				],
				selected: 2, // default selected range
				inputEnabled: true, // hide input box
			},

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
			chart: {
				height: 600, // Adjust the height of the chart here
			},
		};
		console.log("chartOptions", options);
		setChartOptions(options); // Set updated options state
	};

	return (
		<div style={{ height: "600px" }}>
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

export default Chart;
