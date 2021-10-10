import {createStore, applyMiddleware} from "redux" // 引入createStore 函数，专门用于为创建redux 中最为核心的c位 【store对象】 不是默认暴露
// applyMiddleware指令 来应用想要添加的中间件
import countReducer from "./count_reducer"

//引入 redux-thunk 中间件 来支持异步action
import thunk from "redux-thunk"

const store = createStore(countReducer, applyMiddleware(thunk)) ;//store创建时候 饭店老板开饭店 先找好后厨一样， 先把 干活的人绑定

export default store;