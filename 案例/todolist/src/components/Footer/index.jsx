import React, {Component} from "react"
import "./index.css"

/** 
 * Footer 功能 
 * 1. 显示已完成 0/ 总共 ： 看有多少个 item done值 = true
 * 2. 清除所有打勾的
 * */ 
export default class Footer extends Component
{

  //全选checkbox 的回调
  handleCheckAll = (event)=>{
    this.props.checkAllToDo(event.target.checked);
  }

  //清除 所有已经完成的
  handleClearAllDone = ()=>{
    this.props.clearAllDoneToDo();
  }

  render()
  {

    const {todos} = this.props;

    const doneCount = todos.reduce( (prevValue, currentValue)=>{ return prevValue + (currentValue.isDone ? 1:0 )   }, 0); // 初始值为0 ，已完成的 pre 上1次的返回值  currentValue 就是todo_item
    const total = todos.length; // 总数



    return(
        <div className="todo-footer">
            <label>
              <input type="checkbox" onChange = {this.handleCheckAll} checked = {doneCount===total && total!==0} /> {/**defaultchecked 只在第一次起作用 ， onChange是 checked 要求的*/}
            </label>
            <span>
            <span>已完成{doneCount}</span> / 全部{total}
            </span>
            <button className="btn btn-danger" onClick = {this.handleClearAllDone}>清除已完成任务</button>
      </div>
    )
  }

}
