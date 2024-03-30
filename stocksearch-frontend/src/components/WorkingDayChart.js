import React, { useEffect } from "react";

import HighCharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const WorkingDayChart = ({ ticker, hourlyChartData }) => {
	useEffect(() => {}, [hourlyChartData]);

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
				data: hourlyChartData,
			},
		],
	};

	return (
		<>
			{hourlyChartData.length > 0 ? (
				<HighchartsReact
					highcharts={HighCharts}
					constructorType={"stockChart"}
					options={options}
				></HighchartsReact>
			) : (
				hourlyChartData.length === 0 && (
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
