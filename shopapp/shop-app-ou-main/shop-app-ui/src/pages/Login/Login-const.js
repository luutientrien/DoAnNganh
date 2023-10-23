export const formFields = () => {
	return [
		{ id: 'username', label: { title: 'Tên đăng nhập' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'password', label: { title: 'Mật khẩu' }, xs: 12, component: { textField: true }, required: true, type: 'password' },
	]
}