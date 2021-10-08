import {createStore} from "redux" // 引入createStore 函数，专门用于为创建redux 中最为核心的c位 【store对象】 不是默认暴露
import countReducer from "./count_reducer"

const store = createStore(countReducer) ;//store创建时候 饭店老板开饭店 先找好后厨一样， 先把 干活的人绑定



export default store;
