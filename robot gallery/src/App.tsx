import React , {useEffect, useState} from 'react';
import logo from './assests/images/logo.svg';
// import './App.css';
import styles from './App.module.css';
import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import RobotDiscount from './components/RobotDiscount';

import ShoppingCart from './components/ShoppingCart'



interface Props{

}

interface State{
  robotGallery: any[], // 列表类型
  count : number,
}


const App: React.FC = (props) =>
{
  const [count, setCount] =useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);  

  // set Loading Spinner
  const [loading, setLoading] = useState<boolean>(false);
  const [error,setError] = useState<String>();


  // useEffect // param1: func define
  useEffect( ()=>{
    document.title = `Click ${count} times`    
  }, [count]) ;  // monitor count didUpdate []:didMount,


  // async 和 useEffect返回值有冲突  需重新放进一个函数
  useEffect(  ()=>{

      //异步函数
      const fetchData = async ()=>{
        setLoading(true); //显示loading 字样

        try{
          const response = await fetch("https://jsonplaceholder.typicode.com/users");
          const data = await response.json();
          setRobotGallery(data);
  
        }
        catch (e)
        {
          setError(e.message)
        }
        
        setLoading(false);

      }
      //调用
      fetchData();
  },[])



  // useEffect( ()=>{
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //   .then(response => response.json())
  //   .then(data => setRobotGallery(data))
  // },[])

  return (

    <div className={styles.app}>
         <div className={styles.appHeader}>
           <img src={logo} className={styles.appLogo}  alt="logo"/>
          <h1> Robot Scheduler, waiting your call... </h1>
        </div>

    <button onClick={ ()=>{

      // Async setState hook only update once 
      // setCount(count+1)
      setCount(count+1)} } > Click
      </button>
      <span>Count: {count}</span>
      <ShoppingCart/>
      {/* 判断error */}
      {!error || error!==""  && <div>Website has Error: {error}</div>}
      {
        !loading?
        (
          <div className={styles.robotList}>
            {robotGallery.map( (r, index)=> 
            ( index%2==0 ?
              <RobotDiscount id={r.id} email={r.email} name={r.name}/>
              :
              <Robot id={r.id} email={r.email} name={r.name}/>

            )
            )}
          
          </div>
        )
        :
        <h2> loading In progress </h2>
      }
    </div>
  );
    
    
}


export default App;
