import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function AppChart({
	arrData = [],
	arrMonthLabel = [],
	titleChart,
}) {

	// const [tempArrData, setTempArrData] = React.useState([])
	let tempArrData = []

	const formatData = () => {
		let i = 0;
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
			if (m === arrData[i]?.MONTH_ORDER) {
				tempArrData.push(arrData[i].COUNT_ORDER)
				i++;
			} else {
				tempArrData.push(0)
			}
		})
		return tempArrData
	}

	const data = {
		labels: arrMonthLabel,
		datasets: [
			{
				label: 'Hóa đơn',
				data: formatData(),
				backgroundColor: ['rgba(54, 162, 235, 0.2)',],
				borderColor: ['rgba(54, 162, 235, 1)',],
				borderWidth: 1
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top'
			},
			title: {
				display: true,
				text: titleChart,
			},
		},
	};

	return <Bar options={options} data={data} />;
}
