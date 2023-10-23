export const formFields = () => {
	return [
		{ id: 'product_name', label: { title: 'Sản phẩm', }, xs: 12, component: { textField: true }, disabled: true },
		{ id: 'category_name', label: { title: 'Loại sản phẩm' }, xs: 9, component: { textField: true }, disabled: true },
		{ id: 'price', label: { title: 'Giá bán' }, xs: 9, component: { textField: true }, type: 'number', disabled: true },
		{ id: 'content', label: { title: 'Nội dung bài viết' }, xs: 12, component: { textField: true }, multiline: true, rows: 9, labelClass: { height: '208px' }, disabled: true },
	]
}