const _ = require("lodash");
const { MOMENT_DATE, parse2Str } = require("../utils/date");

exports.genSqlAll = ({ tableName }) => {
  return `
    SELECT *
    FROM ${tableName}
    ORDER BY update_date;
  `;
};

exports.genSqlPage = ({ tableName, offset, limit, where }) => {
  // exports.genSqlPage = ({ tableName, where }) => {
  let whereCmd = where ? `WHERE ${where}` : '';
  // let limit = 10, offset = 0;
  return `
    SELECT *
    FROM ${tableName}
    ${whereCmd}
    ORDER BY update_date desc, name;
  `;
  // return `
  //   SELECT *
  //   FROM [${tableName}]
  //   ${whereCmd}
  //   ORDER BY update_date, name
  //   OFFSET ${offset} ROWS
  //   FETCH NEXT ${limit} ROWS ONLY;
  // `;
};

exports.genSqlDetail = ({ tableName, where }) => {
  return `
    SELECT *
    FROM ${tableName}
    ${where}
  `;
};

exports.genSqlInsert = ({ tableName, columns, rows }) => {
  const values = rows
    .map(
      (row) =>
        `(${columns
          .map((col) => (!_.isNil(row[col]) ? `'${row[col]}'` : "NULL"))
          .join(",")})`
    )
    .join(",");
  return `
    INSERT INTO ${tableName} (${columns.join(",")})
    VALUES ${values}
  `;
};

exports.genSqlUpdate = ({ tableName, row }) => {
  const key_id = tableName.slice(0, -1) + '_id';
  let tempArr = Object.assign({}, row);
  delete tempArr[key_id];
  values = Object.keys(tempArr)
    .map((col) => `${col}=${!_.isNil(tempArr[col]) ? `'${tempArr[col]}'` : null}`)
    .join(",");

  return `
    UPDATE ${tableName}
    SET ${values}
    WHERE ${key_id}=${row[key_id] - 0}
  `;
};

exports.genSqlDelete = ({ tableName, id }) => {
  const key_id = tableName.slice(0, -1) + '_id';
  return `
    DELETE FROM ${tableName}
    WHERE ${key_id}=${id[key_id] - 0}
  `;
};
