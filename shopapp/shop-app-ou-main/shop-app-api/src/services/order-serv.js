const _ = require("lodash");
const { basicAcs } = require("../database");
const { bcryptUtil } = require("../utils");
const basicServ = require("./basic-serv");
const {
	QueryTypes,
	db,
	createResult,
} = require("../database/db-access");

exports.getOrderByUser = async (tableName, params) => {
	const sql = `
		SELECT	O.*,
				P.name						AS product_name,
				P.price,
				U.name
		FROM	orders O
				LEFT OUTER JOIN products P
					ON	P.product_id		= O.product_id
				LEFT OUTER JOIN users U
					ON	U.user_id			= O.user_id
		WHERE	O.user_id = ${params.user_id}
		ORDER BY O.update_date DESC
		`

	try {
		const ret = await db.query(sql, { type: QueryTypes.SELECT });
		return ret;
	} catch (ex) {
		return createResult(null, ex);
	}
};

exports.getOrderInYear = async (tableName, params) => {
	const sql = `
			SELECT	COUNT(1)				AS COUNT_ORDER,
					MONTH(created_date)		AS MONTH_ORDER
			FROM	orders
			WHERE	YEAR(created_date) = ${params.year}
			GROUP BY MONTH(created_date)
			ORDER BY MONTH(created_date)
		`;
	try {
		const ret = await db.query(sql, { type: QueryTypes.SELECT });
		return ret;
	} catch (ex) {
		return createResult(null, ex);
	}
};