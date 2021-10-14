import React, { Component } from 'react'

// lazyLoad 懒加载 【太慢的】时候 ，显示的组件
export default class Loading extends Component {
	render() {
		return (
			<div>
				<h1 style={{backgroundColor:'gray',color:'orange'}}>Loading....</h1>
			</div>
		)
	}
}
