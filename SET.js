const s = new Set();
const array = [2, 3, 5, 4, 5, 2, 2];
array.forEach(x => s.add(x));
for (let i of s) {
    console.log(i);
}
