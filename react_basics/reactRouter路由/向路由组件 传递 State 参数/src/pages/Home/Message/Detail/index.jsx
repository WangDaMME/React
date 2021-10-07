import React, {Component} from "react"
const DetailData = [
    {id:'01', content: "你好，中国"},
    {id:'02', content: "你好，黑龙江"},
    {id:'03', content: "你好，哈尔滨"}

]

export default class Detail extends Component{
    render(){


        // 接收 state  参数
        const {id,title} = this.props.location.state; // state params参数 存放的位置 location.state 里


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