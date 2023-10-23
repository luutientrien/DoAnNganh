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
import { useStyles } from './AdminUserManagementDetail-styles';
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
import { userKey, formFields, ProfileOrderColumns } from "./AdminUserManagementDetail-const";
import cookies from 'react-cookies';

export default function AdminUserManagementDetail() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false)
	const [userInfo, setUserInfo] = useState({})
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);
	const [formType, setFormType] = useState('');
	const [datePicker, setDatePicker] = useState(new Date());
	const [orderUser, setOrderUser] = useState([]);
	let user = cookies.load("user");

	const viewPath = useLocation().pathname.split('/');
	const userId = viewPath[viewPath.length - 1]
	const { control, setValue, getValues } = useForm({});

	// liên quan đến lifecycle của reactjs, được gọi khi component có sự thay đổi
	// chỉ gọi 1 lần duy nhất
	useEffect(() => {
		async function init() {
			if (userId === 'new') {
				setFormType('insert')
			} else {
				await fetchDataUser(userId)
				await fetchOrderUser(userId)
				setFormType('update')
			}
		}
		init();
	}, [])

	// chỉ gọi khi userInfo thay đổi
	useEffect(() => {
		getDataToForm();
	}, [userInfo])

	// lấy thông tin người dùng từ data truyền vào form
	const getDataToForm = () => {
		userKey.map((p) => setValue(p, userInfo[p]))
	}

	// thực hiện câu truy vấn lên server lấy thông tin người dùng
	const fetchDataUser = async (params) => {
		const _path = endpoints['admin/user/id'](params)
		API.get(_path).then(res => {
			setUserInfo(res.data.result);
			setLoading(false)
		})
	}

	// lấy danh sách hóa đơn
	const fetchOrderUser = async (params = '') => {
		const _path = endpoints['admin/order-by-user'](params)
		API.get(_path).then(res => {
			setOrderUser(res.data.result);
		})
	}

	// update thông tin người dùng
	const updateInfoUser = async (event) => {
		const formData = Object.assign({}, getValues());
		let tempDateOb = new Date(formData.date_ob);
		tempDateOb = tempDateOb.getFullYear() + '-' + (tempDateOb.getMonth() +  1)+'-' + tempDateOb.getDate();
		formData.date_ob = tempDateOb;
		
		const formInfo = {
			formType: formType,
			auth: user.username,
			note: 'AdminUserManagementDetail',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.put(endpoints['admin/update-user'],
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
					label: 'Cập nhật thông tin người dùng thành công!!!'
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

	// tạo mới người dùng
	const createNewUser = async (event) => {
		const formData = Object.assign({}, getValues());
		let tempDateOb = new Date(formData.date_ob);
		tempDateOb = tempDateOb.getFullYear() + '-' + (tempDateOb.getMonth() +  1)+'-' + tempDateOb.getDate();
		formData.date_ob = tempDateOb;
		const formInfo = {
			formType: formType,
			auth: user.username,
			note: 'AdminUserManagementNew',
		}
		infoRequest(formData, formInfo);
		formData.status_acc = 'active';
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.post(endpoints['admin/create-new-user'],
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
					label: 'Tạo mới người dùng thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					history.push(ProtectRoutes.AdminUserManagement.path);
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
		history.push(ProtectRoutes.AdminUserManagement.path);
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

	function testFun(date) {
		setValue('date_ob', date)
		setDatePicker(date)
	}

	return (
		<Container className={classes.AdminUserManagementDetail}>
			<div>
				<Box>
					{userId === 'new' ? <Typography variant="h4" className='title-user-manager'>Người dùng mới</Typography>
						: <Typography variant="h4" className='title-user-manager'>{ProtectRoutes.AdminUserManagementDetail.label}: {userInfo?.name}</Typography>}
				</Box>

				{/* tìm kiếm */}
				<AppForm
					fields={formFields(testFun, datePicker, formType === 'insert' ? true : false)}
					control={control}
					onGoBack={handleGoBack}
					onGoSubmit={formType === 'insert' ? createNewUser : updateInfoUser}
					formType={formType}
					isCreate={formType === 'insert' ? true : false}
				/>
			</div>
			{formType === 'insert' ? <></>
				: <div className='box-order-list'>
					<Typography variant="h4" className='title-user-manager'>Lịch sử giao dịch</Typography>
					<AppTable columns={ProfileOrderColumns} data={orderUser} />
				</div>}
			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Container>
	);
}
