import React, {Component} from "react"
import { NavLink } from "react-router-dom";

// 一般组件  对 NavLink 做封装

export default class MyNavLink extends Component
{

    render()
    {
        // const {to, title} = this.props; // 从props里拿 
        
        // {... this.props} 所有 接到的属性 都传给 NavLink 其中包含 
        // *** children 标签体内容的属性 *** 
        return <NavLink activeClassName="diyStyle" className="list-group-item"  {...this.props}/> 
    }

}