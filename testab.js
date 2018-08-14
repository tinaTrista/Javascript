

//异步加载
import('./test.json').then((res)=>{
  console.log(res);
})

//同步加载
let res1 = require('./test.json');
