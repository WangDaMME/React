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
									{/* 多级路由 拖家带口 */}
									{/* 向路由组件 传递 params 参数*/}

									<Link to={`/home/message/detail/${messageItem.id}/${messageItem.title}`}>{messageItem.title}</Link>
								</li>
							)

						})
					}
				</ul>
				<hr/>
				
				{/* 注册 路由*/}
				{/* Node js 写法*/}

				<Route path="/home/message/detail/:id/:title"	component={Detail} />
			</div>
		)
	}
}
