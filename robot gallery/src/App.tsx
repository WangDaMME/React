import React from 'react';
import logo from './assests/images/logo.svg';
// import './App.css';
import styles from './App.module.css';
import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import ShoppingCart from './components/ShoppingCart'

// XSS cross-site scripting
const html = "<img onerror='alert(\"Hacked!\") src='invalid-image'/>";
const jsHacked = "javascript: alert('Hacked!');"

interface Props{

}

interface State{
  robotGallery: any[], // 列表类型
  count : number,
}



// React 组件声明周期lifecycle
class App extends React.Component<Props,State> {


  constructor(props)
  {
    super(props);
    this.state = {
      robotGallery : [], // robot的 空列表
      count : 0
    }
  }

  //life cycle
  componentDidMount(){

    // promise 异步请求
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(  response => response.json()) //处理promise 需要.then 函数，处理的是http响应response 数据. .json是响应主体的数据
    .then( data => this.setState({robotGallery:data}))

  }

  
  render()
  {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo}  alt="logo"/>
          <h1> Robot Scheduler, waiting your call... </h1>
        </div>
        <button onClick={()=>{
          // this.setState({count:this.state.count+1}, ()=>{console.log("count ", this.state.count)});
             this.setState( (prevState, prevProps) =>{
               return {count: prevState.count+1}
             }, ()=>{
               console.log("count ", this.state.count);
             })

          // console.log("count ", this.state.count);
          }}>Click count</button>
        <span> count : {this.state.count}</span>
        <ShoppingCart />
      {/* <div>{html}</div>
      <a href={jsHacked}>My website</a>  */}
        <div className={styles.robotList}>
          {/* for loop to print robot, map function */}
          {/* {robots.map( r=> <Robot id={r.id} email={r.email} name={r.name}/>)} */}
          {this.state.robotGallery.map( (r)=> <Robot id={r.id} email={r.email} name={r.name}/>)}
        </div>
      </div>
    );
  }
  
}

export default App;
