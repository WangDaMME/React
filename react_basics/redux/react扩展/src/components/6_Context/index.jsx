import React, {Component} from "react"
import "./index.css"

/**
 * A-->B-->C state --props 
 * 如果 层次 太多
 */


const MyContext = React.createContext();// 需要放到A,B,C都可以访问到的位置 --MyContext 上下文对象
// 也可以解构赋值  const {Provider} = MyContext; // 是个对象 所以用{}



export default class A extends Component{
    state = {
        name: "tom",
        age: 18
    }
    render(){
        return (
            <div className="parent">
                <h3>我是A组件</h3>
                <h4>我的用户名是：{this.state.name}</h4>
                <MyContext.Provider value={ {username:this.state.name, age: this.state.age} }>  {/*【必须要写 value 关键字 不能改】 || 或者 this.state*/}
                 <B/> {/*这么写完 B组件 和 其孩子C 组件 就能收到要传递的值 , 收到组件自身实例对象 this */}
                </MyContext.Provider>
                
            </div>
            
        )
    }
}


class B extends Component{

    //B 没声明  不徐娅
    render(){
        return (
            <div  className="child">
                <h3>我是B组件</h3>
                <h4>我从A，接收到的用户名是：??? </h4>
                <C/>
            </div>
            
        )
    }
}


/***类组件 */

// class C extends Component{
    
//     // 必须 谁声明， 谁才能使用
//     static contextType = MyContext; //必须


//     render(){
//         console.log(this.context.username)
//         return (
//             <div  className="grandson">
//                 <h3>我是C组件</h3>
//                 <h4>我从A，接收到的用户名是：{this.context.username} </h4>
//             </div>
            
//         )
//     }
// }


/***函数式组件 */

function C (){

    //第2种方式 Consumer

    return (
        <div  className="grandson">
            <h3>我是C组件</h3>
            <h4>我从A，接收到的用户名是：
                <MyContext.Consumer>
                    {
                        //value 你传的是啥 就是啥 {username:xxx，age:xx}
                        value =>{
                            return `${value.username},年龄是${value.age}`
                        }
                    }
                </MyContext.Consumer>
            
            </h4>
        </div>
        
    )
    
}