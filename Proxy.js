

/**
 * [createArray description]
 * @param  {[type]} array elements [description]
 * @return {[type]}  数组对象       [description]
 */
function createArray (...elements) {
  let handler = {
    get (target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };
  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
console.log(arr[-1]); // c


let validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    obj[prop] = value;// 对于满足条件的 age 属性以及其他属性，直接保存
  }
};

let person = new Proxy({}, validator);
person.age = 100;
person.age; // 100
person.age = 'young'; // 报错
person.age = 300; // 报错
