export const AdminUserManagementColumns = [
	{
		id: "username",
		name: "Tên tài khoản",
		width: 170,
	},
	{
		id: "name",
		name: "Tên người dùng",
		width: 220,
	},
	{
		id: "gen",
		name: "Giới tính",
		width: 90,
		format: 'gen',
		align: 'center'
	},
	{
		id: "date_ob",
		name: "Ngày sinh",
		width: 110,
		format: 'date',
		align: 'center'
	},
	{
		id: "phone",
		name: "Số điện thoại",
		width: 120,
		align: 'center'
	},
	{
		id: "status_acc",
		name: "Trạng thái",
		width: 150,
		format: 'status',
		align: 'center'
	},
	{
		id: "update_date",
		name: "Ngày thực hiện",
		width: 130,
		format: 'date',
		align: 'center'
	},
	{
		id: "update_note",
		name: "Nội dung thực hiện",
		width: 220,
	},
]

export const formSearch = [
	{ id: 'name', label: 'Tên người dùng', xs: 3, component: { textField: true } },
	// { id: 'category_id', label: 'Phân loại sản phẩm', xs: 4, component: { selectBox: true }, items: PHAN_LOAI },
]