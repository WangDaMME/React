import React, { useState } from "react"

//use Typescript declare Type

interface AppStateValue
{
    author: string,
    shoppingCart: {  
        items: { id:number, name:string }[] //list[]  type
       }
}


const defaultContextValue : AppStateValue = {
    author: "Da WANG",
    // shopping cart data is Object,  contains [] list of Items
    shoppingCart : {  items: [] }
}

export const appContext = React.createContext(defaultContextValue);

// 添加购物车 涉及到全局状态 state更新， 需使用setState函数  为了共享 setState， 再创建context
// 添加泛型 generics
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined);  // 函数 initialize



// 3. createProvider which 包裹 states

// 函数式组件 HOC 高阶函数 
// 功能就是把所有子组件包裹起来，并从全局角度 提供数据支持
export const AppStateProvider: React.FC = (props) =>{

    // 全局变量的 Object
    const [state, setState] = useState(defaultContextValue)

    return(
        <appContext.Provider value={state}> 
        <appSetStateContext.Provider value = {setState}>
        {props.children}
        </appSetStateContext.Provider>
        </appContext.Provider>
    )
} 
