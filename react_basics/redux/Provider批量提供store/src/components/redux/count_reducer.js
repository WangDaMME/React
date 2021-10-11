//专门为 Count 这个组件服务的 reducer

// reducer 就是 接收preState, 和action ； 返回 newState 的 纯函数


// 最开始 初始化 prevState, action 2 个参数 都为 undefined


import {INCREMENT, DECREMENT} from "../redux/constant"


const intialState = 0 ;

// reducer 作为 纯函数， 尽量不写 逻辑，把 （条件 逻辑）等 拿到 dispatch 的时候;

const  countReducer = function(prevState = intialState, action)
{
    // if(prevState === undefined) prevState=0; // 也可以这样初始化，最一开始 prevState是undefined


    // dispatch 过来的action对象 带有{type 和 data }
    const {type, data} = action;

    switch (type)
    {
        case INCREMENT: // 不要写成 “INCREMENT" 这是字符串匹配 , INCREMENT 是变量
            return prevState + data;
            break;
        case DECREMENT:
            return prevState - data;
            break;
        default:
            return prevState; // 一般 不加 不减 ，如果 前面没写 initialState 这里可用作 初始化的判断
    }


    return ; // newState
}

export default countReducer;