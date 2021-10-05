import React, {Component} from "react";
import axios from "axios"
export default class App extends Component{

    getStudentData = ()=>{
        //axios 返回 两个函数 1成功 (封装到 resonse.data 里), 1 失败
        axios.get('http://localhost:5000/api1/students').then(
            response=>{console.log("成功了!", response.data)},
            error =>{console.log("失败了",error)}
        )
    }

    getCarsData = ()=>{
        //axios 返回 两个函数 1成功 (封装到 resonse.data 里), 1 失败
        axios.get('http://localhost:5000/api2/cars').then(
            response=>{console.log("成功了!", response.data)},
            error =>{console.log("失败了",error)}
        )
    }
    render(){
        return(
            <div>
                <button onClick={this.getStudentData}>点我,获取学生信息</button>
            </div>
        )

    }
    
}