import React, {Component} from "react"
import List from "./components/List"
import Search from "./components/Search"

export default class App extends Component
{
  // list 的 4 种不同的展示， 1. 头像list 2.欢迎词 3.loading 4.github服务器坏了.. 报错
  state = {
    users: [] , // 初始化状态
    isFirst: true, // 是否为第一次打开页面
    isLoading: false, // 标识是否处于加载中
    err: '', //存储请求相关的错误信息

  }

  //子 传父 (更新app状态)
  updateAppState = (stateObj) =>{
    this.setState(stateObj)
  }


  // 父 传子： 交给list 做展示
  render(){
    return (
      <div className="container">
        <Search saveUsers={this.updateAppState}/>
        {/* 批量传递 */}
        <List users={...this.state} />
      </div>
    )
  }
}