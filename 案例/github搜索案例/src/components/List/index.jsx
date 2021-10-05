import React, {Component} from "react"
import "./index.css"
export default class List extends Component{

    render(){

      const {users, isFirst, isLoading ,err} = this.props;

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