import React, { useState, useEffect } from "react";

import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import indicators from "highcharts/indicators/indicators";
import ema from "highcharts/indicators/ema";
import volumeByPrice from "highcharts/indicators/volume-by-price";

import axios from "axios";

// VBPChart(HighCharts);

const Charts = ({ ticker }) => {
	let volume = [];
	let ohlc = [];
	const groupingUnits = [
		[
			"week", // unit name
			[1], // allowed multiples
		],
		["month", [1, 2, 3, 4, 6]],
	];

	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchChartData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/stock/charts/${ticker}`
		);
		const data = await response.data;

		setChartData(data.results);
		console.log(data.results);
		formatChartData(data.results);
	};

	const formatChartData = (data) => {
		volume = data.map((item) => [item["t"], item["v"]]);
		ohlc = data.map((item) => [
			item["t"],
			item["o"],
			item["h"],
			item["l"],
			item["c"],
		]);

		console.log(volume);
		console.log(ohlc);
	};

	useEffect(() => {
		setLoading(true);
		fetchChartData();
		if (typeof HighCharts === "object") {
			volumeByPrice(HighCharts);
		}
		setLoading(false);
	}, []);

	const options = {
		rangeSelector: {
			selected: 2,
		},

		title: {
			text: "AAPL Historical",
		},

		subtitle: {
			text: "With SMA and Volume by Price technical indicators",
		},

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

		// plotOptions: {
		// 	series: {
		// 		dataGrouping: {
		// 			units: groupingUnits,
		// 		},
		// 	},
		// },

		series: [
			{
				type: "candlestick",
				name: "AAPL",
				id: "aapl",
				zIndex: 2,
				data: ohlc,
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

	if (loading) {
		return <h1>Loading Chart Data</h1>;
	}

	return (
		ohlc &&
		volume && (
			<HighchartsReact
				highcharts={HighCharts}
				constructorType={"stockChart"}
				options={options}
			></HighchartsReact>
		)
	);
};
window.Highcharts = HighCharts;
export default Charts;
