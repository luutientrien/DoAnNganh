import React, { useEffect, useState, useMemo } from 'react';
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
import { useStyles } from './SaleInfoDetail-styles';
import { useHistory, useLocation } from 'react-router';
import {
	AppAlert,
	AppForm,
} from '../../components';
import { formFields } from "./SaleInfoDetail-const"
import { useForm, Controller } from "react-hook-form";
import { rolePaths } from '../../helpers/utils'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import cookies from 'react-cookies';
import Alert from '@material-ui/lab/Alert';
import { infoRequest } from '../../helpers/utils';

export default function SaleInfoDetail() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [saleInfo, setSaleInfo] = useState([]);
	const { control, setValue, getValues } = useForm();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);
	const viewPath = useLocation().pathname.split('/');
	const saleInfoId = viewPath[viewPath.length - 1];
	const [totalValue, setTotalValue] = useState(0);
	const [qtyValue, setQtyValue] = useState(0);
	let user = cookies.load("user");
	let currentTime = new Date()

	useEffect(() => {
		async function init() {
			await fetchSaleInfo(saleInfoId);
		}
		init();
	}, [])

	// lấy thông tin bài đăng
	const fetchSaleInfo = async (params = '') => {
		const _path = endpoints['admin/sale-info/id'](params)
		API.get(_path).then(res => {
			setSaleInfo(res.data.result);
		})
	}

	// chỉ gọi khi saleInfo thay đổi
	useEffect(() => {
		getDataToForm();
	}, [saleInfo]);

	// lấy thông tin sản phẩm từ data truyền vào form
	const getDataToForm = (formType) => {
		Object.keys(saleInfo).map((k) => setValue(k, saleInfo[k]));
		let tempTotal = getValues().price * getValues()?.total_qty ? (getValues()?.total_qty - 0) : 0;
		setValue('total_price', tempTotal)
	};

	// tạo mới order
	const createNewOrder = async (event) => {
		const formData = {
			user_id: user.user_id,
			product_id: saleInfo.product_id,
			total_qty: qtyValue,
			total_price: totalValue,
		}
		const formInfo = {
			formType: 'insert',
			auth: user.username,
			note: 'SaleInfoDetail',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.post(endpoints['admin/create-new-order'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Lỗi, bạn vui lòng kiểm tra lại thông tin!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Đặt hàng thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					history.push('/');
				}, 1500);
			}
		} catch (err) {
			console.log("ERROR:\n", err);
			setOpenAlert(true);
			setAlertInfo({
				typeAlert: { error: true },
				label: 'Lỗi hệ thống, bạn vui lòng kiểm tra lại kết nối!'
			})
		}
	}

	// thêm vào giỏ hàng tạm thời, không lưu xuống data
	const handleAddCart = async () => {
		if (user) {
			if (qtyValue === 0) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Bạn chưa chọn số lượng sản phẩm!!!',
				})
				setOpenAlert(true);
				return
			}
			await createNewOrder()
		} else {
			setAlertInfo({
				typeAlert: { warning: true },
				label: 'Đăng nhập để sử dụng!!!',
			})
			setOpenAlert(true);
		}
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

	const handleChangeQty = (flag) => {
		if (flag) {
			setQtyValue(qtyValue + 1)
			let tempQty = (qtyValue + 1) * (saleInfo.price - 0)
			setTotalValue(tempQty)
		} else {
			if (qtyValue === 0) return
			setQtyValue(qtyValue - 1)
			let tempQty = (qtyValue - 1) * (saleInfo.price - 0)
			setTotalValue(tempQty)
		}
	}

	return (
		<Box className={classes.SaleInfoDetail}>
			<Grid container spacing={10}>
				<Grid item xs={6}>
					<Typography variant="h4" className='title-sale'>Thông tin sản phẩm</Typography>
					<AppForm
						fields={formFields()}
						control={control}
						formType={''}
					/>
				</Grid>
				<Grid item xs={4} className='box-order'>
					<Typography variant="h4" className='title-sale'>Hóa đơn</Typography>
					<Typography component='label' className='title-sale'>Thời gian: {currentTime.toLocaleDateString('en-GB')}</Typography>
					{user ? <>
						<div className='box-order-input'>
							<p className='order-label'>Tên người dùng</p>
							<TextField
								variant="outlined"
								className='order-input'
								disabled
								fullWidth
								value={user.name}
								InputLabelProps={{
									shrink: true,
								}} />

						</div>
						<div className='box-order-input'>
							<p className='order-label'>Sản phẩm</p>
							<TextField
								variant="outlined"
								className='order-input'
								disabled
								fullWidth
								value={saleInfo.product_name}
								InputLabelProps={{
									shrink: true,
								}} />
						</div>
					</> : <></>}
					<div className='box-order-input'>
						<p className='order-label'>Số lượng</p>
						<Button onClick={() => { handleChangeQty(false) }}><RemoveIcon /></Button>
						<TextField
							variant="outlined"
							className='order-input-number'
							disabled
							fullWidth
							value={qtyValue}
							InputLabelProps={{
								shrink: true,
							}} />
						<Button onClick={() => { handleChangeQty(true) }}><AddIcon /></Button>
					</div>
					<div className='box-order-input'>
						<p className='order-label'>Tổng tiền</p>
						<TextField
							variant="outlined"
							disabled
							className='order-input-number'
							value={totalValue}
							fullWidth
							InputLabelProps={{
								shrink: true,
							}} />
					</div>
					<Button className='btn-submit' onClick={handleAddCart} fullWidth>Đặt hàng</Button>
				</Grid>
			</Grid>
			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Box>
	);
}
