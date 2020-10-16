// React Basics 4
 // 注意state 绑定写法 this.state = { xx : intializa}

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
  constructor(props) {
    super(props);
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


//1.3 Update state
class Clock extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {date: new Date()};
  }

  // this.tick 是传进 setInterval 的匿名函数， 第2个param 时间间隔
  // 用this 绑定

  componentDidMount()
  {
    // 当 Clock component 安到dom tree里，让browser set up 一个timer to call tick() method
    this.timerID = setInterval( ()=>this.tick(), 1000 );//1 sec
  }

  //如果 ClockComponent removed from Dom. 执行 componentWillUnmount lifecycle
  componentWillUnmount()
  {
   clearInterval(this.timerID) ;
  }

  //在method里， setState()
  tick()
  {
    this.setState( {date: new Date()})

  }

  render()
  {
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


// 1.4 State 和Props  Update可以是Async


class Counter extends React.Component
{
  constructor(props)
  {
    super(props);
    // initialize state
    this.state = {count:0};   // 注意state 绑定写法 this.state = { xx : intializa}
  }

  //
  increase = () =>
  {
    this.setState( {count: this.state.count +1});
    this.setState( {count: this.state.count +1});
    this.setState( {count: this.state.count +1});
    /***** 结果  点击 多少次 都是 每次增长1    ******/
  }

  render()
  {
    return (
      <div>
        <button onClick ={this.increase}> inCrEaSe</button>
        {this.state.count}
        </div>


    );
  }

}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);


// 1.5 State 和Props  Update可以是Sync Form2
this.setState((prevState, prevProp) => ({count: prevState.count + 1}));

// 这样 每次成 3 增长



class Counter extends React.Component
{
  constructor(props)
  {
    super(props);
    // initialize state
    this.state = {count:0};
  }

  //
  increase = () =>
  {
    this.setState((prevState,prevProp)=>({count: prevState.count+1}));
    this.setState((prevState,prevProp)=>({count: prevState.count+1}));
    this.setState((prevState,prevProp)=>({count: prevState.count+1}));

  }

  render()
  {
    return (
      <div>
        <button onClick ={this.increase}> inCrEaSe</button>
        {this.state.count}
        </div>


    );
  }

}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);



//1.6 state updates are Merged
//this.setState({count}) leaves this.state.text intact, but completely replaces this.state.count.

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0, text: 'blank'};
  }

  updateCount = () => {
    this.setState({count: 1});
  }

  updateText = () => {
    this.setState({text: 'hello'});
  }

  render() {
    return (
      <>
        <div>
          <button onClick={this.updateCount}>update count</button>
          <button onClick={this.updateText}>update text</button>
        </div>
        <div>
          {this.state.count}
          {this.state.text}
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);



// 1.7 State Flows Down
// 一个state 是local encapsulated 只能被 该 component 所有
// 不过， 一个component 能 pass its state down as props to its children components
//date 是<Clock />  Comp 的state
// Clock 妈妈 通过在render()中调用 FormattedDate 子comp， 把state 通过props 传给 儿子 Formatted


这样formatDate 孩子comp 就具有了 <Clock /> parent Comp 能够 tick Clock 这个state  (连function都有 state了)





class Clock extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {date: new Date()};
  }

    componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });



  render()
  {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    )
  }
}

// 子Component
// props 中的date 来自 parent <Clock/>
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}




ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
