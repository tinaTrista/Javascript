let test1 = 'zookeeper';
let test2 = 'zooKeeper';
let re = test1.toLowerCase() > test2.toLowerCase() ? 1 : -1;
console.log(re);

// let test1 = 'ambari server';
// let test2 = 'ambari agent';
// let re = test1 > test2 ? 1 : -1;
// console.log(re);
function Trim(str) {
  return str.replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, "");
}
console.log(Trim('a bd  ', 'g'))
