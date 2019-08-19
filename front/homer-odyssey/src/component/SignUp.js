import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordBis: "",
            firstname: "",
            lastname: "",
            flash: ""
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordBis = this.updatePasswordBis.bind(this);
        this.updateFirstname = this.updateFirstname.bind(this);
        this.updateLastname = this.updateLastname.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    updateEmail = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    updatePassword = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    updatePasswordBis = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    updateFirstname = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    updateLastname = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.passwordBis) {
            alert("Your password and the password confirmed are not identical !!");
        } else {
            const { passwordBis, flash, ...user } = this.state;
            fetch("/auth/signup",
                {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(user),
                })
                .then(res => res.json())
                .then(
                    res => this.setState({ "flash": res.flash }),
                    err => this.setState({ "flash": err.flash })
                );
        }
    };

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <h1>{JSON.stringify(this.state, 1, 1)}</h1>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={this.updateEmail}
                    value={this.state.email}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={this.updatePassword}
                    value={this.state.password}
                    required
                />
                <label htmlFor="passwordBis">Confirm Password</label>
                <input
                    id="passwordBis"
                    type="password"
                    name="passwordBis"
                    onChange={this.updatePasswordBis}
                    value={this.state.passwordBis}
                    required
                />
                <label htmlFor="firstname">Firstname</label>
                <input
                    id="firstname"
                    type="firstname"
                    name="firstname"
                    onChange={this.updateFirstname}
                    value={this.state.firstname}
                    required
                />
                <label htmlFor="lastname">Lastname</label>
                <input
                    id="lastname"
                    type="lastname"
                    name="lastname"
                    onChange={this.updateLastname}
                    value={this.state.lastname}
                    required
                />
                <input className="submitButton" type="submit" value="submit" />
            </form>
        );
    };
}

export default SignUp;