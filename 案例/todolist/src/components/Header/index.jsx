import React, {Component} from "react"
import PropTypes from "prop-types"
import {nanoid} from "nanoid"
import "./index.css"

export default class Header extends Component
{
  //对 接收的参数 进行 类型&必要性 限制
  static propTypes = {

    addToDo: PropTypes.func.isRequired, // 不是 function 
  }



  //绑定键盘的事件 要querry和正在操作的是 一个事件 不用ref
  handleKeyUp = (event)=>{

    if(event.keyCode !==13) return ; //13 ： 回车的keycode
    // console.log(event.target.value);
    //value 只是 输入框传进来的字符串  ！ 添加的 todo名字不能为空
    if(event.target.value.trim()==="")
    {
      alert("输入不能为空！");
      return ; // 别忘了  return 否则下面还做
    }
    const todoObj = {id:nanoid(), name:event.target.value, isDone: false}
    this.props.addToDo(todoObj); //通知 App 父亲 把这个 obj 拿到

    //清空输入
    event.target.value = ""; 
  }
  

  render()
  {
    return(
        
        <div className="todo-header">
            <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
        </div>
    )
  }

}
