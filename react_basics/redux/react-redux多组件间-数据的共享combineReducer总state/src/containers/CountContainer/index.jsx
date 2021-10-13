// 【整合ui组件 和 container组件】
//     最终暴露的是 容器组件

// import store from "../../components/redux/store"
import {connect} from "react-redux"; // 是个函数
import {createIncrementAction,
        createDecrementAction,
        createIncrementAsyncAction} from "../../components/redux/actions/count_action_creators"
import React, {Component} from "react"



class Count extends Component{


    
    increment=()=>{
        const {value} = this.selectNumber ; //用户select
        //调用 父亲 ie.容器组件  传过来的方法
        this.props.jia(value*1);

    
    }

    decrement=()=>{
        const {value} = this.selectNumber ; //用户select
        this.props.jian(value*1);

    
    }

    //奇数再加
    incrementIfOdd=()=>{
        const {value} = this.selectNumber ; //用户select
        if(this.props.count %2!==0) //父亲通过props传进来的值
        {
            this.props.jia(value*1)
        }
    }

    //异步加 -- 异步action ： 不想在自己组件里等这500ms
    incrementAsync =()=>{
        const {value} = this.selectNumber ; //用户select
        this.props.jiaAsync(value*1,2000)
    }


    render(){
        // console.log("UI组件 接收到的props是", this.props)
        return(
            <div>
                <h2>我是Count组件, 下方组件的总人数为 ：{this.props.renshu}</h2>
                <h4> Current Sum:{this.props.count}</h4>
                <select ref = {c =>this.selectNumber = c }>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>Add, when current_Sum is ODD </button>&nbsp;
                <button onClick={this.incrementAsync}>Add, async </button>&nbsp;
            
            
            
            </div>
        )
    }
}


export default connect(
    //state 一个组件 Count时候 只有 count = 0 ;
    // 两个组件  combineReducer 里store 中存的是一个对象

    //state =>({count:state}),//对象  
    // *** state 是【总状态】***//

    state=>({count:state.he, renshu: state.rens.length }), //要用Person组件里的 传给 redux store的沟通 || 容器组价 传给了 上方的UI组件
    //mapStateToSateDispatch 可以 写成对象
    // 简写方式 只需 要action 对象， 他会帮你 自动dispatch
    {
       jia: createIncrementAction, //count_action creator里 是一个函数 返回action 对象
       jian: createDecrementAction,
       jiaAsync: createIncrementAsyncAction

    }

)(Count)