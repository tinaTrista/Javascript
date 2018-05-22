function parseLinklist() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementsByTagName('a')) return false;
  var list = document.getElementsByTagName('a');
  console.log(list)
  list[0].onmouseover = function() {
    console.log("xxx")
    moveElement('msg', 300, 500, 10);
  }
  list[1].onmouseover = function() {
    moveElement('msg', 200, 50, 10);
  }

}
function positionMsg() {
  if(!document.getElementById) return false
  if(!document.getElementById('msg')) return false;
  var ele = document.getElementById('msg');
  ele.style.position='absolute';
  ele.style.top = '200px';
  ele.style.left = '100px';
  //moveElement('msg', 500, 500, 10);
}

addloadEvent(positionMsg);
addloadEvent(parseLinklist);
function moveElement(element, final_l, final_t, interval) {
  if(!document.getElementById) return false
  if(!document.getElementById(element)) return false
  var ele = document.getElementById(element);
  if(ele.movement) {
    clearTimeout(ele.movement);
  }
  if(!ele.style.left) {
    ele.style.left = "0px";
  }
  if(!ele.style.top) {
    ele.style.top = "0px";
  }
  var left = parseInt(ele.style.left);
  var top = parseInt(ele.style.top);
  if(left === final_l && top === final_t) {
    return true;
  }
  if(left < final_l) left++;
  if(left > final_l) left--;
  if(top > final_t) top--;
  if(top < final_t) top++;
  ele.style.left = left+'px';
  ele.style.top = top+'px';
  var repeat = "moveElement('"+element+"',"+final_l+","+final_t+","+interval+")";
  ele.movement = setTimeout(repeat, interval)
}
