const { API_METHOD } = require("./_helper");

exports.APIS = [
    { protected: false, name: "getSaleInfoById", path: "getSaleInfoById", method: API_METHOD.GET },
    { protected: false, name: "getSaleInfoList", path: "getSaleInfoList", method: API_METHOD.GET },
];