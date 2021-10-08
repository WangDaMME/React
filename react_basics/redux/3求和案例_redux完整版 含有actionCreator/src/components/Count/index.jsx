import React, {Component} from "react"
import store from "../redux/store"
import {createDecrementAction,createIncrementAction} from "../redux/count_action_creators" //引入actionCreator，专门为创建actionCreator对象

import {INCREMENT, DECREMENT} from "../redux/constant"
/**
 * Component 除了 自己自身要用的组件外，本身不保存 和 交给 redux 保存的state (都交给人家管理了)
 *    - 要拿的时候 从store里拿  store.getState()
 * 
 * 2. redux 与react 中render不同;  不是 facebook 开发，
 *    2.1 setState(): 保证2 件事， 帮你把 state改掉/并帮 调用render
 *    2.2 redux 只是帮你保存数据 并不能帮你 渲染
 */


/** {阶段2 不再自己亲自写 action}
 * Component 除了 自己自身要用的组件外，本身不保存 和 交给 redux 保存的state (都交给人家管理了)
 *    - 要拿的时候 从store里拿  store.getState()
 * 
 * 2. redux 与react 中render不同;  不是 facebook 开发，
 *    2.1 setState(): 保证2 件事， 帮你把 state改掉/并帮 调用render
 *    2.2 redux 只是帮你保存数据 并不能帮你 渲染
 */

export default class Count extends Component{


    // state 交给redux管理了
    // state= {
    //     count : 0
    // }


    // componentDidMount(){
    //     //store.subscribe 里 要个回调函数
    //     store.subscribe( ()=>{
    //         this.setState( {}) ;// 空的意思 就是像让他 再调一遍render 因为redux 只负责管理 不负责调render
    //     })
    // }

    increment=()=>{
        const {value} = this.selectNumber ; //用户select
        // const {count} = this.state // 不用维护state

        // 通知 redux，dispatch 一个action 让redux 帮我干了 我拿结果就行
        //    dispatch action对象 {type 和 data }
        // store.dispatch({
        //     type: "increment",
        //     data: value*1 // 字符串 强转 number
        // })

        // 不自己写 action对象了
        store.dispatch(createIncrementAction(value*1))
    }

    decrement=()=>{
        const {value} = this.selectNumber ; //用户select
        // const {count} = this.state
        // this.setState( {count: count-value*1}) // 字符串拼接 ---> 强制类类型转换
    
        store.dispatch(createDecrementAction(value*1))

    
    }

    //奇数再加
    incrementIfOdd=()=>{
        const {value} = this.selectNumber ; //用户select
        // const {count} = this.state

        //要用state 取 store 中取
        const count = store.getState();
        if (count %2 !==0)
        {
            store.dispatch(createIncrementAction(value*1))

        }
    }

    //异步加
    incrementAsync =()=>{
        const {value} = this.selectNumber ; //用户select
        // const {count} = this.state
        setTimeout( ()=>{
            //this.setState( {count: count+value*1}) // 字符串拼接 ---> 强制类类型转换
            store.dispatch(createIncrementAction(value*1))

        }, 3000) ; // 500ms 之后 再加
    }


    render(){
        return(
            <div>
                <h1> Current Sum: {store.getState()}</h1>
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