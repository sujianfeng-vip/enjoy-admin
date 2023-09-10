function ajaxCall(obj) {
    var token = window.localStorage.getItem(getApiTokenKeyName()) || "";
    obj.url = getApiContextPath() + obj.url;
    obj.beforeSend = function(request){
        showLoading();
        request.setRequestHeader(getApiTokenKeyName(), token || "");
    };
    obj.complete = function(){
        hideLoading();
    };
    obj.error = function(data, textstatus){
        if (data){
            var errorInfo;
            if (data.statusText === 'ok'){
                errorInfo = cStr(data.responseText);
            }else if (data.statusText === 'Not Found'){
                errorInfo = '此请求地址[' + obj.url + ']无效:';
            }else{
                errorInfo = cStr(data.responseText);
            }
            /*const maxMsgSize = 150;
            if (errorInfo.length > maxMsgSize){
                errorInfo = errorInfo.substr(0, maxMsgSize);
                errorInfo = '请求地址[' + obj.url + ']出错，错误信息:' + errorInfo;
                errorInfo += "...";
            }*/
            errorInfo = '请求地址[' + obj.url + ']出错，错误信息:\n' + errorInfo;
            if (errorInfo === ''){
                errorInfo = "请求服务器出错: " + textstatus;
            }
            alert(errorInfo);
        }
        hideLoading();
    };
    var oriSuccess = obj.success;
    obj.success = function(op){
        if (oriSuccess){
            if (typeof(op) === 'string'){
                oriSuccess(json2obj(op));
            }else{
                oriSuccess(op);
            }
        }
    };
    $.ajax(obj);
}

function showLoading(){

}

function hideLoading(){

}