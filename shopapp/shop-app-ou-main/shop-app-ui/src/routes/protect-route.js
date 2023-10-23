import DashboardPage from "../pages/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from '@material-ui/icons/People';

import PageAdminUserManagement from "../pages/AdminUserManagement";
import PageAdminUserManagementDetail from "../pages/AdminUserManagementDetail";

import PageAdminProduct from "../pages/AdminProduct";
import PageAdminProductDetail from "../pages/AdminProductDetail";

import PageAdminSaleInfo from "../pages/AdminSaleInfo";
import PageAdminSaleInfoDetail from "../pages/AdminSaleInfoDetail";

import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import WorkIcon from '@material-ui/icons/Work';
import DescriptionIcon from '@material-ui/icons/Description';

const NEDRoutes = {
	New: "new",
	Detail: ":id"
}

// tên route cho từng view admin
export const ProtectRouteNames = {
	Dashboard: 'Admin',

	AdminUserManagement: 'AdminUserManagement',
	AdminUserManagementDetail: 'AdminUserManagementDetail',
	AdminUserManagementNews: 'AdminUserManagementNews',

	AdminProduct: 'AdminProduct',
	AdminProductDetail: 'AdminProductDetail',
	AdminProductNews: 'AdminProductNews',

	AdminSaleInfo: 'AdminSaleInfo',
	AdminSaleInfoDetail: 'AdminSaleInfoDetail',
	AdminSaleInfoNews: 'AdminSaleInfoNews',

}

// đường dẫn chỉ đến view admin
export const ProtectPaths = {
	Dashboard: '/Admin',

	AdminUserManagement: ['/Admin', ProtectRouteNames.AdminUserManagement].join('/'),
	AdminUserManagementDetail: ['/Admin', ProtectRouteNames.AdminUserManagementDetail, NEDRoutes.Detail].join('/'),
	AdminUserManagementNews: ['/Admin', ProtectRouteNames.AdminUserManagementNews, NEDRoutes.New].join('/'),

	AdminProduct: ['/Admin', ProtectRouteNames.AdminProduct].join('/'),
	AdminProductDetail: ['/Admin', ProtectRouteNames.AdminProductDetail, NEDRoutes.Detail].join('/'),
	AdminProductNews: ['/Admin', ProtectRouteNames.AdminProductNews, NEDRoutes.New].join('/'),

	AdminSaleInfo: ['/Admin', ProtectRouteNames.AdminSaleInfo].join('/'),
	AdminSaleInfoDetail: ['/Admin', ProtectRouteNames.AdminSaleInfoDetail, NEDRoutes.Detail].join('/'),
	AdminSaleInfoNews: ['/Admin', ProtectRouteNames.AdminSaleInfoNews, NEDRoutes.New].join('/'),
}

// thông tin cần thiết để hiển thị 1 view admin
export const ProtectRoutes = {
	Dashboard: {
		exact: true,
		id: ProtectRouteNames.Dashboard,
		label: "Trang quản trị",
		path: ProtectPaths.Dashboard,
		component: DashboardPage,
		icon: DashboardIcon,
		drawer: true,
		isAdmin: true,
	},
	// routes manager user view admin
	AdminUserManagement: {
		exact: true,
		id: ProtectRouteNames.AdminUserManagement,
		label: "Quản lý người dùng",
		path: ProtectPaths.AdminUserManagement,
		component: PageAdminUserManagement,
		icon: GroupIcon,
		drawer: true,
		isAdmin: true,
	},
	AdminUserManagementDetail: {
		exact: true,
		id: ProtectRouteNames.AdminUserManagementDetail,
		label: "Thông tin người dùng",
		path: ProtectPaths.AdminUserManagementDetail,
		component: PageAdminUserManagementDetail,
	},
	AdminUserManagementNews: {
		exact: true,
		id: ProtectRouteNames.AdminUserManagementNews,
		label: "Tạo mới người dùng",
		path: ProtectPaths.AdminUserManagementNews,
		component: PageAdminUserManagementDetail,
	},
	// routes product view admin
	AdminProduct: {
		exact: true,
		id: ProtectRouteNames.AdminProduct,
		label: "Quản lý sản phẩm",
		path: ProtectPaths.AdminProduct,
		component: PageAdminProduct,
		icon: WorkIcon,
		drawer: true,
	},
	AdminProductDetail: {
		exact: true,
		id: ProtectRouteNames.AdminProductDetail,
		label: "Thông tin sản phẩm",
		path: ProtectPaths.AdminProductDetail,
		component: PageAdminProductDetail,
	},
	AdminProductNews: {
		exact: true,
		id: ProtectRouteNames.AdminProductNews,
		label: "Tạo mới sản phẩm",
		path: ProtectPaths.AdminProductNews,
		component: PageAdminProductDetail,
	},
	// routes saleInfo view admin
	AdminSaleInfo: {
		exact: true,
		id: ProtectRouteNames.AdminSaleInfo,
		label: "Quản lý bài viết",
		path: ProtectPaths.AdminSaleInfo,
		component: PageAdminSaleInfo,
		icon: DescriptionIcon,
		drawer: true,
	},
	AdminSaleInfoDetail: {
		exact: true,
		id: ProtectRouteNames.AdminSaleInfoDetail,
		label: "Thông tin bài viết",
		path: ProtectPaths.AdminSaleInfoDetail,
		component: PageAdminSaleInfoDetail,
	},
	AdminSaleInfoNews: {
		exact: true,
		id: ProtectRouteNames.AdminSaleInfoNews,
		label: "Tạo mới bài viết",
		path: ProtectPaths.AdminSaleInfoNews,
		component: PageAdminSaleInfoDetail,
	},
}
