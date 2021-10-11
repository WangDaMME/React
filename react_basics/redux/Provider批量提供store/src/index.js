import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import store from "./components/redux/store"
import {Provider} from "react-redux"

// ReactDOM.render(<App/>, document.getElementById("root"))
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,document.getElementById("root"))



//[redux]
//检测redux中 状态的改变如果redux的状态发生了改变，那么重新渲染App组件

//[react-redux]
//react-redux 不用像redux 一样 在index.js 监测状态 ， 容器组件的 connect自动监测redux中的状态
// store.subscribe( ()=>{
//     ReactDOM.render(<App/>, document.getElementById("root"))

// })
/