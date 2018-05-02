import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let randomNumber = Math.floor(Math.random() * 1000);
    this.state = {
      username: 'guest' + randomNumber,
      messages: [],
      inputValue: ''
    }
  }
  componentDidMount = () => {
    setInterval(this.refreshMessages, 500);
  }
  refreshMessages = () => {
    fetch('/messages')
      .then(res => res.json())
      .then(msgs => this.setState({ messages: msgs }))
  }
  handleSubmit = event => {
    event.preventDefault();
    let bod = JSON.stringify({
      username: this.state.username,
      contents: this.state.inputValue
    });
    fetch('/sendMsg', {
      method: 'POST',
      body: bod
    })
     
  }
  handleChange = event => {
    this.setState({ inputValue: event.target.value })
  }
  render() {
    return (
      <div>
        <div className="topcontainer">
          {this.state.messages.map(line => (<div> {line.username} : {line.contents} </div>))}
        </div>
        <div className="botcontainer">
          <form onSubmit={this.handleSubmit}>
            <div className="chat">
              <input
                type="text"
                value={this.state.inputValue}
                onChange={this.handleChange}>
              </input>
              <input type="submit"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
