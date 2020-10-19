// 9. React Hook

// 1.0 class 的 state 写法

//useState returns:  a pair of Values [Current_State, Func_of_Update] 与 class comp 中 state.count, 和 this.setState 函数一样

class Example extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { count:0};
  }


  render()
  {
    return (
      <div>
        <p>Click the Button : {this.state.count} times </p>
        <button onClick ={ ()=> this.setState({count:this.state.count +1})}>  Click Me </button>
      </div>
    );
  }
}


//1.2 Mutiple states
function ExampleFunc()
{
  // Declaration
  const [count, setCount] = React.useState(12);  // 括号中是 初始值 only argument is initial state
  const [count2, setCount2] = React.useState(0);

  return(
    <div>
      <p>Click the Button : {count} times </p>
      <button onClick ={ ()=> setCount(count+1)},  ()=> setCount2(count2*2)}>  Click Me Hook </button>
      <p>Click the Button state_2 is : {count2} times </p>

    </div>
  );
}


ReactDOM.render(
  <ExampleFunc />,
  document.getElementById('root')
);


//1.1 func comp + Hook
function ExampleFunc()
{
  // Declaration
  const [count, setCount] = React.useState(12);  // 括号中是 初始值 only argument is initial state
  const [count2, setCount2] = React.useState(1);

  return(
    <div>
      <p>Click the Button : {count} times </p>
      <button onClick ={ ()=> {setCount(count+1);  setCount2(count2*2)} }>  Click Me Hook </button>
      <p>Click the Button state_2 is : {count2} times </p>

    </div>
  );
}


ReactDOM.render(
  <ExampleFunc />,
  document.getElementById('root')
);
