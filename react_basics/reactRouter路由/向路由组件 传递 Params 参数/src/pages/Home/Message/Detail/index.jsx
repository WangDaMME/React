import React, {Component} from "react"

const DetailData = [
    {id:'01', content: "你好，中国"},
    {id:'02', content: "你好，黑龙江"},
    {id:'03', content: "你好，哈尔滨"}

]

export default class Detail extends Component{
    render(){

        // 路由组件传递的params 通过 props 传递进来 放到 match.params 对象里
        const {id, title} = this.props.match.params;
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