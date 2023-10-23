import axios from 'axios';

export let endpoints = {
	'login': '/api/authenticate',
	'register': '/api/users/createUser',

	'admin/user': (params, page) => '/api/users/getPages' + `?page=${page || 1}` + params,
	'admin/user/id': (params) => '/api/users/detail' + `?user_id=${params}`,
	'admin/update-user': '/api/users/update',
	'admin/create-new-user': '/api/users/insert',
	'admin/delete-user': '/api/users/remove',

	'admin/product': (params, page) => '/api/products/getPageProducts' + `?page=${page || 1}` + params,
	'admin/product/id': (params) => '/api/products/detail' + `?product_id=${params}`,
	'admin/update-product': '/api/products/update',
	'admin/create-new-product': '/api/products/insert',
	'admin/delete-product': '/api/products/remove',

	'admin/sale-info': (params, page) => '/api/sales_infos/getSaleInfoList' + `?page=${page || 1}` + params,
	'admin/sale-info/id': (params) => '/api/sales_infos/getSaleInfoById' + `?sales_info_id=${params}`,
	'admin/update-sale': '/api/sales_infos/update',
	'admin/create-new-sale': '/api/sales_infos/insert',
	'admin/delete-sale-info': '/api/sales_infos/remove',

	'admin/order-by-user': (params) => '/api/orders/getOrderByUser' + `?user_id=${params}`,
	'admin/create-new-order': '/api/orders/insert',
	'admin/get-order-year': (params) => '/api/orders/getOrderInYear' + `?year=${params}`,

	'admin/category': '/api/categorys/getAll',
}

export default axios.create({
	baseURL: 'http://127.0.0.1:9000/',
})