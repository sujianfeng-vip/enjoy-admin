/**
 * Created by sujianfeng on 2015/5/12 0012.
 */
function getCookie(objName) {// 获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for ( var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName)
            return unescape(temp[1]);
    }
    return null;
    //return window.localStorage.getItem(objName);
}

function setCookie(objName, objValue, objHours) { // 添加cookie
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) { // 为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
    //window.localStorage.setItem(objName, objValue);
}

function delCookie(objName) {// 删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(objName);
    if (cval != null)
        document.cookie = objName + "=" + cval + ";expires=" + exp.toGMTString();
    //window.localStorage.removeItem(objName);
}


