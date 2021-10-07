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
	render() {
		return (
			<div>
				<ul>
					{
						this.state.messageArr.map( (messageItem)=>{
							return (
								<li key = {messageItem.id}>

									{/* 向路由组件 传递 state 参数, 写成对象形式*/}
									<Link to ={ {
										pathname: "/home/message/detail",
										state:{
											id: messageItem.id,
											title: messageItem.title
										}
									}}>{messageItem.title}</Link>
								</li>
							)

						})
					}
				</ul>
				<hr/>
				


				{/* 向路由组件 接收 state 参数：==》 无需声明接收， 正常注册路由 即可*/}
				<Route path="/home/message/detail" component={Detail} />

			</div>
		)
	}
}
