/*
函数节流
定期触发事件
---------------------------------------------*/

// 当用户滚动时被调用的函数
function foo() {
  console.log("节流")
  document.getElementById("result").style.display= "block";
}
let timer = true;
function throttle(fn, delay) {
  // 维护一个 timer
  return function() {
    // this is important
    if(!timer) {
      document.getElementById("result").style.display= "none";
      return;
    }
    timer = false;
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    let context = this;
    let args = arguments;

    setTimeout(function() {
      fn.apply(context, args);
      timer = true
    }, delay);
  }
}


// 在 debounce 中包装我们的函数，过 2 秒触发一次
let elem = document.getElementById('container');
elem.addEventListener('scroll', throttle(foo, 400));
