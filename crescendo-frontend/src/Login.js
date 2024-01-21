import React from 'react';
import "./App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // Login logic here
  }

  render() {
    return (
    <div className='login-container'>
      <form onSubmit={this.handleSubmit}>
        <label>
          Username <br/>
          <input type="text" name="username" onChange={this.handleChange} />
        </label>
        <label>
          Password <br/>
          <input type="password" name="password" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default Login;