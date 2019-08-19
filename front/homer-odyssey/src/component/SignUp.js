import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.updateEmailField = this.updateEmailField.bind(this);
    }
    updateEmailField = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <h1>{this.state.email}</h1>
                <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={this.updateEmailField}
                    value={this.state.email}
                />
            </div>
        )
    };
}

export default SignUp;