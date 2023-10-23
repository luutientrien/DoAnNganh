import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Container,
	Button,
	TextField,
	Grid,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import { useStyles } from './AdminProduct-styles';
import { useHistory } from 'react-router';
import {
	AppTable,
	AppSearch,
	AppAlert,
} from '../../components';
import { ProtectRoutes } from '../../routes/protect-route';
import { AdminProductColumns, formSearch } from "./AdminProduct-const"
import moment from "moment";
import { useForm, Controller } from "react-hook-form";

export default function AdminProduct() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const [productList, setProductList] = useState([]);
	const { control, setValue, getValues } = useForm();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);

	useEffect(() => {
		async function init() {
			await fetchProducts();
		}
		init();
	}, [])

	// lấy danh sách product
	const fetchProducts = async (params = '') => {
		const _path = endpoints['admin/product'](params)
		// const _path = endpoints['admin/product'](params, page)
		API.get(_path).then(res => {
			setProductList(res.data.result.rows);
			setLoading(false)
		})
	}

	const handleSearch = () => {
		let tempSearch = Object.assign({}, getValues())
		let tempKeys = Object.keys(tempSearch)
		let strSearch = '&' + tempKeys.map((s) => s + '=' + tempSearch[`${s}`] + '').join('&')
		fetchProducts(strSearch)
	};

	const paramToDetail = {
		keyId: 'product_id',
		_path: 'AdminProductDetail'
	}

	// chọn nút tạo mới
	const handleCreateNew = () => {
		history.push(ProtectRoutes.AdminProductNews.path);
	};

	// xóa sản phẩm
	const handleDeleteProduct = async (rowData) => {
		const formData = {
			product_id: rowData.product_id
		}
		try {
			let res = await API.post(endpoints['admin/delete-product'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Lỗi, sản phẩm đang được đăng bán!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Xóa sản phẩm thành công!!!'
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

	// xử lý sự kiện đóng thông báo, cật nhật thành công thì reload trang sau khi đóng thông báo
	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlert(false);
			if (alertInfo.typeAlert.success) {
				window.location.reload();
			}
		}
	};

	return (
		<Box className={classes.AdminProduct}>
			<Box>
				<Typography variant="h2">{ProtectRoutes.AdminProduct.label}</Typography>
			</Box>
			<Box className='box-table'>
				{/* <Grid container spacing={3}>
					<Grid item xs={9}>
						<AppInput />
						asd
					</Grid>
					<Grid item xs={3}>asd</Grid>
				</Grid> */}
				{/* <AppForm fields={fields} control={control} getValues={getValues} setValue={setValue} /> */}
				<AppSearch fields={formSearch} control={control} onSearch={() => { handleSearch() }} onCreateNew={() => { handleCreateNew() }} />

				{/* danh sách sản phẩm */}
				{loading ? <p>Loading ...</p> :
					<AppTable columns={AdminProductColumns} data={productList} paramsChoose={paramToDetail} handleDelete={handleDeleteProduct} />
				}
			</Box>
			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Box>
	);
}
