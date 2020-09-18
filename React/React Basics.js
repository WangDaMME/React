// 1.Destructing 通过析构表达式的右边值来同时对左边的多个值进行赋值
// Array
let [a,b,c] = [1,2]; //赋值时 可以省略 一些属性

console.log(a);
console.log(b);
console.log(c);

// Object
let {name,age} = {age:12, name:"tom"};
console.log(name);
console.log(age);

// spread operation
[a, b, ...rest] = [10, 20, 30, 40, 50]; // expected output: Array [30,40,50]

let arr1 =[5,6,7];
console.log(arr1);
[a, b] =[arr1[0],arr1[1]];
console.log(a);
console.log(b);
console.log(arr1);

//used to parse param in function

function fn([a,b])
{
	console.log(a+b);
}

fn([1,2,3,4])


// 2. Defualt Param & Rest param ...
//2.1设置 Defualt Param
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5, 2));
// expected output: 10

console.log(multiply(5));
// expected output: 5


//2.2设置 Rest Param
// 注意 1，2，3 都是 单个 param 传进来, reduce对 array用的，
// 能把不确定个数的params 打包成 ‘params array’处理

function sum(...theArgs) {
  return theArgs.reduce((accumu, cur) => {
    return accumu + cur;
  });
}
console.log(sum(1, 2, 3));
// expected output: 6

console.log(sum(1, 2, 3, 4));
// expected output: 10



//3.spread
arr1=[4,5,6]
arr2=[1,2,3]

let arr = [...arr1,...arr2]
console.log(arr)

const obj1 = {foo: 'bar', x:42};
const obj2 = {foo: 'brz', x:100, 'asd':123};

const clonedObj1 = {...obj1}; // clone
const mergedObj = {...obj1,...obj2}; // merge


console.log(clonedObj1);
console.log(mergedObj); // merge 同名更改 没有的添加

//4. arrow function
let f = (a, b) => a + b;
console.log(f(1,2)) //3


// 可以不写（）
let foo =a =>
{
	a++;
    console.log(a)
}

foo(1)

// Usages 匿名函数 的绑定
let arr=[3,5,1,2,8]

let arr2 = arr.map( a=>a * 2) // map 是对 每一个 element 操作一次
console.log(arr2)
// 等价于
let arr2 = arr.map(function(a) {return a*2}) // 匿名的嘛 没有名字


// Usage2, 绑定this
function fn()
{
	console.log('fn是:', this);

  	// run 这个value = void 匿名函数
     const run = ()=>
     {
     	console.log(this)
         console.log(this.a)
     }

     run(); // 函数调用
}

let item1={a:1, fn:fn}
item1.fn();

// 单写是 window的this
//console.log(this)
//> [object Window]




// 绑定 两个this 都是调用function 的object的this
// > "fn是" Object { a: 1, fn: function fn()
// {
// 	console.log('fn是', this);
//
//   	// run 这个value = void 匿名函数
//      const run = ()=>
//      {
//      	console.log(this)
//          console.log(this.a)
//      }
//
//      run(); // 函数调用
// } }
// > Object { a: 1, fn: function fn()
// {
// 	console.log('fn是', this);
//
//   	// run 这个value = void 匿名函数
//      const run = ()=>
//      {
//      	console.log(this)
//          console.log(this.a)
//      }
//
//      run(); // 函数调用
// } }
// > 1
let item2 = {
a : 100,
fn : fn
}

//item1.fn();
item2.fn();



function fn() {
console.log('fn 调用对象的 ' ,this);


function run() {
  //这里的this 还是window 的 没有绑定上
   console.log(this);
}
run();
}

let item1 = {
a : 1,
fn : fn
}
let item2 = {
a : 100,
fn : fn
}


item1.fn(); //?
item2.fn(); //?

//4. TemplateString 模板字符串   -- backtick ``
// 现在写法更为简单 :  `string text ${expression 运算}`
function hello(a,b)
{
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);
}

hello(1,2)


// 等价于
function hello(a,b){
console.log('Fifteen is ' + (a + b) + ' and not ' + (2 * a + b) + '.');
};

hello(1,2)  //"Fifteen is 3 and not 4."






// 其他

// reduce 用累加器 和 array种每个元素 (从左--》右) 应用 于一个函数， 将其减少为单个值
// 有点 像"累加""的以西
// array.reduce(function(accumulator, currentValue, currentIndex, array), initialValue)；
// accumulator：上一次调用回调返回的值，或者是提供的初始值（initialValue）
// currentValue：数组中正在处理的元素
// currentIndex：数据中正在处理的元素索引，如果提供了 initialValue ，从0开始；否则从1开始
// array： 调用 reduce 的数组
//
// initialValue：可选项(optional)，其值用于第一次调用 callback 的第一个参数。如果没有设置初始值，则将数组中的第一个元素作为初始值。

//callback	accumulator	currentValue	currentIndex	array	return value
// first call	0	1	1	[0,1,2,3,4]	1
// second call	1	2	2	[0,1,2,3,4]	3
// third call	3	3	3	[0,1,2,3,4]	6
// fourth call	6	4	4	[0,1,2,3,4]	10

//***********
// eg1. 求和  let arr1=[0, 1, 2, 3, 4];
//
// let res=arr1.reduce((accumulator,currentValue,currentIndex,array) =>{return accumulator + currentValue})
// console.log(res) //10
//***********

//eg2. 求最大值
// var res = [1,2,6,4,5].reduce((pre, curr) => {
//     return curr > pre ? curr : pre;
//     //return Math.max(pre,curr);
// });


//eg3. 二维 降到1维度

// var flattened = [[0, 1], [2, 3], [4, 5]].reduce((a, b) => {
//     return a.concat(b);
// });
// > Array [0, 1, 2, 3, 4, 5]
