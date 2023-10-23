const { basicServ } = require("../services");
const { createResponse } = require("./_helper");
const _ = require("lodash");

exports.getPageProducts = async (req, res) => {
    try {
        const tableName = req.baseUrl.replace("/api/", "");
        const retCategorys = await basicServ.getAll('categorys', req.query);
        const retProducts = await basicServ.getPages(tableName, req.query);

        retProducts.rows.map((r) => {
            let find = retCategorys.rows.find(c => c.category_id === r.category_id);
            r.category_id = find.name;
        })
        return createResponse(res, retProducts);
    } catch (ex) {
        return createResponse(res, ex, false);
    }
};