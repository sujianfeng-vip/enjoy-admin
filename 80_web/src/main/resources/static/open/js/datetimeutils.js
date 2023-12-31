
//表单控件调用： 日期  -> 格式文本
function date2show(date){
	if (isEmptyStr(date) || date < 19011212)
		return '';
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

//表单控件调用： 日期时间  -> 格式文本
function datetime2show(date) {
	try {		
		if (isEmptyStr(date) || date <= emptyDateTime())
			return '';
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		return (y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d)
				+ ' ' + (hour < 10 ? ('0' + hour) : hour) + ':'
				+ (minute < 10 ? ('0' + minute) : minute) + ':' + (second < 10 ? ('0' + second)
				: second));
	} catch (e) {
		//alert('formatterDateTime:' + e.toLocaleString());
		return '';
	}

}

function datetime2long(date) {
	try {		
		if (isEmptyStr(date) || date < date2show('1911-12-01'))
			return '0';
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		return (y + (m < 10 ? ('0' + m) : m) + (d < 10 ? ('0' + d) : d)
				+ (hour < 10 ? ('0' + hour) : hour)
				+ (minute < 10 ? ('0' + minute) : minute) + (second < 10 ? ('0' + second) : second));
	} catch (e) {
		alert('datetime2long:' + e.toLocaleString());
		return '0';
	}

}

function date2int(date){
	try {		
		if (isEmptyStr(date) || date < show2date('1911-12-01'))
			return '0';
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();

		//return (y + (m < 10 ? ('0' + m) : m) + (d < 10 ? ('0' + d) : d));
		return (y + '' + (m < 10 ? ('0' + m) : m) + '' + (d < 10 ? ('0' + d) : d));
	} catch (e) {
		alert('date2int:' + e.toLocaleString());
		return '0';
	}	
}

function show2int(s){
	var date = show2date(s);
	return date2int(date); 
}


//将14位日期字符串（yyyyMMddhhmmss）转换为格式化日期时间格式
function long2show(value, rowData, rowIndex) {
	var s = value;
  if(isEmptyStr(s) || s.length != 14 || !isNumber(s)) {
      return '';
  }
  if (s <= empty14DateTimeStr())
  	return '';
	var year = s.substr(0, 4);
	var month = s.substr(4, 2);
	var day = s.substr(6, 2);
	var hour = s.substr(8, 2);
	var minute = s.substr(10, 2);
	var second = s.substr(12);
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}


/**
* 将14位日期字符串（yyyyMMddhhmmss）转换为日期时间
* @param s
* @returns {datetime}
*/
function long2datetime(value, rowData, rowIndex) {
	try {
	    if(isEmptyStr(value) || value.length != 14 || !isNumber(value) || value <= empty14DateTimeStr()) {
	        return emptyDateTime();
	    }
		var y = value.substr(0, 4);
		var m = value.substr(4, 2);
		var d = value.substr(6, 2);
		var h = value.substr(8, 2);
		var t = value.substr(10, 2);
		var s = value.substr(12);
	    return new Date(y,m,d,h,t,s);
	} catch (e) {
		alert("p14DateTime:" + e.toLocaleString());
	}

}

function intDate2show(iDate) {
	if (typeof(iDate) === "number") {
		var year = Math.round(iDate / 10000)
		var month = Math.round(iDate % 10000 / 100)
		var day = Math.round(iDate % 100);
		return year + (month > 9 ? "-" : "-0") + month + (day > 9 ? "-" : "-0") + day;
	}
	return intDate2show(parseInt(iDate))
}


/**
 * Grid列调用: 将12位日期字符串（yyyyMMddhhmm）转换为格式化日期字符串（yyyy-MM-dd hh:mm）
 * @param s
 * @returns {String}
 */
function long2show12(value, rowData, rowIndex) {
	var s = value;
    if(isEmptyStr(s) || s.length != 14 || !isNumber(s)) {
        return '';
    }
    if (s < empty14DateTimeStr())
    	return '';
	var year = s.substr(0, 4);
	var month = s.substr(4, 2);
	var day = s.substr(6, 2);
	var hour = s.substr(8, 2);
	var minute = s.substr(10, 2);
	//var second = s.substr(12);
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}


//表单控件调用： 格式文本 -> 日期  
function show2date(s) {
	if (isEmptyStr(s))
		return emptyDateTime();
	var ss = s.split('-');
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new emptyDateTime();
	}
}

//表单控件调用： 格式文本 -> 日期时间
function show2datetime(s) {
	try {
		if (isEmptyStr(s) || s <= empty14DateTimeStr())
			return emptyDateTime();

		var aa = s.split(' ');

		var ymd = aa[0];
		var hms = aa[1];

		var ss = ymd.split('-');
		var y = parseInt(ss[0], 10);
		var m = parseInt(ss[1], 10);
		var d = parseInt(ss[2], 10);

		var zz = hms.split(':');
		var hour = parseInt(zz[0], 10);
		var minute = parseInt(zz[1], 10);
		var second = parseInt(zz[2], 10);

		if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(hour) && !isNaN(minute)
				&& !isNaN(second)) {
			return new Date(y, m - 1, d, hour, minute, second);
		} else {
			return emptyDateTime();
		}
	} catch (e) {
		alert('parserDateTime:' + e.toLocaleString());
		return new emptyDateTime();
	}
}

