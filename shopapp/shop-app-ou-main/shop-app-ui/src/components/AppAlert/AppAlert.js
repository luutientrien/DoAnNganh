import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from './AppAlert.styles';
import moment from "moment";
import DeleteIcon from '@material-ui/icons/Delete';
import { ProtectRoutes } from '../../routes/protect-route';
import { useHistory } from 'react-router';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AppAlert({
	open = false,
	handleClose = () => { },
	typeAlert = {},
	label = ''
}) {
	const classes = useStyles();
	const { info, success, warning, error } = typeAlert;

	const RenderInput = (typeAlert = { info: false, success: false, warning: false, error: false }) => {
		return success && (
			<Alert onClose={handleClose} severity="success">{label}</Alert>
		)
			|| info && (
				<Alert severity="info">{label}</Alert>
			)
			|| warning && (
				<Alert severity="warning">{label}</Alert>
			)
			|| error && (
				<Alert severity="error">{label}</Alert>
			)
	}

	return (
		<div className={classes.AppAlert}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<RenderInput typeAlert={typeAlert} />
			</Snackbar>
		</div>
	);
}
