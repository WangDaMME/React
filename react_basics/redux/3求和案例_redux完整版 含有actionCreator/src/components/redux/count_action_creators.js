/**
 * action Creators 专门为 Count 组件生成action 对象 
 */

// function createIncrementAction(data)
// {
//     //返回action 对象
//     return {type: "increment", data}
// }

import {INCREMENT, DECREMENT} from "../redux/constant"


// *** 也可以写成箭头函数 形式 ****//
export const createIncrementAction = data =>( {type: INCREMENT, data}) ;//传入data 返回 对象形式
export const createDecrementAction = data =>( {type: DECREMENT, data}) ;//传入data 返回 对象形式
