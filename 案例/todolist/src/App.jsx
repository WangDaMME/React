import React, {Component} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import List from "./components/List";

import "./App.css"

/**
 * Header 和 List 是同级别的兄弟， 给 Header中 input框传递state， 暂时的知识，还实现不了 传递给 同级别.
 * 可以通过lca 父组件 ie.App.jsx 传递
 * 
 * 
 */
export default class App extends Component
{
 
 // 应该 用 对象保存, 字符串 ”吃饭“ ”睡觉“ ... 不知道有没有完成

  // 初始化状态
  state = { todos: [ // 数组形式
    {id:'001', name:'吃饭',isDone: true},
    {id:'002', name:'睡觉',isDone: true},
    {id:'003', name:'打游戏',isDone: true},
  ]

  }

  // 子传父 : 需要 父先传给子一个函数 通过props, 当子要 传数据时候，调用这个函数  --  用于添加一个todo

  addToDo =(todoObj)=>{
    //子传给父一个 todo对象

    //1. 获取原todos
    const {todos} = this.state;
    //2.前面追加一个todo
    const todos2 = [ todoObj, ...todos] 
    //3.更新状态
    this.setState({todos:  todos2})
  }

    
  render()
  {
    const {todos} = this.state;

    return(
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addToDo={this.addToDo}/> {/** 通过props 传递函数 等着被调用 */}
          <List todos = {todos} /> {/** props 接着 是根据第一个 todos, eg. a ={1},传了个1 ，是要接变量名a的 */}
          <Footer/>
        </div>
    </div>
    )
  }

}
