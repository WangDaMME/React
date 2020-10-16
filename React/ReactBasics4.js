// React Basics 4


// State in Class

// 1.1
Class 写法

//  1. 要extends React.Component
//  2. 要有 render() {  return (jsx  )}； // 可以有constructor() 方法
//  3. props 改成 this.props

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}



// 1.2 加 State

// 1. Add constructor() {super(),  this.state = { ???? }  } 
// 2. this.props.date 变为this.state.date

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {date: new Date()};
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
