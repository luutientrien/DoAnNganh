import HomeIcon from "@material-ui/icons/Home";

import PageLogin from "../pages/Login/Login";
import PageRegister from "../pages/Register";
import PageHome from "../pages/Home";
import PageSaleInfoDetail from "../pages/SaleInfoDetail";
import PageProfile from "../pages/Profile";

const NEDRoutes = {
	New: "new",
	Detail: ":id"
}

// tên route cho từng view
export const PublicRouteNames = {
	Login: 'Login',
	Register: 'Register',
	Home: 'Home',
	SaleInfoDetail: 'SaleInfoDetail',
	Profile: 'Profile',
}

// đường dẫn chỉ đến view
export const PublicPaths = {
	Login: ['', PublicRouteNames.Login].join('/'),
	Register: ['', PublicRouteNames.Register].join('/'),
	Home: '/',
	SaleInfoDetail: ['', PublicRouteNames.SaleInfoDetail, NEDRoutes.Detail].join('/'),
	Profile: ['', PublicRouteNames.Profile].join('/'),
}

// thông tin cần thiết để hiển thị 1 view
export const PublicRoutes = {
	Login: {
		exact: true,
		id: PublicRouteNames.Login,
		label: "Đăng nhập",
		path: PublicPaths.Login,
		component: PageLogin,
	},
	Register: {
		exact: true,
		id: PublicRouteNames.Register,
		label: "Đăng ký tài khoản người dùng",
		path: PublicPaths.Register,
		component: PageRegister,
	},
	Home: {
		exact: true,
		id: PublicRouteNames.Home,
		label: "Trang chủ",
		path: PublicPaths.Home,
		component: PageHome,
	},
	SaleInfoDetail: {
		exact: true,
		id: PublicRouteNames.SaleInfoDetail,
		label: "Thông tin sản phẩm",
		path: PublicPaths.SaleInfoDetail,
		component: PageSaleInfoDetail,
	},
	Profile: {
		exact: true,
		id: PublicRouteNames.Profile,
		label: "Thông tin sản phẩm",
		path: PublicPaths.Profile,
		component: PageProfile,
		isLogin: true,
	},
}
