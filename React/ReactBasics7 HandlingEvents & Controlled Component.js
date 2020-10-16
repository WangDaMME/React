// Handling Events
//1. on/off toggle button
class Toggle extends React.Component
{
  constructor(props)
  {
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);

  }

  // 不需要加 eventListener to a dom element, 直接 provide a listerer after it is initally rendered

  // 不用定义 直接initialize了
   handleClick() {
     this.setState(state => ({ isToggleOn: !state.isToggleOn
     }));
   }

   render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }

}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);



class LoggingButton extends React.Component
{
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () =>
  {
    console.console.log('this is ', this);
  }

  render() {
  return (
    <button onClick={this.handleClick}>Click me</button>
  );
  }

}


class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click me</button>
    );
  }
}

class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}click me</button>
    );
  }
}





// Controlled Elements

class NameForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {value: ''};   //现在 value 空字符串

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(event) {
    this.setState({value: event.target.value});  // 
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />  // react来handle  form 表单中value 的值
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}
