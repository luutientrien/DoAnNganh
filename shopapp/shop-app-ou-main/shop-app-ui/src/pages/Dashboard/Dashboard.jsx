import React, { useEffect, useState } from 'react';
import {
	Typography,
	Container,
	Grid,
	TextField,
	Button,
} from '@material-ui/core';
import { useStyles } from './Dashboard-styles';
import API, { endpoints } from '../../helpers/API';
import { Bar } from 'react-chartjs-2';
import {
	AppChart,
	AppInput,
	AppForm,
	AppSearch,
	AppAlert,
} from '../../components';
import { arrMonthLabel } from "./Dashboard-const";


export default function Dashboard() {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [countOrder, setCountOrder] = useState(0);
	const [year, setYear] = useState('2022');

	useEffect(() => {
		async function init() {
			await fetchOrderInYear()
		}
		init()
	}, [])

	// chart thống kê theo năm
	const fetchOrderInYear = async () => {
		const _pathAPI = endpoints['admin/get-order-year'](year)
		API.get(_pathAPI).then(res => {
			setCountOrder(res.data.result)
		})
	}

	const handleChange = (event) => {
		setYear(event.target.value.replace(/[^0-9]/g, ''));
	}

	const handleSearch = () => {
		fetchOrderInYear()
	};

	// xử lý nut enter khi tìm kiếm
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<Container>
			<div className='chart'>
				<Typography className={classes.title} variant="h4">Hoạt động trong năm</Typography>

				<Grid container className={classes.Dashboard}>
					<Grid item xs={8}>
						<AppChart
							arrData={countOrder}
							arrMonthLabel={arrMonthLabel}
							titleChart={'Đơn hàng trong năm'}
						/>
					</Grid>

					{/* tìm kiếm theo năm */}
					<Grid item xs={3} className={classes.tool}>
						<Typography variant="body">Thống kê theo năm</Typography>
						<Grid container >
							{/* thông tin về bài viết */}
							<Grid item xs={7}>
								<TextField
									variant="outlined"
									fullWidth
									value={year}
									onChange={handleChange}
									onKeyDown={handleKeyDown}
								/>
							</Grid>
							<Grid item xs={5}>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									className={classes.search}
									onClick={handleSearch}
								>
									Thống kê
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</Container>


	);
}