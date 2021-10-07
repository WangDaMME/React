import React, { Component } from 'react'
import {Link, Route} from "react-router-dom"
import Detail from './Detail'
export default class Message extends Component {

	// 动态生成数组 
	state = {
		messageArr : [
			{id:"01", title:"消息1"},
			{id:"02", title:"消息2"},
			{id:"03", title:"消息3"},

		]
	}

	showReplace =(id, title)=>{
		//编写一段代码， 让其实现跳转到Detail 组件 (肯定是 不带 link, navlink 需要点击 才能跳转)
		// 为replace跳转
		this.props.history.replace(`/home/message/detail/${id}/${title}`)

		// 携带 search 参数
		// this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

		// // 携带 state 参数
		// this.props.history.replace(`/home/message/detail`, {id,title}) // path, state 参数
	}

	showPush = (id, title)=>{
		this.props.history.push(`/home/message/detail/${id}/${title}`)

	}

	// back =()=>{
	// 	this.props.history.goBack()
	// }
	// forward =()=>{
	// 	this.props.history.goForward()
	// }

	// go=()=>{
	// 	this.props.history.go(2);//往前前进2位
	// 	// -2 是往后退2 步骤
	// }

	render() {
		return (
			<div>s
				<ul>
					{
						this.state.messageArr.map( (messageItem)=>{
							return (
								<li key = {messageItem.id}>

									{/* 向路由组件 传递 params 参数, 写成对象形式*/}
									<Link to={`/home/message/detail/${messageItem.id}/${messageItem.title}`}>{messageItem.title}</Link>
									&nbsp;<button onClick={()=>{this.showPush(messageItem.id, messageItem.title)}}>push查看</button>
s									&nbsp;<button onClick={()=>this.showReplace(messageItem.id, messageItem.title)}>replace查看</button>

								</li>
							)

						})
					}
				</ul>
				<hr/>
				


				{/* 向路由组件 接收 params 参数*/}
				<Route path="/home/message/detail/:id/:title" component={Detail} />
				
				{/* <button onClick = {this.back}>Back</button>
				<button onClick = {this.forward}>Forward</button>
				<button onClick = {this.go}>一下往前 前进2步</button> */}

			</div>
		)
	}
}
