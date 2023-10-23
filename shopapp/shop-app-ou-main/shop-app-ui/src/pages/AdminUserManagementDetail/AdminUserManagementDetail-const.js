import { optionsGen } from '../../helpers/utils'

export const userKey = [
	'user_id',
	'username',
	'name',
	'date_ob',
	'gen',
	'phone',
]

const optionsRole = [
	{ role_name: 'register', name: 'Người dùng' },
	{ role_name: 'manager', name: 'Nhân viên' },
]

export const formFields = (onChangeDatePicker, valueDatePicker, isCreate = false) => {
	let field = isCreate ? [
		{ id: 'role_name', label: { title: 'Quyền' }, xs: 5, component: { selectBox: true }, options: optionsRole, required: true, }
	]
		: [];
	return [
		{ id: 'username', label: { title: 'Tên tài khoản' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'password', label: { title: 'Mật khẩu' }, xs: 12, component: { textField: true }, required: true, type: 'password' },
		{ id: 'name', label: { title: 'Tên người dùng' }, xs: 12, component: { textField: true }, required: true, },
		{ id: 'gen', label: { title: 'Giới tính' }, xs: 5, component: { radio: true }, options: optionsGen, required: true },
		{ id: 'date_ob', label: { title: 'Ngày sinh' }, xs: 5, component: { datePicker: true }, required: true, onChangeDatePicker: onChangeDatePicker, value: valueDatePicker },
		...field,
		{ id: 'phone', label: { title: 'Số điện thoại' }, xs: 5, component: { textField: true }, type: 'number' },
	]
}

export const ProfileOrderColumns = [
	{
		id: "product_name",
		name: "Tên sản phẩm",
		width: 250,
	},
	{
		id: "total_qty",
		name: "Số lượng",
		width: 100,
		align: 'right'
	},
	{
		id: "total_price",
		name: "Tổng giá",
		width: 170,
		format: 'price',
		align: 'right'
	},
	{
		id: "update_date",
		name: "Ngày thực hiện",
		width: 130,
		format: 'date',
		align: 'center'
	},
]