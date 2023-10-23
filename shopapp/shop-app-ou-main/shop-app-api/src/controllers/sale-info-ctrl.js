const { basicServ, saleServ } = require("../services");
const { createResponse } = require("./_helper");
const _ = require("lodash");

exports.getSaleInfoById = async (req, res) => {
    const tableName = req.baseUrl.replace("/api/", "");
    try {
        const ret = await saleServ.getSaleInfoById(tableName, req.query);

        return createResponse(res, ret);
    } catch (ex) {
        return createResponse(res, ex, false);
    }
};

exports.getSaleInfoList = async (req, res) => {
    const tableName = req.baseUrl.replace("/api/", "");
    try {
        const ret = await saleServ.getSaleInfoList(tableName, req.query);

        return createResponse(res, ret);
    } catch (ex) {
        return createResponse(res, ex, false);
    }
};