function emptyDateTime(){
	return new Date(1901,12,1);
}

function empty14DateTimeStr(){
	return '19011201000000';
}

function emptyDateStr(){
	return '19011201';
}

function emptyDateTimeStr(){
	return '1901-12-01 00:00:00';
}

//时间联动公用方法
function selectDate(selectId, startTimeId, endTimeId){
	var d = new Date();
	var dYear = d.getFullYear();
	var dMon = d.getMonth() + 1;
	var dDate = d.getDate();
	var dDay = d.getDay();
	$(startTimeId).datebox('setValue', dYear + "-" + dMon + "-" + dDate);
	$(endTimeId).datebox('setValue', dYear + "-" + dMon + "-" + dDate);
	//选中下拉项时自动填写日期范围
	$(selectId).combobox({
		onSelect: function (obj) {
			var lastDay = getDaysInMonth(d.getFullYear(), d.getMonth());
			var sComboboxValue = $(selectId).combobox('getValue');
			if (sComboboxValue == 0) {//当天
				$(startTimeId).datebox('setValue', dYear + "-" + dMon + "-" + dDate );
				$(endTimeId).datebox('setValue', dYear + "-" + dMon + "-" + dDate);
			}else if (sComboboxValue == 1) {//本周
				var start=new Date();
				var end=new Date();
				start.setDate(d.getDate()-dDay+1);
				end.setDate(d.getDate()-dDay+7);
				start = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
				end = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
				$(startTimeId).datebox('setValue', start);
				$(endTimeId).datebox('setValue', end);
			}
			/*else if (sComboboxValue == 1) {//本周
			 if (dDay == 0) {
			 $(startTimeId).datebox('setValue', dYear + "-" + dMon + "-" + (dDate - 6));
			 $(endTimeId).datebox('setValue', dYear + "-" + dMon + "-" + dDate);
			 } else if (dDay == 1) {
			 $(startTimeId).datebox('setValue', dYear + "-" + dMon + "-" + dDate);
			 $(endTimeId).datebox('setValue', dYear + "-" + dMon + "-" + (dDate + 6));
			 } else {
			 $(startTimeId).datebox('setValue', dYear + "-" + dMon + "-" + (dDate - dDay + 1));
			 $(endTimeId).datebox('setValue', dYear + "-" + dMon + "-" + (dDate + (7 - dDay)));
			 }

			 }*/ else if (sComboboxValue == 2) {//本月
				$(startTimeId).datebox('setValue', dYear + "-" + dMon + "-1");
				$(endTimeId).datebox('setValue', dYear + "-" + dMon + "-" + lastDay);
			} else if (sComboboxValue == 3) {//历史
				$(startTimeId).datebox('setValue', "");
				$(endTimeId).datebox('setValue', dYear + "-" + (dMon - 1) + "-" + getDaysInMonth(d.getFullYear(), d.getMonth() - 1));
			}
		}
	});
	//获取本月最后一天
	function getDaysInMonth(year, month) {
		month = parseInt(month, 10) + 1;
		var temp = new Date(year, month, 0);
		return temp.getDate();
	}
}

function f2(v){
	return v < 10 ? ('0'+v) : v;
}

/**
 * 取得倒计时
 */
function getDownTime(endDate){
	var result = {isPass: false}; //是否已过期
	var endDateValue = show2date(endDate).getTime();
	var totalSeconds = endDateValue - new Date().getTime();
	totalSeconds = totalSeconds / 1000;
	var days =  parseInt(totalSeconds / (24 * 3600));
	var hour = parseInt(totalSeconds / 3600 % 24);
	var minute = parseInt(totalSeconds / 60 % 60);
	var seconds = parseInt(totalSeconds % 60);
	result.days = days;
	result.hour = hour;
	result.minute = minute;
	result.seconds = seconds;
	if (totalSeconds < 0){
		result.isPass = true;
	}
	return result;
}

function getDiffIntDate(date, diff){
	var yesterday_milliseconds=date.getTime() + 1000*60*60*24 * diff;
	var yesterday = new Date();
	yesterday.setTime(yesterday_milliseconds);
	var year = yesterday.getFullYear();
	var day = yesterday.getDate();
	var month = yesterday.getMonth()+1;
	return year * 10000 + month * 100 + day;
}

function getDiffdateShow(date, diff){
	var intDate = getDiffIntDate(date, diff);
	return intDate2show(intDate);
}

function getYesterDayShow(){
	getDiffdateShow(new Date(), -1);
}

function timestamp2dateShow(timestamp) {
	const date = new Date(timestamp * 1000);
	return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}

function timestamp2dateTimeShow(timestamp) {
	const date = new Date(timestamp * 1000);
	return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}


function getDaysByMonth(year, month) {
	var days = 30;
	if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
		days = 31;
	}
	if (month == 2) {
		days = (year % 4 == 0 || Math.round(year / 100) == year / 100) ? 29 : 28;
	}
	return days
}

function yearMonth2between(yearMonth) {
	if (typeof(yearMonth) === "number") {
		var year = Math.round(yearMonth / 100)
		var month = yearMonth % 100
		var days = getDaysByMonth(year, month)
		var beginDate = intDate2show(year * 10000 + month * 100 + 1)
		var endDate = intDate2show(year * 10000 + month * 100 + days)
		return {beginDate, endDate}
	}
	return yearMonth2between(parseInt(yearMonth))
}