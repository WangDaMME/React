import React, {Component} from "react"

export default class Count extends Component{

    state= {
        count : 0
    }

    increment=()=>{
        const {value} = this.selectNumber ; //用户select
        const {count} = this.state
        this.setState( {count: count+value*1}) // 字符串拼接 ---> 强制类类型转换
    }

    decrement=()=>{
        const {value} = this.selectNumber ; //用户select
        const {count} = this.state
        this.setState( {count: count-value*1}) // 字符串拼接 ---> 强制类类型转换
    }

    //奇数再加
    incrementIfOdd=()=>{
        const {value} = this.selectNumber ; //用户select
        const {count} = this.state
        if (count %2 !==0)
        {
            this.setState( {count: count+value*1}) // 字符串拼接 ---> 强制类类型转换
        }
    }

    //异步加
    incrementAsync =()=>{
        const {value} = this.selectNumber ; //用户select
        const {count} = this.state
        setTimeout( ()=>{
            this.setState( {count: count+value*1}) // 字符串拼接 ---> 强制类类型转换
        }, 500) ; // 500ms 之后 再加
    }


    render(){
        return(
            <div>
                <h1> Current Sum: {this.state.count}</h1>
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