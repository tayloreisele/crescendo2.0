import React from 'react';
import "./App.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', email: '', password: '', passwordConfirmation: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.passwordConfirmation) {
        alert('Passwords do not match!');
        return;
    }
    // Signup logic here
  }

  render() {
    return (
      <div className='signup-container'>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <label>
            Username <br/>
            <input type="text" name="username" onChange={this.handleChange} required minLength="5" />
          </label>
          <br/>
          <label>
            Email <br/>
            <input type="email" name="email" onChange={this.handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address."
/>
          </label>
          <br/>
          <label>
            Password <br/>
            <input type="password" name="password" onChange={this.handleChange} required minLength="8"/>
          </label>
          <br/>
          <label>
            Confirm Password <br/>
            <input type="password" name="passwordConfirmation" onChange={this.handleChange} />
          </label>
          <br/>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default Signup;