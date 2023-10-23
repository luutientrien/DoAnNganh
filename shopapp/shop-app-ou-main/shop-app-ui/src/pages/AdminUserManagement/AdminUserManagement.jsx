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
import { useStyles } from './AdminUserManagement-styles';
import { useHistory } from 'react-router';
import {
	AppTable,
	AppSearch,
	AppAlert,
} from '../../components';
import { ProtectRoutes } from '../../routes/protect-route';
import { AdminUserManagementColumns, formSearch } from "./AdminUserManagement-const"
import { useForm, Controller } from "react-hook-form";
import { rolePaths } from '../../helpers/utils'

export default function AdminUserManagement() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [userRole, setUserRole] = useState(rolePaths.CUSTOMER);
	const [userList, setUserList] = useState([]);
	const { control, setValue, getValues } = useForm();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);

	useEffect(() => {
		async function init() {
			await fetchUsers(`&role_name=${userRole}`);
		}
		init();
	}, [])

	// lấy danh sách product
	const fetchUsers = async (params = '') => {
		let page = 2;
		if (!params.includes('&role_name=')) {
			params += `&role_name=${userRole}`;
		}
		const _path = endpoints['admin/user'](params)
		// const _path = endpoints['admin/product'](params, page)
		API.get(_path).then(res => {
			setUserList(res.data.result.rows);
			setLoading(false)
		})
	}

	const handleSearch = async () => {
		let tempSearch = Object.assign({}, getValues())
		let tempKeys = Object.keys(tempSearch)
		let strSearch = '&' + tempKeys.map((s) => s + '=' + tempSearch[`${s}`] + '').join('&')
		await fetchUsers(strSearch)
	};

	const paramToDetail = {
		keyId: 'user_id',
		_path: 'AdminUserManagementDetail'
	}

	// chọn nút tạo mới
	const handleCreateNew = () => {
		history.push(ProtectRoutes.AdminUserManagementNews.path);
	};

	const handleSearchUserByRole = async (role) => {
		setUserRole(role);
		for (let key in getValues()) {
			setValue(key, '')
		}
		await fetchUsers(`&role_name=${role}`);
	}

	// xóa người dùng
	const handleDeleteUser = async (rowData) => {
		const formData = {
			user_id: rowData.user_id
		}
		try {
			let res = await API.post(endpoints['admin/delete-user'],
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
					label: 'Xóa người dùng thành công!!!'
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
		<Box className={classes.AdminUserManagement}>
			<Box>
				<Typography variant="h3">{userRole === 'manager' ? 'Quản lý nhân viên' : 'Quản lý người dùng'}</Typography>
			</Box>
			<Box className='box-table'>
				<Box className='box-search'>
					<Button className='btn-role' onClick={() => handleSearchUserByRole('manager')}>Nhân viên</Button>
					<Button className='btn-role' onClick={() => handleSearchUserByRole('register')}>Người dùng</Button>
					<Box className='app-search'>
						<AppSearch fields={formSearch} control={control} onSearch={() => { handleSearch() }} onCreateNew={() => { handleCreateNew() }} />
					</Box>
				</Box>

				{/* danh sách người dùng */}
				{loading ? <p>Loading ...</p> :
					<AppTable columns={AdminUserManagementColumns} data={userList} paramsChoose={paramToDetail} handleDelete={handleDeleteUser} />
				}
			</Box>
			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Box>
	);
}
