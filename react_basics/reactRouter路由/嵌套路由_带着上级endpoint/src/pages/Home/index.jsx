import React, { Component } from 'react'
import {Switch, Route,Redirect} from "react-router-dom"
import News from './News'
import Message from './Message'
import MyNavLink from "../../components/MyNavLink"


export default class Home extends Component {
	render() {
		return (
			<div>
				<h3>我是Home的内容</h3>

				<div>
					<ul className ="nav nva-tabs">
						<li>
							{/* <a className="list-group-item" href="./home-news.html">News</a> */}
							{/* !!! 需要带着 【父组件】的名字 */}

							{/* <MyNavLink to="/news">News</MyNavLink> */}
							<MyNavLink to="/home/news">News</MyNavLink>

						</li>
				 		<li>
							{/* <a className="list-group-item active" href="./home-message.html">Message</a> */}
							<MyNavLink to="/home/message">Message</MyNavLink>

						</li>

					</ul>
						{/* 注册路由 */}
						<Switch>
							{/* !!! 不能开启exact 严格匹配， 导致 无法匹配 多级路由 */}
							<Route path = "/home/news" component={News}/>
							<Route path = "/home/message" component={Message}/>
							<Redirect to="/home/news"/>
						</Switch>
				</div>

			</div>
		)
	}
}
