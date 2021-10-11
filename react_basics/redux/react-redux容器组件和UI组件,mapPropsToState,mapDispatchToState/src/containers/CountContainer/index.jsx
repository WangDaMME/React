// 引入Cound的 ui组件
import CountUI from "../../components/Count";// 起个名字 叫 CountUI
// 引入redux （引入 核心 c 位 store即可）
import store from "../../components/redux/store"
// 引入connect 用于连接 containerComponent的左右手 (redux store 和 ui组件)
import {connect} from "react-redux"; // 是个函数

// import store from "../../components/redux/store"; // store 从父组件 APP 通过 props 传进来了 
// --所以 不用自己引入

import {createIncrementAction,
        createDecrementAction,
        createIncrementAsyncAction} from "../../components/redux/count_action_creators"


// a函数返回的对象中的key就作为 UI组件props的key， value 就作为传递给ui组件props的value
// --- 状态对象

// a 的使命：就是将state 变成props
function mapStateToProps(state){

    // return {count:store.getState()}; // 返回对象. count是redux维护的state 
    //*** redux在调用a函数时 1.帮你调用 getState()函数，2.完后 帮你把state传进来  */

    return {count: state}
}

// b函数返回的是一个对象；对象中的key就作为 UI组件props的key， value 就作为传递给ui组件props的value
// --- 操作状态的方法 
// 也是 store 帮你传进来了， 带有 dispatch这个属性

// b 的使命：就是将dispatch这个 function对下昂 变成props
function mapDispatchToProps(dispatch){ 
    //number 是 孩子 回调时候 传递的参数
    return {jia: (number)=>{
        //通知redux执行加法
        // store.dispatch( {type:"increment",data: number})} //!!! 不用引入store
        // dispatch( {type:"increment",data: number})} //action对象 --可以用action creator创建

        dispatch( createIncrementAction(number))}, //action对象 --可以用action creator创建,
        
        jian: number=>dispatch(createDecrementAction(number)),
        jiaAsync: (number,time)=>dispatch(createIncrementAsyncAction(number,time))

    }; // 返回方法对象 eg.叫{方法名- 函数体}
}

// connect param1 需要接 两个 函数 对象 a: 返回状态对象 b:操作状态的方法
//const CountContainer = connect(a,b)(CountUI);//返回容器组件；  规定param2: 是 UI组件
const CountContainer = connect(mapStateToProps,mapDispatchToProps)(CountUI);

export default CountContainer ;// 暴露 这个容器组件

