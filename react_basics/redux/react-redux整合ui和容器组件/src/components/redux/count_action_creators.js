/**
 * action Creators 专门为 Count 组件生成action 对象 
 */

// function createIncrementAction(data)
// {
//     //返回action 对象
//     return {type: "increment", data}
// }

import {INCREMENT, DECREMENT} from "../redux/constant"
import store from "./store";


// *** 也可以写成箭头函数 形式 ****//
export const createIncrementAction = data =>( {type: INCREMENT, data}) ;//传入data 返回 对象形式
export const createDecrementAction = data =>( {type: DECREMENT, data}) ;//传入data 返回 对象形式


// 【异步action】: 所谓的异步action 就是指 action 的值 为函数 ，不再试一般对象 plain object
export const createIncrementAsyncAction = (data, time)=>{
    //需要返回一个 function 对象

    // store 调用 store 中有 dispatch 属性
    return (dispatch)=>{
        // 异步action中 通常伴随着 同步action
        setTimeout( ()=>{
           // store.dispatch(createIncrementAction(data)) // 通知store 分发这个任务
           dispatch(createIncrementAction(data)) // 通知store 分发这个任务
        }, time)
    }

}