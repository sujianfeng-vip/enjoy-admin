function WeixinClient(redirectUrl){
    this.redirectUrl = redirectUrl;
}

/**
 * 是否登录判断
 * @param callback
 */
function loginCheck(redirectUrl, callback){
    /*
    var debugUserId = "debugUser1";
    httpClient.get(getApiContextPath() + "/weixin/loginedDebugUser", {debugUserId: debugUserId}, function(op){
        if (!op.success){
            alert(op.message);
            return;
        }
        if (callback){
            var apiToken = op.data.apiToken;
            window.localStorage.setItem(getApiTokenKeyName(), apiToken);
            callback(op.data.weixinUser);
        }
    });
    */
    var debugUserId = getArgsFromCurrHref("debugUserId");
	//0.调试环境
    if (debugUserId == "" && window.location.href.indexOf("127.0.0.1") >= 0 || window.location.href.indexOf("localhost") >= 0 ){
        debugUserId = "debugUser1";
    }
	if (debugUserId != ""){
	    httpClient.get(getApiContextPath() + "/weixin/loginedDebugUser", {debugUserId: debugUserId}, function(op){
	        if (!op.success){
	            alert(op.message);
	            return;
	        }
	        if (allowLogin(op.data.permissions) && callback){
	            var apiToken = op.data.apiToken;
	            window.localStorage.setItem(getApiTokenKeyName(), apiToken);
	            callback(op.data.weixinUser, op.data.permissions);
	        }
	    });
	    return;
	}
    var apiToken = window.localStorage.getItem(getApiTokenKeyName());
    if (isEmptyStr(apiToken)){
        window.location.href = redirectUrl;
        return;
    }
    //3.已经存在API-TOKEN
    httpClient.get(getApiContextPath() + "/weixin/getCurrUser", {}, function(op){
        if (!op.success){
            if (op.message.indexOf("未登陆") >= 0 || op.message.indexOf("ApiToken已失效或不合法") >= 0){
                window.location.href = redirectUrl;
                return;
            }
            alert(op.message);
            return;
        }
        if (allowLogin(op.data.permissions) && callback){
            callback(op.data.weixinUser, op.data.permissions);
        }
    });
}

/**
 * 判断是否允许登录
 * @param permissions
 */
function allowLogin(permissions){
    if (permissions && permissions.allowLogin){
        return true;
    }
    //不允许登录时，跳转到提示没有权限的页面
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        window.location.href = getWebroot() + "/deny-access.html";
    }else {
        window.location.href = getWebroot() + "/deny-access.html";
    }
    return false;
}

WeixinClient.prototype.init = function(callback){
    var ME = this;
    var debugUserId = getArgsFromCurrHref("debugUserId");
    //0.调试环境
    if (debugUserId == "" && window.location.href.indexOf("127.0.0.1") >= 0 || window.location.href.indexOf("localhost") >= 0 ){
        debugUserId = "debugUser1";
    }
    if (debugUserId != ""){
        httpClient.get(getApiContextPath() + "/weixin/loginedDebugUser", {debugUserId: debugUserId}, function(op){
            if (!op.success){
                alert(op.message);
                return;
            }
            if (allowLogin(op.data.permissions) && callback){
                var apiToken = op.data.apiToken;
                window.localStorage.setItem(getApiTokenKeyName(), apiToken);
                callback(op.data.weixinUser, op.data.permissions);
            }
        });
        return;
    }
    //1.微信回调回来
    var code = getArgsFromCurrHref("code");
    var state =getArgsFromCurrHref("state");
    if (code !== ""){
        httpClient.get(getApiContextPath() + "/weixin/loginedWeixinUser", {code: code, state: state}, function(op){
            if (!op.success){
                if (op.message.indexOf("未登陆") >= 0 || op.message.indexOf("wechat") >= 0){
                    ME.redirectWeixin();
                    return;
                }
                alert(op.message);
                return;
            }
            var apiToken = op.data.apiToken;
            window.localStorage.setItem(getApiTokenKeyName(), apiToken);
            if (allowLogin(op.data.permissions) && callback){
                callback(op.data.weixinUser, op.data.permissions);
            }
        });
        return;
    }
    var apiToken = window.localStorage.getItem(getApiTokenKeyName());
    if (isEmptyStr(apiToken)){
        //2.首次登录
        ME.redirectWeixin();
        return;
    }
    var prodMode = (window.location.href.indexOf("login-wx-confirm") >= 0 || window.location.href.indexOf("get-verify-code") >=0) ? "prod" : "";
    //3.已经存在API-TOKEN
    httpClient.get(getApiContextPath() + "/weixin/getCurrUser?prodMode=" + prodMode, {}, function(op){
        if (!op.success){
            if (op.message.indexOf("未登陆") >= 0 || op.message.indexOf("ApiToken已失效或不合法") >= 0){
                ME.redirectWeixin();
                return;
            }
            alert(op.message);
            return;
        }
        if (allowLogin(op.data.permissions) && callback){
            callback(op.data.weixinUser, op.data.permissions);
        }
    });

};

WeixinClient.prototype.redirectWeixin = function(){
    var appid = "wxf5ce3658dd095308";
    var redirect_uri = encodeURIComponent(this.redirectUrl);
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=wxUserInfo&#wechat_redirect`;
};
