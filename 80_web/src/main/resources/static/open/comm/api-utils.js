

function apiCall(key, funcName, params, callback) {
    httpClient.postJson("/module/api-define-api/api-call", {key, funcName, params}, callback)
}


function queryDataset({datasetId, pageNo, pageSize, callback}) {
    httpClient.postJson("/module/report-run-api/queryDatasetPage", {datasetId, pageNo, pageSize}, callback)
}
