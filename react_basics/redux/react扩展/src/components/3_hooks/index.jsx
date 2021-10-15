//函数式 组件

import React from "react"

function Demo(){  //调用1+N次 （初始化 + render n 次）

    //【useState hook】
    // 数组的解构赋值 -- 初始化为0
    const [count, setCount]= React.useState(0); // 返回 数组 2个元素， 1 个状态，param2: 更新状态的方法
    //底层做了 处理 会把count 存到内存 
    function add(){
        // 第一种方式
        //setCount(count+1) ;
   
        //第2种方式 函数的形式
        setCount( count => {return count+1})
    }

    const [name,setName] = React.useState('tom')

    function changeName(){
        setName("jack")
    }

    return (
        <div>
            <h2>当前求和为：{count}</h2>
            <h2>我的名字是: {name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
        
        </div>
    )
}

export default Demo;