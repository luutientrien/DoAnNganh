import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Avatar,
	Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ProtectRoutes } from "../../routes/protect-route"
import { useStore } from "react-redux";
import cookies from 'react-cookies';
import API, { endpoints } from '../../helpers/API';
import { getAuthLS, LS_KEY } from '../../helpers/localStorage';
import { rolePaths } from '../../helpers/utils';

export default function ({ classes, open }) {
	const check = getAuthLS(LS_KEY.AUTH_TOKEN)
	const loggedIn = getAuthLS(LS_KEY.AUTH_TOKEN) ? true : false;
	let checkAuth = false;

	const history = useHistory();

	const store = useStore();
	const auth = store.getState();
	let user = auth;
	if (cookies.load("user") != null) {
		user = cookies.load("user")
	};

	// xử lý hiện các mục tại thanh drawer
	const getDrawer = (loggedIn, check) => {
		if (user) {
			if (user.role_name === rolePaths.ADMIN) {
				let tempRoute = Object.values(ProtectRoutes);
				let tempArrDrawer = tempRoute.filter((d) => d.drawer === true)
				return tempArrDrawer;
			} else {
				let tempRoute = Object.values(ProtectRoutes);
				let tempArrDrawer = tempRoute.filter((d) => d.drawer === true && d.isAdmin !== true)
				return tempArrDrawer;
			}
		}
		return []
	}

	const [childDrawer, setChildDrawer] = React.useState(
		getDrawer(loggedIn, check)
	);
	const temp = Object.values(ProtectRoutes)
	// const [childDrawer, setChildDrawer] = React.useState(temp);
	// console.info(temp)


	// chọn avatar chuyển trang
	const handleGoProfile = (check, userId) => {
		if (check === rolePaths.ADMIN) {
			console.info('pass')
		}
		else {
			const _pathAPI = endpoints['user'] + endpoints['employee'] + `?id=${userId}`;
			API.get(_pathAPI).then(res => {
				const _pathPage = ProtectRoutes.EmployeeDetail.path.replace(":id", userId)
				history.push(_pathPage, {
					userId: res.data[0].id,
				})
			})
		}
	}

	// chọn mục trên drawer
	const handleItem_click = ({ id, path }) => {
		if (id === "back") {
			const latest = history.location.pathname.split("/").pop();
			history.replace(history.location.pathname.replace(`/${latest}`, ""));
		} else if (path) {
			history.push(path);
		} else {
			history.goBacK();
		}
	};

	return (
		<Drawer
			className={classes.drawer}
			anchor="left"
			variant="persistent"
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<Toolbar />
			<div className={classes.drawerContainer}>
				{/* {checkAuth ? (
					<div>
						<Avatar alt={user.username} className={classes.avatar} onClick={() => handleGoProfile(check, user.id)}
							src={user.avatar.includes('http://127.0.0.1:8000') ? user.avatar : `http://127.0.0.1:8000${user.avatar}`} />
						<div className={classes.role} >
							<Typography variant="body">{user.role}</Typography>
						</div>
					</div>
				) : (
					<div></div>
				)} */}

				<List>
					{childDrawer.map((route, idx) => {
						const icon = route.bigIcon ? (
							<route.bigIcon
								fill="#3f51b5"
								stroke="#3f51b5"
								width={24}
								height={24}
							/>
						) : (
							<route.icon color="primary" />
						);

						return (
							<div key={route.id + idx}>
								<ListItem button onClick={() => handleItem_click(route)} >
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={route.label} />
								</ListItem>
								<Divider />
							</div>
						);
					})}
				</List>
			</div>
		</Drawer>
	);

}

