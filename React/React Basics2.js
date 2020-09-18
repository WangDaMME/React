// React Basics 2.

// syntax
//{ xxx } 中写 javascript  eg. const name 是个变量 → {name} 让react知道是变量

// Babel compile 过程
//====================================//
const element = (
  <h1 className="greeting">Hello, world!</h1>
);

//Babel compiles JSX down to React.createElement() calls. Essentially it creates objects like this
// 内部帮你 call 了 React.createElement函数

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);


This happens in the run time
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};




//2. Rendering multiple components/elements
const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((num) =>
  <li>{num}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);


// 对于element 这个component h1是type， props 参数 property 内容 叫 children

//====================================//
