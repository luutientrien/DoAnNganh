import {
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	Slide,
	useScrollTrigger,
	Button,
	Avatar,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { useHistory } from "react-router";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import { useStore } from "react-redux";
import cookies from 'react-cookies';
import { clearAuthLS } from '../../helpers/localStorage'
import { getAuthLS, LS_KEY } from '../../helpers/localStorage';
import { rolePaths } from '../../helpers/utils';
import { PublicPaths } from '../../routes/public-route'

export default function ({ classes, open, setOpen, mainRef }) {
	const trigger = useScrollTrigger({ target: mainRef });
	const history = useHistory();
	const store = useStore();

	let user = {};
	if (cookies.load("user") != null) {
		user = cookies.load("user")
	} else {
		user.username = null;
	};

	// const check = 'register';
	const check = getAuthLS(LS_KEY.AUTH_TOKEN)

	//   xử lý ẩn hiện btn drawer
	const hiddenBtn = (check) => {
		if (check === rolePaths.EMPLOYEE || check === rolePaths.ADMIN) {
			return (
				<div className="block-left">
					<IconButton
						size="small"
						className="menu-icon"
						onClick={() => setOpen((pre) => !pre)}
					>
						{open ? <ArrowBackIosIcon /> : <MenuIcon />}
					</IconButton>

					<Button>
						{user.role_name === rolePaths.ADMIN ?
							<Typography variant="h5" noWrap className="logo-text" onClick={() => handleClick('/Admin')}>
								TIẾN TRIỂN STORE
							</Typography> :
							<Typography variant="h5" noWrap className="logo-text" onClick={() => handleClick('/Admin/AdminProduct')}>
								TIẾN TRIỂN STORE
							</Typography>
						}
					</Button>
				</div>
			);
		} else
			return (
				<div className="block-left">
					<Button>
						<Typography variant="h5" noWrap className="logo-text" onClick={() => handleClick('/')}>
						TIẾN TRIỂN STORE
						</Typography>
					</Button>
				</div >
			);
	}

	// chọn đăng xuất
	const handleLogout_click = () => {
		cookies.remove("user");
		clearAuthLS();
		window.location.reload();
	};

	// chuyển trang khi chọn đăng nhập
	const handleClick = (path) => {
		history.push(path);
	}
	let userComponet = useMemo(() => {
		if (user.username) {
			if (user.role_name === rolePaths.CUSTOMER) {
				return (
					<>
						<Button onClick={() => handleClick('/Profile')}>
							-- {user.username} --
						</Button>
						<Button onClick={handleLogout_click}> <Typography variant="subtitle1" style={{ textTransform: 'none' }}>Đăng xuất</Typography> </Button>
					</>
				)
			} else if (user.role_name === rolePaths.EMPLOYEE) {
				return (
					<>
						<Button onClick={() => handleClick('/Admin/AdminProduct')}>
							-- {user.username} --
						</Button>
						<Button onClick={handleLogout_click}> <Typography variant="subtitle1" style={{ textTransform: 'none' }}>Đăng xuất</Typography> </Button>
					</>
				)
			} else
				return (
					<>
						<Button onClick={() => handleClick('/Admin')}>
							-- {user.username} --
						</Button>
						<Button onClick={handleLogout_click}> <Typography variant="subtitle1" style={{ textTransform: 'none' }}>Đăng xuất</Typography> </Button>
					</>
				)
		} else {
			return (
				<>
					<Button onClick={() => handleClick('/Login')} > <Typography variant="subtitle1" style={{ textTransform: 'none' }}>Đăng nhập</Typography> </Button>
					<Button onClick={() => handleClick('/Register')} > <Typography variant="subtitle1" style={{ textTransform: 'none' }}>Đăng Ký</Typography> </Button>
				</>
			)
		}

	}, [user.username])

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					{hiddenBtn(check)}

					<div className="block-right " >
						{userComponet}
					</div>
				</Toolbar>
			</AppBar>
		</Slide>
	);
}