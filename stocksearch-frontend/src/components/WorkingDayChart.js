import React, { useEffect } from "react";

import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useTickerContext } from "../context/TickerContext";

const WorkingDayChart = () => {
	// useEffect(() => {}, [hourlyChartData]);

	const { currentTickerSymbol: ticker, currentTickerData } = useTickerContext();

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
				labels: {
					format: "{value:%H:%M}",
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
				data: currentTickerData.hourlyChartData,
			},
		],
	};

	return (
		<>
			{currentTickerData.hourlyChartData.length > 0 ? (
				<HighchartsReact
					highcharts={HighCharts}
					constructorType={"stockChart"}
					options={options}
				></HighchartsReact>
			) : (
				currentTickerData.hourlyChartData.length === 0 && (
					<HighchartsReact
						highcharts={HighCharts}
						constructorType={"stockChart"}
						options={options}
					></HighchartsReact>
				)
			)}
		</>
	);
};

export default WorkingDayChart;
