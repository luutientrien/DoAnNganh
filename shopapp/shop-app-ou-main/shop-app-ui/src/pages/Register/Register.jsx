import React, { useState } from 'react';
import {
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container,
	Box,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import cookies from 'react-cookies';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles } from "./Register-styles";
import { setAuthLS, LS_KEY } from "../../helpers/localStorage";
import { formFields, formAcc } from "./Register-const";
import { useForm } from "react-hook-form";
import {
	AppTable,
	AppInput,
	AppForm,
	AppSearch,
	AppAlert,
} from '../../components';
import { PublicRoutes } from '../../routes/public-route';
import { infoRequest } from '../../helpers/utils';
import { ProtectPaths } from '../../routes/protect-route';

export default function Register() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);
	const { control, setValue, getValues } = useForm();

	const signInSucess = (role) => {
		setAuthLS(LS_KEY.AUTH_TOKEN, role);
	}

	const register = async (event) => {
		const formData = Object.assign({}, getValues())
		const formInfo = {
			formType: 'insert',
			auth: formData.username,
			note: 'Register',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.post(endpoints['register'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Thông tin bị sai!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Tạo tài khoản thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					history.push(PublicRoutes.Login)
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

	// xử lý sự kiện đóng thông báo
	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlert(false);
			if (alertInfo.typeAlert.success) {
				window.location.reload();
			}
		}
	};

	return (
		<Container className={classes.Register}>
			<Box className='box-login'>
				<Box>
					<Typography variant="h4" className='title-register'>{PublicRoutes.Register.label}</Typography>
				</Box>

				{/* tìm kiếm */}
				<Grid container spacing={1}>
					<Grid item xs={5} className='box-acc'>
						<Typography variant="h5" className='title-register'>Tài khoản</Typography>
						<AppForm
							fields={formAcc()}
							control={control}
							onGoSubmit={register}
							formType={'register'}
						/>
					</Grid>
					<Grid item xs={6} className='box-info'>
						<AppForm
							fields={formFields()}
							control={control}
							onGoSubmit={register}
							formType={''}
						/>
					</Grid>
				</Grid>

			</Box>

			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Container>
	);
}