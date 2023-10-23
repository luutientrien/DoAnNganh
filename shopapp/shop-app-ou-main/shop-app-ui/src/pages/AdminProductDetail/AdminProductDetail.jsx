import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
	Grid,
	Typography,
	Container,
	Button,
	TextField,
	Box,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import { infoRequest } from '../../helpers/utils';
import { useStyles } from './AdminProductDetail-styles';
import { useHistory, useLocation } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import { ProtectRoutes } from '../../routes/protect-route';
import {
	AppTable,
	AppInput,
	AppForm,
	AppSearch,
	AppAlert,
} from '../../components';
import { useForm, Controller } from "react-hook-form";
import { productKey, formFields } from "./AdminProductDetail-const";

export default function AdminProductDetail() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false)
	const [productInfo, setProductInfo] = useState({})
	const [categorys, setCategorys] = useState([])
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);
	const [formType, setFormType] = useState('')

	const viewPath = useLocation().pathname.split('/');
	const productId = viewPath[viewPath.length - 1]
	const { control, setValue, getValues } = useForm();

	// liên quan đến lifecycle của reactjs, được gọi khi component có sự thay đổi
	// chỉ gọi 1 lần duy nhất
	useEffect(() => {
		// const productId = viewPath[viewPath.length - 1]
		async function init() {
			setLoading(true)
			if (productId === 'new') {
				setFormType('insert')
			} else {
				await fetchDataProduct(productId)
				setFormType('update')
			}
			await fetchCategorys();
		}
		init();
	}, [])

	// chỉ gọi khi productInfo thay đổi
	useEffect(() => {
		getDataToForm();
	}, [productInfo])

	// lấy thông tin sản phẩm từ data truyền vào form
	const getDataToForm = () => {
		// for (const key in productInfo) {
		// 	setValue(key, productInfo[`${key}`])
		// }
		productKey.map((p) => setValue(p, productInfo[p]))
	}

	// thực hiện câu truy vấn lên server lấy thông tin sản phẩm
	const fetchDataProduct = async (params) => {
		setTimeout(() => {
			const _path = endpoints['admin/product/id'](params)
			API.get(_path).then(res => {
				setProductInfo(res.data.result);
				setLoading(false)
			})
		}, 500);
	}

	// thực hiện câu truy vấn lên server lấy danh sách loại sản phẩm
	const fetchCategorys = async (params) => {
		const _path = endpoints['admin/category']
		API.get(_path).then(res => {
			setCategorys(res.data.result.rows);
			setLoading(false)
		})
	}

	// update thông tin sản phẩm
	const updateInfoProduct = async (event) => {
		const formData = Object.assign({}, getValues())
		const formInfo = {
			formType: formType,
			auth: 'admin',
			note: 'AdminProductDetail',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.put(endpoints['admin/update-product'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			console.info("res:", res)
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Lỗi, bạn vui lòng kiểm tra lại thông tin!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Cập nhật thông tin sản phẩm thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					window.location.reload();
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

	// tạo mới sản phẩm
	const createNewProduct = async (event) => {
		const formData = Object.assign({}, getValues());
		const formInfo = {
			formType: formType,
			auth: 'admin',
			note: 'AdminProductNew',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.post(endpoints['admin/create-new-product'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			console.info("res:", res)
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Lỗi, bạn vui lòng kiểm tra lại thông tin!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Tạo mới sản phẩm thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					history.push(ProtectRoutes.AdminProduct.path);
				}, 500);
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

	// chọn button quay về
	const handleGoBack = () => {
		history.push(ProtectRoutes.AdminProduct.path);
	};

	// xử lý sự kiện đóng thông báo, cật nhật thành công thì reload trang sau khi đóng thông báo
	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlert(false);
			if (alertInfo.typeAlert.success) {
				window.location.reload();
			}
		}
	};

	const handleClick = () => {
		setOpenAlert(true);
		setAlertInfo({
			typeAlert: { error: true },
			label: 'Cập nhật thông tin sản phẩm thành công!!!'
		})
	};

	return (
		<Container className={classes.AdminProductDetail}>
			<Box>
				{productId === 'new' ? <Typography variant="h4" className='title-product'>Sản phẩm mới</Typography>
					: <Typography variant="h4" className='title-product'>{ProtectRoutes.AdminProductDetail.label}: {productInfo?.name}</Typography>}
			</Box>

			{/* <Button variant="outlined" onClick={handleClick}>
				Open success snackbar
			</Button> */}

			{/* tìm kiếm */}
			<AppForm
				fields={formFields(categorys)}
				control={control}
				onGoBack={handleGoBack}
				onGoSubmit={formType === 'insert' ? createNewProduct : updateInfoProduct}
				formType={formType}
			/>

			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Container>
	);
}
