import React from 'react';
import styles from "./ShoppingCart.module.css";
import {FiShoppingCart} from "react-icons/fi";
import {appContext} from "../AppState";


// typescript 变量名  和 类型定义
// State 下拉菜单 自己的状态
interface State {
    isOpen: boolean;
}

// Props：传入的参数
interface Props {

}

// Generis 泛型
class ShoppingCart extends React.Component<Props,State>
{  
    ///type script:跟 写个 int n, List<Interger> arrlist 一样
    constructor(props: Props)
    {
        super(props);
        this.state = {
            isOpen:false,
        }

        //bind 绑定this 和函数方法  在 consturctor里
        // this.handleClick = this.handleClick.bind(this)

    }

    //this 会根据使用环境 动态变化
    // 这里this 指的是func 函数本身，而不是shoppingcart类，所以就不存在setState
    // 改为箭头函数 (箭头指向shopping cart了)  or bind
    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        console.log("e.target ",e.target);
        console.log("e.currentTarget ", e.currentTarget);

        // 类型检查
        // eg.只想点击文字触发， 而不是 icon
        if((e.target as HTMLElement).nodeName === "SPAN")
        {
            this.setState({isOpen: !this.state.isOpen});
        }

    }

    // 类组件 不能使用useContext 只能用Consumer  return 模型
    render()
    {
        return (
            
            <appContext.Consumer>{ (value)=>{
                
                return (
                    <div className = {styles.cartContainer}>
                <button className={styles.button} style ={{fontSize:40}}
                onClick = {this.handleClick}>
                    <FiShoppingCart/>
                    <span>Cart Items : {value.shoppingCart.items.length} (items)</span>
                    </button>
                <div className={styles.cartDropDown}
                    style={ {
                        display: this.state.isOpen ? "block": "none",
                    }}>
                            <ul>
                                {value.shoppingCart.items.map(i => <li> {i.name} </li>)}
                            </ul>
                        </div>
                     </div>
                )
                
            }}
            </appContext.Consumer>

            


        )
    }


}

export default ShoppingCart;