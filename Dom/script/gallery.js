function showpic(whichpic) {
  var placeholder = document.getElementById('placeholder');
  if(!placeholder) return false;
  var href = whichpic.getAttribute('href');
  placeholder.setAttribute('src', href);
  var des = document.getElementById('description');
  if(des) {
    var title = whichpic.getAttribute('title')? whichpic.getAttribute('title'):'';
    des.firstChild.nodeValue = title;
  }
  return true;
}
function parseGallery() {
  // 检测dom操作是否可用
  if(!document.getElementById) return false;
  if(!document.getElementsByTagName) return false;
  // 检测是否存在图片库元素
  var gallery = document.getElementById('gallery');
  if(!gallery) return false;
  // 添加事件处理函数
  var alink = gallery.getElementsByTagName('a');
  for(var i =0; i < alink.length;i++) {
    alink[i].onclick = function() {
      showpic(this)
      return false;
    }
  }
}
function addloadEvent(func){
  var oldonload = window.onload;
  if (typeof window.onload !=='function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func()
    }
  }
}
function insertAfter(newel, targetel) {
  var parent = targetel.parentNode;
  if (parent.lastChild === targetel) {
    parent.appendChild(newel);
  } else {
    parent.insertBefore(newel, targetel.nextSlibing);
  }
}
function preparePlaceholder() {
  var img = document.createElement('img');
  img.setAttribute('src', './img/img.jpg');
  img.setAttribute('id', 'placeholder');
  img.setAttribute('alt', 'show image');
  var des = document.createElement('p');
  des.setAttribute('id', 'description');
  var text = document.createTextNode('choose an img');
  des.appendChild(text);
  var gallery = document.getElementById('gallery');
  insertAfter(img, gallery);
  insertAfter(des, img);
}

// 加载程序
addloadEvent(parseGallery);
addloadEvent(preparePlaceholder);
