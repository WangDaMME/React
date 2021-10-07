import React, { Component } from 'react'
import { withRouter } from 'react-router' ;// 不是大写的, 所以不是组件 , 是个函数

/**
 * withRouter
 * ex。 export default withRouter (xxx) ： 是个函数定义呀， 暴露的是 withRouter 加工完 函数的返回值
	接收一个 一般组件 ， 把 路由组件加上 路由组件的3个 api

 */
// export default class Header extends Component {

class Header extends Component {
	// 1般组件component 没有 路由组件的3大属性, 要用witHRouter 变一下
	back =()=>{
		this.props.history.goBack()
	}
	forward =()=>{
		this.props.history.goForward()
	}

	go=()=>{
		this.props.history.go(2);//往前前进2位
		// -2 是往后退2 步骤
	}


	render() {
		// console.log('Header组件收到的props是',this.props);
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick = {this.back}>Back</button>
				<button onClick = {this.forward}>Forward</button>
				<button onClick = {this.go}>一下往前 前进2步</button>	
			</div>
		)
	}
}


export default withRouter(Header);
/**
 * withRouter
 * ex。 export default withRouter (xxx) ： 是个函数定义呀， 暴露的是 withRouter 加工完 函数的返回值
	接收一个 一般组件 ， 把 路由组件加上 路由组件的3个 api

 */