// Boiling Verdict

function BoilingVerdict(props)
{
  if (props.celsius>=100)
  {
    return <p> The water would boil. </p>
  }

  return  <p> The water would NOT boil. </p>
}

/*
const element = <BoilingVerdict celsius="90"/>

ReactDOM.render(
  element,
  document.getElementById('root')
);
*/


// 2. Creat Calculator Component
// that lets you input Temp  &  keep it in its state.temp


// class Calculator extends React.Component
// {
//   constructor(props)
//   {
//     super(props);
//     this.state = { temparature : ""};  // initialize empty string
//     this.handleChange = this.handleChange.bind(this);
//   }
//
//   handleChange(e)
//   {
//     this.setState( {temparature: e.target.value} );
//   }
//
//   render()
//   {
//
//     return (
//       <fieldset>
//         <legend> Please Enter temparature in Celsius:  </legend>
//         <input  value={temparature}  onChange={this.handleChange} />  // { } 把state 传进来， onChange input的 eventhandler
//         <BoilingVerdict celsius={parseFloat(temparature)} />          // 起打印作用
//       </fieldset>
//     );
//   }
// }


// 3. Scale for 'c' & 'f' input
// js字典结构
const scaleNames = {
  c: 'Celsius',
  f: 'Farenheit'
}


// 4. temparatureInput Component
// temperatureInput 把 temperatue lift Up 到 Calculator

class TemparatureInput extends React.Component
{
  constructor(props)
  {
    super(props);
    // this.state = { temparature : ""};   // Lift Up Sharing state to Parent
    this.handleChange = this.handleChange.bind(this);
  }


  //通过pros 来设定
  handleChange(e) // e 代表event
  {
    // this.setState( {temparature: e.target.value} );  // state lift Up了
    this.props.onTemperatureChange( e.target.value); // parent有啥 你写啥
    console.log(e);
  }


  render()
  {
//  const temperature = this.state.temperature;   // ！！！ 是从prop 留下来的
    const temperatue = this.props.temperatue;
    const scale = this.props.scale; // 通过 props 传进来

    return (
          <fieldset>
            <legend> Please Enter temparature in {scaleNames[scale]}:  </legend>  // 字典 传入进来
            <input  value={temparature}  onChange={this.handleChange} />  // { } 把参数 {  } 传进来
          </fieldset>
        );
  }
}


// 没lift Up 的

// class Calculator extends React.Component
// {
//   render()
//   {
// 
//     return (
//       // 返回 TemparatureInput Component
//       <div>
//         <TemparatureInput scale="c" />
//         <TemparatureInput scale="f" />
//
//       </div>
//     );
//   }
// }

// ============= 辅助funciton   ============= //

// 是真的 function  没大写
function toCelcius(fahrenheit)
{
    return (fahrenheit -32) * 5/9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperatue, convert)
{
  const input = parseFloat(temperatue);
  if (Number.isNaN(input))
  {
    return '';
  }
  const output = convert(input);  // 回调函数
  const rounded = Math.round(output * 1000)/1000;
  return rounded.toString();

}



// ============= 辅助Component   ============= //






//==============Lift Up state的=============//
class Calculator extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {temperatue: '', scale: 'c'};
    this.handleCelciusChange = this.handleCelciusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }


  handleCelciusChange(temperatue)
  {
    this.setState( {scale:'c', temperatue});  // 改成传进来的 值
  }

  handleFahrenheitChange(temperatue)
  {
    this.setState( {scale:'f', temperatue});  // 改成传进来的 值
  }

  render()
  {
    const temperatue = this.state.temperatue;
    const scale = this.state.scale;

    // 函数名 传进来  手动多态 hah
    const celcius = scale ==='f'? tryConvert(temperatue, toCelcius): temperatue;
    const fahrenheit = scale ==='c'? tryConvert(temperatue, toFahrenheit): temperatue;

    return (
      // 返回 TemparatureInput Component
      <div>
        <TemparatureInput scale="c"  temperatue={celcius} onTemperatureChange ={this.handleCelciusChange}/>  // 通过props 流进来
        <TemparatureInput scale="f"  temperatue={fahrenheit} onTemperatureChange ={this.handleFahrenheitChange}/>  // 通过props 流进来
        <BoilingVerdict celsius = {parseFloat(celcius)} />

      </div>
    );
  }
}

//  流程

<Calculator /> : state {temp, scale , eventLisntner handleCelciusChange/ handleFahrenheitChange}

1. render <Calculator /> -->  里面有2  个 TempertureInput 子comp  c/ f， 来听
                              和    1  个 Boiling Verdict 做打印的


在 input 界面 , users 看到的是 TempertureInput 的 input 的handleChange eventListener 用onTempchange 处理
TempertureInput.onTempchange 由 Calculator 中的event Listenr 处理
