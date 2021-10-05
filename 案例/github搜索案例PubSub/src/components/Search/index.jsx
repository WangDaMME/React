import React, {Component} from "react"
import axios from "axios"
import PubSub from "pubsub-js";

//github 后端用 cors 解决跨域 上线
//1. 端口1 是github传回来的真实数据
//2. 2                            本地模拟的数据

export default class Search extends Component{

    /**
     * 2件事， 获取用户输入，发送网络请求
     *     用 ref 是要拿 input 里输入的东西 来 发送请求，不是同1个东西 所以要ref ， 拿到的是 input 哪个节点
     */

    // search发布消息
    search = ()=>{
        //console.log("Search 发布件收到了", data);
        //发布新的状态 对象
        // PubSub.publish("Message1", {isFirst: false, isLoading: true})

        //1. 获取用户输入
        // console.log(this.keyWordNode.value)  // 连续解构赋值的写法  const {keyWordNode: {value}} = this ie. this--> keyWord -> valuye
        
        const{keyWordNode: {value: keyWord}} = this;

        //发送请求前 通知<List/> 更新状态 开始搜索 不是初次的欢迎，
        // this.props.updateAppState({isFirst: false, isLoading: true})
        PubSub.publish("Message1", {isFirst: false, isLoading: true})

        //2.发送网络请求  (http://localhost:3000 可以省略，你站在的位置 就是发送请求的位置 前面都额可以不写)
        axios.get(`https://localhost:3000/api1/search/users?q=${keyWord}`).then(

            //请求成功后 通知<List/> 更新状态
            reponse => {
                // this.props.updateAppState( {isLoading: false, users:response.data.items})  // github 返回的数组
                PubSub.publish("Message1", {isLoading: false, users:response.data.items})
            },
            //请求失败后 通知app 更新状态
            //Object 不要存 对象 而是 属性
            error => {
                PubSub.publish("Message1", {isLoading: false, err:error.message})

            },

        )
    }

    render(){
        return(
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <div>
            <input ref={ c => this.keyWordNode =c  } type="text" placeholder="enter the name you search"/>&nbsp;
            <button onClick={this.search}>Search</button>
          </div>
        </section>
        )
    }
}