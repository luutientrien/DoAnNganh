import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Grid,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import { useStyles } from './Profile-styles';
import { useHistory } from 'react-router';
import {
	AppAlert,
	AppForm,
	AppTable,
} from '../../components';
import { formFields, userKey, ProfileOrderColumns, columnExport, createData } from "./Profile-const"
import { useForm, Controller } from "react-hook-form";
import cookies from 'react-cookies';
import { infoRequest } from '../../helpers/utils';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import moment from "moment";

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

export default function Profile() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [userInfoData, setUserInfoData] = useState([]);
	const { control, setValue, getValues } = useForm();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [formType, setFormType] = useState('profile');
	const [alertInfo, setAlertInfo] = React.useState(false);
	const [orderUser, setOrderUser] = useState([]);
	const [dataExport, setDataExport] = useState([]);
	let user = cookies.load("user");

	useEffect(() => {
		async function init() {
			await fetchUserInfo(user.user_id);
			await fetchOrderUser(user.user_id);
		}
		init();
	}, [])

	// lấy thông tin bài đăng
	const fetchUserInfo = async (params = '') => {
		const _path = endpoints['admin/user/id'](params)
		API.get(_path).then(res => {
			setUserInfoData(res.data.result);
		})
	}

	// lấy danh sách hóa đơn
	const fetchOrderUser = async (params = '') => {
		const _path = endpoints['admin/order-by-user'](params)
		API.get(_path).then(res => {
			setOrderUser(res.data.result);

			// hiện tại orderUser, dataExport là cùng giá trị, nhưng chưa sửa DataGrid nên phải tách riêng cho thư viện hiểu và hoạt động
			setDataExport(
				res.data.result.map((b, idx) =>
					createData(b.order_id, b.product_name, b.price, b.total_qty, b.total_price, moment(b.update_date).format("DD-MM-YYYY").toString()),
				)
			);
		})
	}

	// chỉ gọi khi userInfoData thay đổi
	useEffect(() => {
		getDataToForm();
	}, [userInfoData])

	// lấy thông tin người dùng từ data truyền vào form
	const getDataToForm = () => {
		userKey.map((p) => setValue(p, userInfoData[p]))
	}

	// update thông tin người dùng
	const updateInfoUser = async (event) => {
		const formData = Object.assign({}, getValues())
		const formInfo = {
			formType: formType,
			auth: user.username,
			note: 'Profile',
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
		<Box className={classes.Profile}>
			<Grid container spacing={10} className='container-profile'>
				<Grid item xs={5} className='info-user'>
					<Typography variant="h4" className='title-profile'>Thông tin người dùng</Typography>
					<AppForm
						fields={formFields()}
						control={control}
						onGoSubmit={updateInfoUser}
						formType={formType}
					/>
				</Grid>
				<Grid item xs={7} className='orders-user'>
					<div className='row-title-order'>
						<Typography variant="h4" className='title-profile'>Lịch sử giao dịch</Typography>
						<div className='box-export-tool'>
							<DataGrid
								rows={dataExport}
								columns={columnExport}
								components={{
									Toolbar: CustomToolbar,
								}}
							/>
						</div>
					</div>
					<AppTable columns={ProfileOrderColumns} data={orderUser} isBtn={false} />
				</Grid>
			</Grid>

			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Box>
	);
}
