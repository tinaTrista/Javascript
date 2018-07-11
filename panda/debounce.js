/*
函数防抖
如果方法多次触发，则把上次记录的延迟执行代码用clearTimeout清掉，重新开始
即累积多次触发的事件，只执行最后一次
---------------------------------------------*/
// 函数节流是指一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。
//  函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，
// 如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。


// 当用户滚动时被调用的函数
function foo() {
  console.log("抖动")
  document.getElementById("result").style.display= "block";
}

function debounce(fn, delay) {
  // 维护一个 timer
  let timer = null;
  return function() {
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    let context = this;
    let args = arguments;
    document.getElementById("result").style.display= "none";
    clearTimeout(timer); //清除未执行的代码，重置回初始化状态
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}


// 在 debounce 中包装我们的函数，过 2 秒触发一次
let elem = document.getElementById('container');
elem.addEventListener('scroll', debounce(foo, 400));
