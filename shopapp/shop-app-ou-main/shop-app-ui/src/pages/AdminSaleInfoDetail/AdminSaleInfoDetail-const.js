export const saleInfoKey = [
	'sales_info_id',
	'product_id',
	'title',
	'content',
]

export const formFields = () => {
	return [
		{ id: 'title', label: { title: 'Tiêu đề bài viết' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'product_name', label: { title: 'Sản phẩm', }, xs: 8, component: { textField: true }, disabled: true },
		{ id: 'price', label: { title: 'Giá bán' }, xs: 5, component: { textField: true }, type: 'number', disabled: true },
		{ id: 'stored_qty', label: { title: 'Số lượng kho' }, xs: 5, component: { textField: true }, type: 'number', disabled: true },
		{ id: 'content', label: { title: 'Nội dung bài viết' }, xs: 12, component: { textField: true }, required: true, multiline: true, rows: 9, labelClass: { height: '208px' } },
	]
}

export const AdminProductColumns = [
	{
		id: "name",
		name: "Tên sản phẩm",
		width: 350,
	},
	{
		id: "price",
		name: "Giá bán",
		width: 120,
		align: 'right'
	},
	{
		id: "stored_qty",
		name: "Kho",
		width: 120,
		align: 'right'
	},
	{
		id: "category_id",
		name: "Loại hàng",
		width: 160,
		fillCategory: true,
		align: 'center'
	},
]