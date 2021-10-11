import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import store from "./components/redux/store"


ReactDOM.render(<App/>, document.getElementById("root"))

//检测redux中 状态的改变如果redux的状态发生了改变，那么重新渲染App组件
store.subscribe( ()=>{
    ReactDOM.render(<App/>, document.getElementById("root"))

})