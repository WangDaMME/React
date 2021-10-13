//对人 状态的 初始化 和 加工状态

import { ADD_PERSON } from "../constant";

// 就暴露一个 可以default
const initState = [{id:"001",name:"tome",age:20}] ; // 初始化一堆人 数组 

export default function personReducer(preState = initState, action){
    
    const {type, data} = action;

    switch(type){
        case ADD_PERSON :
            return [data,...preState] ; //spreading 之前的 数组，把 新添加的人放到最前方
        default:
            return preState;
    }
}