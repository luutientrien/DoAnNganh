const { basicServ, orderServ } = require("../services");
const { createResponse } = require("./_helper");
const _ = require("lodash");

exports.getOrderByUser = async (req, res) => {
	try {
		const tableName = req.baseUrl.replace("/api/", "");
		const ret = await orderServ.getOrderByUser(tableName, req.query);

		return createResponse(res, ret);
	} catch (ex) {
		return createResponse(res, ex, false);
	}
};

exports.getOrderInYear = async (req, res) => {
	try {
		const tableName = req.baseUrl.replace("/api/", "");
		const ret = await orderServ.getOrderInYear(tableName, req.query);

		return createResponse(res, ret);
	} catch (ex) {
		return createResponse(res, ex, false);
	}
};