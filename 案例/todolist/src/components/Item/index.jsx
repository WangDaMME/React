import React, {Component} from "react"
import './index.css'

export default class Item extends Component
{

  // 1. 对item 绑定鼠标 移入事件 -- item条高亮 , 
  // 2. 对后面 button 区域绑定显示 删除按钮  ,进来 就不能再隐藏 (显示成 block) : none 隐藏s

  state = {
    mouse: false
  }

  // 【太典型了！！！】 人家要的是回调函数 -- 写成高阶函数
  handleMouse= (flag)=>{
    return () =>{
      this.setState({mouse: flag})
    }
  }

  //勾选 和 取消勾选某一个 todo 的 回调
  handleCheck = (id)=>{
    //同样写成高阶的形式
    return (event)=>{
      //不是拿 value 值， 是拿 checked 

      this.props.updateToDo(id, event.target.checked) ; //要 2 个参数， 哪个 被点成什么状态
    }
  }

  // 不用高阶的形式  -- 联系App 把 他删除掉
  handleDelete = (id)=>{
    //原生 confirm
    if(window.confirm("确定删除吗?"))
    {
      // 确定 返回 true
      this.props.deleteToDo(id)
    }

  }

  render()
  {
    const {id,name,isDone} = this.props;
    return(
        <li  style={{backgroundColor: this.state.mouse? '#ddd':'white'}} onMouseLeave = {this.handleMouse(false)} onMouseEnter = {this.handleMouse(true)} > {/** false 代表移出 */}
            <label>
                <input type="checkbox" checked={isDone}  onChange = {this.handleCheck(id)}/> {/**defaultChecked 也是1次执行 */}
                <span>{name}</span>
            </label>
            <button onClick = {()=> this.handleDelete(id) } className="btn btn-danger" style={{display:this.state.mouse? 'block':'none'}}>删除</button>
        </li>
    )
  }

}
