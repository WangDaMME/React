import React, {Component} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import List from "./components/List";

import "./App.css"
import { element } from "prop-types";

/**
 * Header 和 List 是同级别的兄弟， 给 Header中 input框传递state， 暂时的知识，还实现不了 传递给 同级别.
 * 可以通过lca 父组件 ie.App.jsx 传递
 * 
 * 
 */

// 状态在哪里， 操作状态的方法 就在哪里
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


  //【祖孙关系】 从Item 里得到有没有勾选
  //     用于更新一个todo对象
  updateToDo = (id, isDone)=>{ //更改的人 是谁， 到底完成没完成

    // 获取状态中的todos, 返回新的todos
    const {todos} = this.state;
   const todos2 =  todos.map( (element) =>{
      if(element.id === id) 
      {
        return {...element, isDone} //就是原来 原封不动， 只改isDone
      }
      else return element;
    }) 

    this.setState({todos: todos2})

  }

  //删除一个todo
  deleteToDo = (id) =>{
    const {todos} = this.state;
    //删除指定id的todo 对象
    const todos2 = todos.filter( (element) =>{
      return element.id !==id; // 不是相同id 的给人家 返回， ==id 的 过滤掉
    })

    this.setState( { todos : todos2})
  }

  //全选的 todo
  checkAllToDo = (isDone) =>{
    const {todos} = this.state;

    const todos2 = todos.map( (element) =>{
      return {...element, isDone};//把所有isDone 属性改为true  设置成true 就是 只能全选， 不能全取消
    })

    this.setState( { todos : todos2}) // 更新状态
  }

  //清除所有已经完成的 todo_items
  clearAllDoneToDo = ()=>{

    const {todos} = this.state;

    const todos2 = todos.filter( (element)=>{
      return !element.isDone; //===false; //清除 已经完成的
    })
    this.setState( { todos : todos2}) // 更新状态

  }
    
  render()
  {
    const {todos} = this.state;

    return(
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addToDo={this.addToDo}/> {/** 通过props 传递函数 等着被调用 */}
          <List   todos = {todos}   updateToDo = {this.updateToDo}  deleteToDo = {this.deleteToDo}/> {/** props 接着 是根据第一个 todos, eg. a ={1},传了个1 ，是要接变量名a的 ;   this 绑定*/}
          <Footer todos = {todos} checkAllToDo ={this.checkAllToDo} clearAllDoneToDo = {this.clearAllDoneToDo}/>
        </div>
    </div>
    )
  }

}
