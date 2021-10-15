// useEffect Hook： 相当于模拟生命周期 的 钩子函数
import React from "react"
import ReactDOM from "react-dom"

function Demo(){  //调用1+N次 （初始化 + render n 次）


    const [count, setCount]= React.useState(0); 
    const [name,setName] = React.useState('tom')

    function add(){
        setCount( count => {return count+1})
    }

    /**
    // 传两个参数
    React.useEffect( ()=>{
        console.log("@")
    },[count]);//监测  count 在挂载 和 count 值有改变的时候调用
    // [count,name] 就是 name 改变 也 监测

     */

    React.useEffect( ()=>{
        let timer = setInterval( ()=> setCount(count=>count+1),1000) //每1s +1

        //语法要求：函数的返回值 做收尾的工作
        return ()=>{clearInterval(timer)}
    },[])

    function changeName(){
        setName("jack")
    }

    //卸载组件
    function unMount(){
        ReactDOM.unmountComponentAtNode(document.getElementById("root"))
    }

    return (
        <div>
            <h2>当前求和为：{count}</h2>
            <h2>我的名字是: {name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
            <button onClick={unMount}>点我卸载组件</button>

        
        </div>
    )
}

export default Demo;