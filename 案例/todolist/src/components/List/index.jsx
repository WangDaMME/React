import React, {Component} from "react"
import PropTypes from "prop-types"
import Item from "../Item"
import "./index.css"

export default class List extends Component
{
  //对 接收的参数 进行 类型&必要性 限制
  static propTypes = {

    todos: PropTypes.array.isRequired, 
    updateToDo: PropTypes.func.isRequired, // 不是 function 
    deleteToDo: PropTypes.func.isRequired,
  }

    
  render()
  {
    const {todos, updateToDo, deleteToDo} = this.props; //updateToDo 反手 交给儿子 Item

    return(
        <ul className="todo-main">
            {
                todos.map( (item)=>{
                    // return <Item key = {item.id} item={item} /> {/* 一样*/}
                    return <Item key = {item.id} {...item}  updateToDo = {updateToDo} deleteToDo={deleteToDo}/>; {/* 比用加this 前面destruct 拿出来了*/}

                })
            }
      </ul>
    )
  }

}
