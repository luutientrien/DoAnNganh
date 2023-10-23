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
import { useStyles } from './AdminSaleInfo-styles';
import { useHistory } from 'react-router';
import {
	AppTable,
	AppSearch,
	AppAlert,
} from '../../components';
import { ProtectRoutes } from '../../routes/protect-route';
import { AdminSaleInfoColumns, formSearch } from "./AdminSaleInfo-const"
import { useForm, Controller } from "react-hook-form";
import { rolePaths } from '../../helpers/utils'

export default function AdminSaleInfo() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [userRole, setUserRole] = useState(rolePaths.CUSTOMER);
	const [saleList, setSaleList] = useState([]);
	const { control, setValue, getValues } = useForm();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);

	useEffect(() => {
		async function init() {
			await fetchSaleInfos();
		}
		init();
	}, [])

	// lấy danh sách product
	const fetchSaleInfos = async (params = '') => {
		const _path = endpoints['admin/sale-info'](params)
		API.get(_path).then(res => {
			console.info(res)
			setSaleList(res.data.result);
			setLoading(false)
		})
	}

	const handleSearch = async () => {
		let tempSearch = Object.assign({}, getValues())
		let tempKeys = Object.keys(tempSearch)
		let strSearch = '&' + tempKeys.map((s) => s + '=' + tempSearch[`${s}`] + '').join('&')
		await fetchSaleInfos(strSearch)
	};

	const paramToDetail = {
		keyId: 'sales_info_id',
		_path: 'AdminSaleInfoDetail'
	}

	// chọn nút tạo mới
	const handleCreateNew = () => {
		history.push(ProtectRoutes.AdminSaleInfoNews.path);
	};

	// xóa bài viết
	const handleDeleteSale = async (rowData) => {
		const formData = {
			sales_info_id: rowData.sales_info_id
		}
		try {
			let res = await API.post(endpoints['admin/delete-sale-info'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Lỗi, bạn vui lòng kiểm tra lại!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Xóa bài viết thành công!!!'
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
		<Box className={classes.AdminSaleInfo}>
			<Box>
				<Typography variant="h3">{userRole === 'manager' ? 'Quản lý nhân viên' : 'Quản lý bài viết'}</Typography>
			</Box>
			<Box className='box-table'>
				<Box className='box-search'>
					<Box className='app-search'>
						<AppSearch fields={formSearch} control={control} onSearch={() => { handleSearch() }} onCreateNew={() => { handleCreateNew() }} />
					</Box>
				</Box>

				{/* danh sách bài viết */}
				{loading ? <p>Loading ...</p> :
					<AppTable columns={AdminSaleInfoColumns} data={saleList} paramsChoose={paramToDetail} handleDelete={handleDeleteSale} />
				}
			</Box>
			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Box>
	);
}
