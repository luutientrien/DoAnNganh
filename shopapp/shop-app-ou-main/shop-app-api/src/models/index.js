// users[0] là tạo mới, users[1] là cập nhật
const users = [
	["username", "password", "name", "date_ob", "gen", "phone", "validationflag", "status_acc", "role_name", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
	["user_id", "username", "password", "name", "date_ob", "gen", "phone", "validationflag", "status_acc", "update_date", "update_by", "update_note"],
]

const products = [
	["category_id", "name", "description", "price", "stored_qty", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
	["product_id", "category_id", "name", "description", "price", "stored_qty", "validationflag", "update_date", "update_by", "update_note"],
]

const categorys = [
	["title", "content", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
	["category_id", "title", "content", "validationflag", "update_date", "update_by", "update_note"],
]

// const discount_codes = [
// 	["discount_codes", "category_id", "name", "used_time", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
// 	["discount_codes", "category_id", "name", "used_time", "validationflag", "update_date", "update_by", "update_note"],
// ]

const sales_infos = [
	["product_id", "title", "content", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
	["sales_info_id", "product_id", "title", "content", "validationflag", "update_date", "update_by", "update_note"],
]

// const sales_info_product = [
// 	["sales_info_id", "product_id", "content", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
// 	["sales_info_id", "product_id", "content", "validationflag", "update_date", "update_by", "update_note"],
// ]

const orders = [
	["user_id", "product_id", "total_qty", "total_price", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
	["order_id", "user_id", "product_id", "total_qty", "total_price", "validationflag", "update_date", "update_by", "update_note"],
]

// const order_detail = [
//   ["order_id", "product_id", "qty", "validationflag", "created_date", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
//   ["order_id", "product_id", "qty", "validationflag", "update_date", "update_date", "update_by", "update_note"],
// ]

// const import_products = [
//   ["import_product_id", "total_qty", "total_price", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
//   ["import_product_id", "total_qty", "total_price", "validationflag", "update_date", "update_by", "update_note"],
// ]

// const import_product_detail = [
//   ["import_product_id", "qty", "price_import", "validationflag", "created_date", "created_by", "created_note", "update_date", "update_by", "update_note"],
//   ["import_product_id", "qty", "price_import", "validationflag", "update_date", "update_by", "update_note"],
// ]

exports.models = {
	users,
	products,
	categorys,
	// discount_codes,
	sales_infos,
	// sales_info_product,
	orders,
	// order_detail,
	// import_products,
	// import_product_detail,
}