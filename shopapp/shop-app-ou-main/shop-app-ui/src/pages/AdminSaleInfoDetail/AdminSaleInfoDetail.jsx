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
import { useStyles } from './AdminSaleInfoDetail-styles';
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
import { saleInfoKey, formFields } from "./AdminSaleInfoDetail-const";
import { AdminProductColumns } from "./AdminSaleInfoDetail-const"
import cookies from 'react-cookies';

export default function AdminSaleInfoDetail() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false)
	const [productList, setProductList] = useState([]);
	const [saleInfo, setSaleInfo] = useState({})
	const [btnValue, setBtnValue] = useState('Tìm sản phẩm');
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);
	const [formType, setFormType] = useState('')
	let user = cookies.load("user");

	const viewPath = useLocation().pathname.split('/');
	const saleId = viewPath[viewPath.length - 1]
	const { control, setValue, getValues } = useForm();

	// liên quan đến lifecycle của reactjs, được gọi khi component có sự thay đổi
	// chỉ gọi 1 lần duy nhất
	useEffect(() => {
		async function init() {
			// setLoading(true)
			if (saleId === 'new') {
				setFormType('insert')
				fetchProducts();
			} else {
				await fetchDataSale(saleId)
				setFormType('update')
			}
		}
		init();
	}, []);

	// chỉ gọi khi saleInfo thay đổi
	useEffect(() => {
		getDataToForm(formType);
	}, [saleInfo]);

	// lấy thông tin người dùng từ data truyền vào form
	const getDataToForm = (formType) => {
		if (formType === 'insert') {
			saleInfoKey.map((p) => setValue(p, saleInfo[p]))
		} else {
			Object.keys(saleInfo).map((k) => setValue(k, saleInfo[k]))
		}
	};

	// lấy danh sách product
	const fetchProducts = async (params = '') => {
		const _path = endpoints['admin/product'](params)
		API.get(_path).then(res => {
			setProductList(res.data.result.rows);
		})
	}

	// thực hiện câu truy vấn lên server lấy thông tin bài viết
	const fetchDataSale = async (params) => {
		const _path = endpoints['admin/sale-info/id'](params)
		API.get(_path).then(res => {
			setSaleInfo(res.data.result);
		});
	}

	// update thông tin bài viết
	const updateSaleInfo = async (event) => {
		let tempForm = {};
		saleInfoKey.map((p) => tempForm[p] = getValues()[p])
		const formData = Object.assign({}, tempForm)
		const formInfo = {
			formType: formType,
			auth: user.username,
			note: 'AdminSaleInfoDetail',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.put(endpoints['admin/update-sale'],
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
					label: 'Cập nhật thông tin bài viết thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					window.location.reload();
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

	// tạo mới bài viết
	const createNewSaleInfo = async (event) => {
		let temptForm = Object.assign({}, getValues());
		let formData = {}
		saleInfoKey.map((p) => formData[p] = temptForm[p])

		const formInfo = {
			formType: formType,
			auth: user.username,
			note: 'AdminSaleInfoNew',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.post(endpoints['admin/create-new-sale'],
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
					label: 'Tạo mới bài viết thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					history.push(ProtectRoutes.AdminSaleInfo.path);
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

	// chọn button quay về
	const handleGoBack = () => {
		history.push(ProtectRoutes.AdminSaleInfo.path);
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

	let [elmArr, setElmArr] = useState(null);
	const handleChooseProduct = (rowData, elementId) => {
		if (elmArr !== null) {
			elmArr.classList.remove('row-act')
		}
		let docTemp = document.getElementById(elementId);
		docTemp.classList.add('row-act');
		setElmArr(docTemp)
		setValue('product_id', rowData.product_id);
		setValue('product_name', rowData.name);
		setValue('price', rowData.price);
		setValue('stored_qty', rowData.stored_qty);
	};

	const handleChooseProduct2 = () => {
		if (btnValue === 'Tìm sản phẩm') {
			setBtnValue('Xác nhận')
		}
		if (btnValue === 'Xác nhận') {
			setBtnValue('Tìm sản phẩm')
		}
	};

	return (
		<Container className={classes.AdminSaleInfoDetail}>
			<Box className='box-title'>
				{saleId === 'new' ? <Typography variant="h4" className='title-product'>Bài viết mới </Typography>
					: <Typography variant="h4" className='title-product'>{ProtectRoutes.AdminSaleInfoDetail.label}: {saleInfo?.title}</Typography>}
				{formType !== 'update' && (
					<Button className='btn-search' id="btnChoose" onClick={handleChooseProduct2}>{btnValue}</Button>
				)}
			</Box>

			{(btnValue !== '1' && btnValue !== 'Tìm sản phẩm') && (
				<Box>
					<AppTable columns={AdminProductColumns} data={productList} isBtn={false} handleChooseItem={handleChooseProduct} />
				</Box>
			)}

			{/* form */}
			<AppForm
				fields={formFields()}
				control={control}
				onGoBack={handleGoBack}
				onGoSubmit={formType === 'insert' ? createNewSaleInfo : updateSaleInfo}
				formType={formType}
			/>

			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Container>
	);
}
