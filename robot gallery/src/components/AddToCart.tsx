import React, {useContext} from "react"
import {appSetStateContext} from "../AppState"
import {RobotProps} from "./Robot"
// hoc
/*  input 传入一个 组件  return一个 改造好的组件
*/
export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>) =>{

    // 1. return class extends React.Component {} // 返回类组件

    // 2. 返回函数式组件
    return (props) =>{

        const setState = useContext(appSetStateContext); // 模仿对setState 的访问

        const addToCart = (id, name)=>{

            // 因为初始化时候 是undefined  做一个 protection  good practice
            if(setState)  //即 setState 不为空
            {
            setState(state =>   {
                return(
                    {
                        ...state, // spreading 避免修改到不该修改的数据
                        shoppingCart:{
                            items:[...state.shoppingCart.items,  {id,name}]
                        } 
                    }
                )
            })         
            }
        }
        return <ChildComponent {...props}  addToCart = {addToCart}/>

    };

}


export const useAddToCart = ()=>{

    // 内部可调用hook
    const setState = useContext(appSetStateContext); // 模仿对setState 的访问

    const addToCart = (id, name)=>{

        // 因为初始化时候 是undefined  做一个 protection  good practice
        if(setState)  //即 setState 不为空
        {
        setState(state =>   {
            return(
                {
                    ...state, // spreading 避免修改到不该修改的数据
                    shoppingCart:{
                        items:[...state.shoppingCart.items,  {id,name}]
                    } 
                }
            )
        })         
        }
    }

    // 最终返回的不再试组件  而是 内部逻辑本身
    return  addToCart;

}