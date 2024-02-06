import React from 'react';
import { Link } from 'react-router-dom';

class Verify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        fetch('http://localhost:8080/verify?token=' + token)
            .then(response => response.json())
            .then(data => this.setState({message: data.message}))
            .catch(error => this.setState({message: 'An error occurred. Please try again.'}));
    }

    render() {
        return (
            <div>
                <p>{this.state.message}</p>
                <Link to="/login">Go to Login</Link>
            </div>
        );
    }
}

export default Verify;