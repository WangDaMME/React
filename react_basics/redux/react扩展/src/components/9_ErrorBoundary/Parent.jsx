import React, { Component } from 'react'
import Child from './Child'


// ！！【在容易发生错误的组件的 父组件 添加 错误边界】 -- 把错误 控制到一定范围之内

// ** 只适用于 生产环境， 开发环境是不能 用 错误边界的 ， build 打包以后 好使 **/

export default class Parent extends Component {


    // 提前准备好一个状态
    state = {
        hasError: "" //用于 标识 子组件 是否 产生错误
    }

    //如果 这个组件的子组件 出现任何报错 都会 调用 这个 钩子， 并 传进来携带错误信息， 
    // 返回状态对象
    static getDerivedStateFromError(error){
        console.log(error);

        return {hasError: error} // 提前准备好一个状态
    }

    // 生命周期钩子： 当子组件 发生问题 会调用
    // 一般做 -- 统计错误次数 --> 发送给后台服务器，给 编码人员 fix bug
    componentDidCatch()
    {
        console.log("渲染组件时候 出错")
    }


	render() {
		return (
			<div>
				<h2>我是Parent组件</h2>
                {this.state.hasError} ? <h2>当前网络不稳定,稍后再试</h2> : <Child/>
			</div>
		)
	}
}