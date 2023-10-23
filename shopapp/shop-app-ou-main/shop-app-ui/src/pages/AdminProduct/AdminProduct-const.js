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
	},
	{
		id: "update_by",
		name: "người thực hiện",
		width: 140,
		align: 'center'
	},
	{
		id: "created_date",
		name: "Ngày thực hiện",
		width: 140,
		format: 'date',
		align: 'center'
	},
	{
		id: "update_date",
		name: "Cập nhật",
		width: 140,
		format: 'date',
		align: 'center'
	},
]

export const formSearch = [
	{ id: 'name', label: 'Tên sản phẩm', xs: 3, component: { textField: true } },
]