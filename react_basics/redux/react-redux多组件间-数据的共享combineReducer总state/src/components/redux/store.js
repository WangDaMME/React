import {createStore, applyMiddleware,combineReducers} from "redux" // 引入createStore 函数，专门用于为创建redux 中最为核心的c位 【store对象】 不是默认暴露
// applyMiddleware指令 来应用想要添加的中间件
import countReducer from "./reducers/count_reducer"
import personReducer from "./reducers/person_reducer";
//引入 redux-thunk 中间件 来支持异步action
import thunk from "redux-thunk"

// 合并多个 reducers
const allReducer = combineReducers({
    he: countReducer, // 这个 count 和 从 countReducer里来，
    rens: personReducer //rens 从 personReducer来
    
}) ; //传入的那个对象就是redux帮我们保存的总状态对象 ie.{就是 求的和 + person Arr[]}


// const store = createStore(countReducer, applyMiddleware(thunk)) ;//store创建时候 饭店老板开饭店 先找好后厨一样， 先把 干活的人绑定
const store = createStore(allReducer, applyMiddleware(thunk)) ;//store创建时候 饭店老板开饭店 先找好后厨一样， 先把 干活的人绑定

export default store;