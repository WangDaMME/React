import React, {Component} from "react"
import qs from "querystring"
const DetailData = [
    {id:'01', content: "你好，中国"},
    {id:'02', content: "你好，黑龙江"},
    {id:'03', content: "你好，哈尔滨"}

]

export default class Detail extends Component{
    render(){

        // 路由组件传递的params 通过 props 传递进来 放到 match.params 对象里
        // const {id, title} = this.props.match.params;  //接收 params 参数

        // 接收 search 参数
        const {search} = this.props.location; // search params参数 存放的位置
        const {id, title} = qs.parse(search.slice(1)) // 第一个 "?" 问号不要 后面都要 


        const findRes = DetailData.find( (detailObj)=>{
            return detailObj.id === id;
        })
        return (
            <ul>
                <li> ID：{id}</li>
                <li> Title：{title}</li>
                <li> Content: {findRes.content}</li>

            </ul>
        )
    }
}