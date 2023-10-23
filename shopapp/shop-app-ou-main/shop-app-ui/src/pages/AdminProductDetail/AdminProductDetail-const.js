export const productKey = [
	'product_id',
	'name',
	'price',
	'stored_qty',
	'category_id',
	'description',
]

export const formFields = (options) => {
	return [
		{ id: 'name', label: { title: 'Tên sản phẩm' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'price', label: { title: 'Giá bán' }, xs: 5, component: { textField: true }, required: true, type: 'number' },
		{ id: 'stored_qty', label: { title: 'Số lượng kho' }, xs: 5, component: { textField: true }, required: true, type: 'number' },
		{ id: 'category_id', label: { title: 'Loại', checkboxLabel: 'checkbox label option 3' }, xs: 5, component: { selectBox: true }, options: options, required: true },
		{ id: 'description', label: { title: 'Mô tả' }, xs: 12, component: { textField: true }, multiline: true, rows: 9, labelClass: { height: '208px' } },
	]
}