import React, {Component} from "react"
// import Count from "./components/Count"
// 引入 容器组件 ---》向下找到 ui组件
import CountContainer from "./containers/CountContainer"
import store from "./components/redux/store"

// store 需要从父亲层 传入进来
export default class App extends Component{

    render(){
        return(
            <div>
                {/*给容器组件传递 store */}
                {/*可以在 index.jsx 全局嘛 ，用react-redux Provider 对所有需要 store 提供store*/}
                {/* <CountContainer store={store}/> */}
                <CountContainer />
            </div>
        )
    }
}