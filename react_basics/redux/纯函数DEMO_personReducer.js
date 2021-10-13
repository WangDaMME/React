import {ADD_PERSON} from '../constant'

//初始化人的列表
const initState = [{id:'001',name:'tom',age:18}]

export default function personReducer(preState=initState,action){
	// console.log('personReducer@#@#@#');
	const {type,data} = action
	switch (type) {
		case ADD_PERSON: //若是添加一个人

		// preState.unshift(data) //此处不可以这样写，这样会导致 preState中内容被改写，违反了 personReducer( reducer) 是 纯函数的要求 pure function
			return [data,...preState] // 返回新对象，能够识别 & 更新
		default:
			return preState
	}
}