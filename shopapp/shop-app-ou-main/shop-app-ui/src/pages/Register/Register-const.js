export const formAcc = () => {
	return [
		{ id: 'username', label: { title: 'Tên đăng nhập' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'password', label: { title: 'Mật khẩu' }, xs: 12, component: { textField: true }, required: true, type: 'password' },
	]
}

export const formFields = () => {
	return [
		{ id: 'name', label: { title: 'Tên người dùng' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'gen', label: { title: 'Giới tính' }, xs: 12, component: { radio: true }, required: true, },
		{ id: 'phone', label: { title: 'Điện thoại' }, xs: 9, component: { textField: true }, type: 'number' },
	]
}