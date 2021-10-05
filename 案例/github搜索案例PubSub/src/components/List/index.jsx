import React, {Component} from "react"
import "./index.css"

import PubSub from "pubsub-js";

export default class List extends Component{
    
    // list用的最直接了
    // list 的 4 种不同的展示， 1. 头像list 2.欢迎词 3.loading 4.github服务器坏了.. 报错
    state = {
      users: [] , // 初始化状态
      isFirst: true, // 是否为第一次打开页面
      isLoading: false, // 标识是否处于加载中
      err: '', //存储请求相关的错误信息

    }

    // 做一些初始化的工作 
    // List 订阅
    componentDidMount(){  
      // 订阅状态对象 并更新
      this.token =  PubSub.subscribe("Message1", (msg,stateObj) =>{
        //console.log("list组件收到了", data)
        this.setState({stateObj})
      } ); //消息名  _ 占位符 msg不写
    } 

    componentWillUnmount(){
      PubSub.unsubscribe(this.token)
    }


    render(){

      const {users, isFirst, isLoading ,err} = this.state;

        return(
        <div className="row">
          {
            // 三元连着写， 再问 ,再问
            isFirst ? <h2>欢迎使用! 输入关键字， 随后点击搜索</h2> : 
            isLoading? <h2>loadding...</h2> : 
            err? <h2 style={{color: 'red'}}>{err}</h2>: 
            // 有几个这种结构 取决于 传进来多少个 users做展示
            users.map( (userObj)=>{
              //函数体
              return (
                //给最外侧的结构加上key
                <div key={userObj.id} className="card">
                  <a href={userObj.html_url} target="_blank" rel="noreferrer">
                  <img alt="avatar" src={userObj.avatar_url} style={{width: '100px'}}/>
                  </a>
                  <p className="card-text">{userObj.login}</p>
                </div>
              )

            }) 
          }
        </div>

        )
    }
}