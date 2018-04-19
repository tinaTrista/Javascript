function ToolTip(el) {
  // 初始化
  this.tip = null
  var that = this
  el.onmouseenter = function() {
    that.showTip(el, el.getAttribute('tipContent'))
  };
  el.onmouseleave = function() {
    setTimeout(function() {
      that.hideTip();
    }, 0);
  };
  this.hideTip = function() {
    //判断当前目标元素的tip元素的in属性，也就是判断鼠标是否在tip区域内
    if (this.tip && this.tip.getAttribute("in") != "true") {
      document.body.removeChild(this.tip);
      //将当前目标元素的tip元素置为null
      this.tip = null;
    }
  };

  this.showTip = function(el, html) {
    //如果当前目标元素的tip已经显示，返回，避免重复生成tip元素。
    if (this.tip) {
      return;
    }
    //获取目标元素坐标
    var elPos = getElementPos(el);
    //获取tip弹出位置
    var posi = el.getAttribute('posi') ? el.getAttribute('posi') : "top";

    //创建tip元素
    var tip = document.createElement("div");
    tip.className = 'tooltip';
    //创建箭头元素
    var arrow = document.createElement("div");
    arrow.className = 'tip-arrow ' + posi;
    //创建内容元素
    var content = document.createElement("div");
    content.className = 'tip-content ' + posi;
    //给tip元素添加箭头元素和内容元素
    tip.appendChild(content);
    tip.appendChild(arrow);
    content.innerHTML = html;
    //将tip元素添加到body，必须先将元素添加到body，后面的代码才会生效
    document.body.appendChild(tip);
    //根据不同弹出位置确定tip的坐标
    switch (posi) {
      case "top":
        {
          tip.style.top = (elPos.y - content.offsetHeight - 7) + 'px';
          tip.style.left = (elPos.x + el.offsetWidth / 2 - content.offsetWidth / 2) + 'px';
        }
        break;
      case "bottom":
        {
          tip.style.top = (elPos.y + el.offsetHeight) + 'px';
          tip.style.left = (elPos.x + el.offsetWidth / 2 - content.offsetWidth / 2) + 'px';
        }
        break;
      case "left":
        {
          tip.style.top = (elPos.y + el.offsetHeight / 2 - content.offsetHeight / 2) + 'px';
          tip.style.left = (elPos.x - content.offsetWidth - 7) + 'px';
        }
        break;
      case "right":
        {
          tip.style.top = (elPos.y + el.offsetHeight / 2 - content.offsetHeight / 2) + 'px';
          tip.style.left = (elPos.x + el.offsetWidth) + 'px';
        }
        break;
    }

    //当鼠标进入tip区域，将属性in设置为true
    tip.addEventListener("mouseenter", function() {
      tip.setAttribute("in", true);
    });
    //当鼠标离开tip区域，将属性in设置为false，同时隐藏tip
    tip.addEventListener("mouseleave", function() {
      tip.setAttribute("in", false);
      that.hideTip();
    });

    //将tip元素赋值给this，以判断当前目标元素是否已经拥有tip元素，同时在hide的时候判断当前需要移出的是哪个tip元素
    this.tip = tip;
  };
}



function getElementPos(el) {
  let _x = 0,
    _y = 0;
  do {
    _x += el.offsetLeft;
    _y += el.offsetTop;
  } while (el = el.offsetParent);
  return {
    x: _x,
    y: _y
  };
}
