// useRef Hook： 用另一个 元素 用的东西 打记号 相当于"id“
import React from "react"
import ReactDOM from "react-dom"

function Demo(){  //调用1+N次 （初始化 + render n 次）


    const [count, setCount]= React.useState(0); 
    const [name,setName] = React.useState('tom');
    
    //refHook
    const myRef = React.useRef(); //容器方式 跟 class是createRef
    //show的回调
    function show(){
        alert(myRef.current.value)
    }

    function add(){
        setCount( count => {return count+1})
    }


    React.useEffect( ()=>{
        let timer = setInterval( ()=> setCount(count=>count+1),1000) //每1s +1

        return ()=>{clearInterval(timer)}
    },[])

    function changeName(){
        setName("jack")
    }

    function unMount(){
        ReactDOM.unmountComponentAtNode(document.getElementById("root"))
    }

    

    return (
        <div>
            <input type="text" ref={myRef}/>
            <h2>当前求和为：{count}</h2>
            <h2>我的名字是: {name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
            <button onClick={unMount}>点我卸载组件</button>
            <button onClick={show}>点击提示数据</button>

        
        </div>
    )
}

export default Demo;