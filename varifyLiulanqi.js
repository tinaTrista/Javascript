/*判断浏览器类型*/
var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
if (isIE) {
  location = '/indexIE';
}

/*判断当前设备*/
var sUserAgent = navigator.userAgent;
var mobileAgents = ['Android', 'iPhone', 'Symbian', 'WindowsPhone', 'iPod', 'BlackBerry', 'Windows CE'];
var goUrl = 0;
for (var i = 0; i < mobileAgents.length; i++) {
  if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
    goUrl = 1;
    break;
  }
}

if (goUrl == 1) {
  location = '/static/mobile/index.html';
}
