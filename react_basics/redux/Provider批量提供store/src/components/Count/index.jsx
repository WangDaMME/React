import React, {Component} from "react"

export default class Count extends Component{


   
    increment=()=>{
        const {value} = this.selectNumber ; //用户select
        //调用 父亲 ie.容器组件  传过来的方法
        this.props.jia(value*1);

 
    }

    decrement=()=>{
        const {value} = this.selectNumber ; //用户select
        this.props.jian(value*1);

    
    }

    //奇数再加
    incrementIfOdd=()=>{
        const {value} = this.selectNumber ; //用户select
        if(this.props.count %2!==0) //父亲通过props传进来的值
        {
            this.props.jia(value*1)
        }
    }

    //异步加 -- 异步action ： 不想在自己组件里等这500ms
    incrementAsync =()=>{
        const {value} = this.selectNumber ; //用户select
        this.props.jiaAsync(value*1,2000)
    }


    render(){
       // console.log("UI组件 接收到的props是", this.props)
        return(
            <div>
                <h1> Current Sum:{this.props.count}</h1>
                <select ref = {c =>this.selectNumber = c }>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>Add, when current_Sum is ODD </button>&nbsp;
                <button onClick={this.incrementAsync}>Add, async </button>&nbsp;
            
            
            
            </div>
        )
    }
}