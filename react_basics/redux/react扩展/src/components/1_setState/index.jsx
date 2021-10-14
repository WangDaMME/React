import { thisExpression } from '@babel/types';
import React, { Component } from 'react'


export default class Demo extends Component {

    state = {
        count:0
    }

    handleClick = ()=>{
        // 获取原来的count 值
        const  {count}  = this.state
        /**
        this.setState({count:count+1});
        console.log(this.state.count) // 输出，没改
         */
        //1. 第一种 写法，对象式样 的 setState
        //  想看状态 可以传一个回调函数cb
        this.setState({count:count+1} , ()=>{
            //在render 更新完后才调用
            console.log(this.state.count)
        })
        
        
        //2. 第2种 写法，函数式样 的 setState
        // param1: 接收返回值 为 状态 的函数； （能接收 state 和 props） ， param2: cb
        this.setState( (state,props)=>{
            console.log(state,props)
            return {count: state.count+1} ; //返回值 为对象
            //写法上的优势 ；原来自己要解构状态值， 现在 它帮你把状态传进来了
        },()=>{
            console.log(this.state.count)
        } ) // c'b

        // 精简： this.setState( state=>({count:state.count+1})) //函数式
 
    }

	render() {
		return (
			<div>
                <h1>当前求和为:{this.state.count} </h1>
                <button onClick={this.handleClick}>点我+1</button>
			</div>
		)
	}
}
