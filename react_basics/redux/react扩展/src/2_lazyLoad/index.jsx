import React, { Component,lazy,Suspense} from 'react' // suspense: 当网速慢，lazyload 迟迟load不上时候， 需要 suspense 给我找一个组件显示 (fallback属性 指定组件)

import {NavLink,Route} from 'react-router-dom'

// import Home from './Home'
// import About from './About'

// 用定义变量的形式 懒加载

import Loading from './Loading' // loading 不允许 懒加载， 必须要就位
const Home = lazy(()=> import('./Home') ) //lazy是高阶函数， 里面传一个函数
const About = lazy(()=> import('./About'))

export default class Demo extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header"><h2>React Router Demo</h2></div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">
							{/* 在React中靠路由链接实现切换组件--编写路由链接 */}
							<NavLink className="list-group-item" to="/about">About</NavLink>
							<NavLink className="list-group-item" to="/home">Home</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">

                                {/* Suspense  组件包裹所有注册路由的组件 */}
								<Suspense fallback={<Loading/>}>
									{/* 注册路由 */}
									<Route path="/about" component={About}/>
									<Route path="/home" component={Home}/>
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
