function HttpClient(){

}

let httpClient = new HttpClient();

HttpClient.prototype.get = function(url, data, success, complete){
    this.call(url, "get", "application/x-www-form-urlencoded", data, success, complete);
};

HttpClient.prototype.postJson = function(url, data, success, complete){
    this.call(url, "post", "application/json;charset=utf-8", JSON.stringify(data), success, complete);
};

HttpClient.prototype.postForm = function(url, data, success, complete){
    this.call(url, "post", "application/x-www-form-urlencoded", data, success, complete);
};

HttpClient.prototype.call = function(url, type, contentType, data, success, complete){
    var token = window.localStorage.getItem(getApiTokenKeyName()) || "";
    //url += url.indexOf("?") > 0 ? `&API-TOKEN=${token}` : `?API-TOKEN=${token}`;
    $.ajax({
        type: type,
        dataType:'json',
        url: url,
        data: data,
        contentType: contentType,
        /*xhrFields: {withCredentials: true},
        crossDomain: true, //支持跨域请求*/
        beforeSend: function(request){
            window.vue.$Loading.start();
            request.setRequestHeader(getApiTokenKeyName(), token || "");
            if (getEnvType() != "prod"){
                request.setRequestHeader("env", "test");
            }
        },
        success: function(op){
            if (!op.success && op.code === 3000) {
                //未登录直接跳转到登录
                if (window.parent) {
                    window.parent.location.href = "/login"
                    return
                }
                window.location.href = "/login"
                return
            }
            if (success){
                success(op);
            }
        },
        complete: function(request){
            if (complete){
                complete(request);
            }
            window.vue.$Loading.finish();
        },
        error: function(data){
            if (data){
                let errorInfo;
                if (data.statusText == 'ok'){
                    errorInfo = data.responseText;
                }else if (data.statusText == 'Not Found'){
                    errorInfo = '此请求地址[' + url + ']无效:';
                }else{
                    let detailErrorInfo = data.responseText || "";
                    var maxMsgSize = 150;
                    errorInfo = detailErrorInfo.substr(0, maxMsgSize);
                    detailErrorInfo = '请求地址[' + url + ']出错，错误信息:' + detailErrorInfo;
                    if (detailErrorInfo.length > maxMsgSize){
                        errorInfo += "...";
                    }
                }
                window.vue.$Notice.error({title: '接口错误', desc: errorInfo})
            }
            setTimeout(function (){
                window.vue.$Loading.error();
            }, 100)
        }
    });
};