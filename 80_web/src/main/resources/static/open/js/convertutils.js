//数据转换共用函数单元


/**
 * url参数转出json字符
 * @param s
 * @returns {String}
 */
function params2json(s) {
	return '{"' + s.replace(/=/ig, '":"').replace(/&/ig, '","') + '"}';
}

/**
 * js对象转出json字符串
 * @param o
 * @returns
 */
function obj2json(o) { 
	return JSON.stringify(o);
}

/**
 * js对象转为url参数
 * @param param
 * @param key
 * @returns
 */
function obj2params(param, key) {
	var paramStr = "";
	if (param instanceof String || param instanceof Number
			|| param instanceof Boolean) {
		paramStr += "&" + key + "=" + encodeURIComponent(param);
	} else { 
		$.each(param, function(i) {
			var k = key == null ? i : key
					+ (param instanceof Array ? "[" + i + "]" : "." + i);
			paramStr += '&' + obj2params(this, k);
		});
	}
	return paramStr.substr(1);
}

/**
 * url参数转未js对象
 * @param params
 */
function params2obj(params){
	var json = params2json(params); 
	var dataObj = $.parseJSON(json); 
	return dataObj;
}
 
/**
 * json文本转成js对象
 * @param json
 * @returns
 */
function json2obj(json){
	return $.parseJSON(json);
}


//单引号
function qStr(value){
	return "'" + value + "'";
}

//双引号
function qStr2(value){
	return "\"" + value + "\"";
}

function cStr(str){
	if (str == null)
		return "";
	return str + '';
}

function isInt(str){
    return /^\d+$/.test(str);
}

function cInt(str){
    if(!isInt(str)){
    	return 0;
	}
    return parseInt(str, 10);
}

function cBool(str){
	if (str == "true"){
		return true;
	}
	if (str == "1"){
		return true;
	}
	return false;
}

function cFloat(s){
	if (isEmptyStr(s)){
		return 0.0;
	}else{
		var ss = cStr(s);
		str = ss.replace(/,/g,"");
		return parseFloat(str);
	}
}

function isArray(obj){
	return Object.prototype.toString.call(obj) === '[object Array]'; 
}
