import React from 'react';
import "./App.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', email: '', password: '', passwordConfirmation: '', message: ''};

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

    const { username, email, password } = this.state;
    const signupData = { username, email, password };
    // Signup logic here
    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        this.setState({message: data.message});
    })
    .catch((error) => {
        if (error.message.includes('Username already taken')) {
            this.setState({message: 'This username is already taken. Please choose another one.'});
        } else {
            this.setState({message: 'An error occurred. Please try again.'});
        }
    });
  }

  render() {
    return (
        <div className='signup-container'>
            <h1>Sign Up</h1>
            <form className='signup-form' onSubmit={this.handleSubmit}>
                <label>
                    Username <br/>
                    <input type="text" name="username" onChange={this.handleChange} required minLength="5" />
                </label>
                <br/>
                <label>
                    Email <br/>
                    <input type="email" name="email" onChange={this.handleChange} title="Please enter a valid email address."/>
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
                <input type="submit" value="Sign Up" className='link-button'/>
            </form>
            {this.state.message && <p>{this.state.message}</p>}
        </div>
    );
}
}

export default Signup;