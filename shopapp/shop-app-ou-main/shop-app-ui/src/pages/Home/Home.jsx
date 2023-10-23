import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Container,
	Button,
	TextField,
	Grid,
	TablePagination,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import { useStyles } from './Home-styles';
import { useHistory } from 'react-router';
import {
	AppTable,
	AppSearch,
	AppAlert,
	AppCard
} from '../../components';
import { ProtectRoutes } from '../../routes/protect-route';
import { PublicPaths } from '../../routes/public-route';
import { HomeColumns, formSearch } from "./Home-const"
import { useForm, Controller } from "react-hook-form";
import { rolePaths } from '../../helpers/utils'

export default function Home() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [saleList, setSaleList] = useState([]);
	const { control, setValue, getValues } = useForm();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);

	useEffect(() => {
		async function init() {
			await fetchSales();
		}
		init();
	}, [])

	// lấy danh sách product
	const fetchSales = async (params = '') => {
		const _path = endpoints['admin/sale-info'](params)
		// const _path = endpoints['admin/product'](params, page)
		API.get(_path).then(res => {
			setSaleList(res.data.result);
			setLoading(false)
		})
	}

	const handleSearch = async () => {
		let tempSearch = Object.assign({}, getValues())
		let tempKeys = Object.keys(tempSearch)
		let strSearch = '&' + tempKeys.map((s) => s + '=' + tempSearch[`${s}`] + '').join('&')
		await fetchSales(strSearch)
	};

	// chuyển trang đến thông tin chi tiết -> thực hiện order
	const handleAddCart = async (itemData) => {
		const _path = PublicPaths.SaleInfoDetail.replace(":id", itemData.sales_info_id)
		history.push(_path)
	}

	// xử lý sự kiện đóng thông báo, cật nhật thành công thì reload trang sau khi đóng thông báo
	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlert(false);
			if (alertInfo.typeAlert.success) {
				window.location.reload();
			}
		}
	};

	// chuyển trang
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(6);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Box className={classes.Home}>
			<Box className='box-title'>
				<Typography variant="h4">Danh sách sản phẩm</Typography>
				<TablePagination
					rowsPerPageOptions={[3, 6, 9]}
					component="div"
					count={saleList.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage='Hiển thị'
				/>
			</Box>
			<Box className='box-cart-list'>
				{saleList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dataItem, idx) => (
					<div className='box-cart-padding' key={`home-box-item-cart-${idx}`}>
						<AppCard 
							data={dataItem} 
							handleCart={handleAddCart} 
							className={'box-cart-item'} 
							handleChoose={handleAddCart} 
							idx={idx}
						/>
					</div>
				))}
			</Box>
		</Box>
	);
}
