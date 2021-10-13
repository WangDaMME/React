import React, {Component} from "react"
import {connect} from "react-redux"; // 是个函数

import {nanoid} from "nanoid"
import {createAddPersonAction} from "../../components/redux/actions/person_action_creators"

// 让person 和count 组件互相展示 拿到 对方的信息
//UI 组件不暴露  不写default
class Person extends Component{

    addPerson =()=>{
        const name = this.nameNode.value
        const age = this.ageNode.value
        
        const personObj = {
            id: nanoid(),name, age
        }

        // console.log(personObj)
        this.props.jiaYiRen(personObj)
        // 细节上的事，把输入框清空
        this.nameNode.value =""
        this.ageNode.value =""
    }
    render(){
        return(
            <div>
                <h2>我是Person组件,上方组件求和为: {this.props.he}</h2>
                <input ref ={c =>this.nameNode=c} type="text" placeholder="输入名字"/>
                <input  ref ={c =>this.ageNode=c} type="text" placeholder="输入年龄"/>
                <button onClick={this.addPerson}>Add</button>
                <ul>
                    {
                        this.props.yiduiren.map( (p)=>{
                            return <li key = {p.id}>{p.name} ---{p.age}</li>
                        })
                    }
                </ul>

            </div>
        )
    }
}

//暴露 容器组件
export default connect(
    // *** state 是【总状态】***//
    state=>({yiduiren:state.rens, he:state.he}),//matchstateToProps映射状态 || ()是 返回对象 
    {jiaYiRen: createAddPersonAction} // matchdispatchTOpROPS 映射操作状态的方法 || 传给自己的UI组件了
    )(Person)
