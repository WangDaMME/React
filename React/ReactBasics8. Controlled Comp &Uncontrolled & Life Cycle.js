// Uncontrolled component using dom , 
// use ref to get value of input s

// 只 hold 一次，




class NameForm extends React.Component
{
  consturctor(props)
  {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }
  
  handleSubmit(event)
  {
  	alert('A name was submitted: ' + this.input.current.value);
  	console.log(this.input.current.value);

  	event.preventDefault();
  }

  render()
  {
  	return (
			<form onSubmit = {this.handleSubmit}>
		  		<label> Name :
		  			<input type="text" ref = {this.input} />
		  		</label>

		  		<input	type="submit" value="SubmitButton" />
		  	</form>
  		);
  	
  }

  
}


ReactDOM.render(
  <NameForm/>,
  document.getElementById('root')
);


// In react, file input是uncontrolled component因为 value can only be set by a user, not programmtically

class FileInput extends React.Component
{

	consturctor(props)
	{
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.fileInput = React.createRef();
	}

	handleSubmit(e)
	{
		event.preventDefault();
		alert(`Selected File - ${this.fileInput.current.files[0].name}`);
	}

	render()
	{

		return (
			{
				<form onSubmit={this.handleSubmit}>
			        <label>Upload file:
			          <input type="file" ref={this.fileInput} />
			        </label>
			        <br />
			        <button type="submit">Submit</button>
			     </form>

			}

			)

	}

}


// React Component Lifecycle

//1. render() :only required method
class App extends React.Component {
  render() {
    console.log('Enter render life cycle')
 
    return <div>Hello, world!</div>;
  }
}
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

//2. constructor() : 存在的意义 只有2 个， initialize local state， 和  bind evnt handler method to an instance 
class App extends React.Component {
  constructor() {
    super()
    console.log('Enter the constructor life cycle')
    
    this.state = {
      display: true
    }
  }
 
  render() {
    console.log('Enter render life cycle')
 
    return <div>Hello, world!</div>;
  }
}
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


//3. componentDidMount()
constructor -- render -- componentDidMount

componentDidMount 在comp mount 上dom tree 时候，立即执行，先执行construct -- 然后render 别忘了 unsubscrbe 

class Welcome extends React.Component {
  constructor() {
    super()
    console.log('Enter the constructor life cycle')
  }
 
  componentDidMount() {
    console.log('Enter the did mount life cycle')
  }
 
  render() {
    console.log('Enter the render life cycle')
    return <div>Welcome to react</div>
  }
}
 
 
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      display: false
    }
  }
 
  onClick = () => {
    this.setState((prevState) => {
      return {
        display: !prevState.display,
      }
    })
  }
 
  render() {
    return (
      <>
        <button onClick={this.onClick}>Toggle Welcome</button>
        {this.state.display && <Welcome />}
      </>
    )
  }
}
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


//4. componentDidUpdate()
 创建了 就不再 consturct 在有update发生时候 立即执行
class Search extends React.Component {
  constructor() {
    super()
    console.log('Enter the Search constructor life cycle')
  }
 
  componentDidMount() {
    console.log('Enter Search the did mount life cycle')
  }
  
  componentDidUpdate(prevProp) {
    console.log('Enter the did update life cycle')
    if (this.props.searchTerm !== prevProp.searchTerm) {
      console.log(`Search term has been changed`)
    }
    else {
      console.log('Search term has not been changed')
    }
  }
 
  render() {
    console.log('Enter the render life cycle')
    return <div>Some search result</div>
  }
}
 
 
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userInput: '',
      searchTerm: '',
    }
  }
 
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }
  
  onClick = () => {
    this.setState((prevState) => {
      return {
        searchTerm: prevState.userInput,
      }
    })
  }
 
  render() {
    return (
      <>
        <input type="text" value={this.state.userInput} onChange={this.handleChange} />
        <button onClick={this.onClick}>Search</button>
        <Search searchTerm={this.state.searchTerm} />
      </>
    )
  }
}
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
 

// && 条件渲染 ： 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。


class Welcome extends React.Component {
  constructor() {
    super()
    console.log('Enter the constructor life cycle')
  }
 
  componentDidMount() {
    console.log('Enter the did mount life cycle')
  }
 
  componentWillUnmount() {
    console.log('Enter the will unmount life cycle')
  }

  render() {
    console.log('Enter the render life cycle')
    return <div>Welcome to react</div>
  }
}
 
 
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      display: false
    }
  }
 
  onClick = () => {
    console.log('Before' +this.state.display);

    this.setState((prevState) => {
      return {
        display: !prevState.display,

      }
                  console.log('After' +this.state.display);


    })
  }
 
  render() {
    return (
      <>
        <button onClick={this.onClick}>Toggle Welcome</button>
        {this.state.display && <Welcome />}
      </>
    )
  }
}
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
