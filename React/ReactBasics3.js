//1. Rendering a Component

// 1.1 Function Component
function Welcome(props)
{
  //jsx
  return <h1>Hello, {props.name}</h1> ; 
}

const element = <Welcome name="abc"/>;

ReactDOM.render(
  element,
  document.getElementById('root')
);



1.  Welcome 传props  事先知道要传啥  里面写jsx:  function 里要 return jsx;
2.  props 的 attribute 在 element中 用 , 定义 Welcome component 把attribut 用 {js expression/变量名 } 或 “ ”  传进来
3.  ReactDOM.render(element， 和 getRoomtbyID)；  element =< 也就是一个 标签>  or 或者 传  <App 名字 />



// 1.2 Composing component: component 套 component
function Welcome(props)
{
  //jsx
  return <h1>Hello, {props.name}</h1>;
};


function PrintNames()
{
  return(
  <div>
    <Welcome name="AAA"/>
    <Welcome name="BBB"/>
  </div>);
  
}
ReactDOM.render(
  <PrintNames />,
  document.getElementById('root')
);

      
//==========================================//


读 React代码流程 
先从render开始读  看看 生成哪些component/element
看 element/compnent 中 props 都要传 什么 变量 as attribut
看 Componet 定义的 jsx



//======================//

// 2个 component formatDate, Comment, comment是个结构体


function formatDate(date) {
  return date.toLocaleDateString();
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);


