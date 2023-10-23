const { API_METHOD } = require("./_helper");

exports.APIS = [
	{ protected: false, name: "getOrderByUser", path: "getOrderByUser", method: API_METHOD.GET },
	{ protected: false, name: "getOrderInYear", path: "getOrderInYear", method: API_METHOD.GET },
];