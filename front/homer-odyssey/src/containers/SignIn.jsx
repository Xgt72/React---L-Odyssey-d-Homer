import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import MySnackBar from "./MySnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            flash: "",
            showPassword: false,
            open: false,
            messageType: "success",
            redirect: false
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
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

    submitForm = (event) => {
        event.preventDefault();
        const { flash, showPassword, open, messageType, redirect, ...user } = this.state;
        fetch("/auth/signin",
            {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(user),
            })
            .then(res => {
                if (res.ok) {
                    this.setState({ messageType: "success" });
                    return res.json();
                } else {
                    if (res.status === 400) {
                        res.json().then(res => {
                            this.setState({ messageType: "error" });
                            this.setState({ "flash": res.message });
                            this.setState({ open: true });
                        });
                    } else {
                        this.setState({ messageType: "error" });
                        throw new Error(res.statusText);
                    }
                }
            })
            .then(
                res => {
                    this.props.dispatch(
                        {
                            type: "CREATE_SESSION",
                            user: res.user,
                            token: res.token,
                            message: res.message
                        }
                    );
                    this.setState({ "flash": res.message });
                    this.setState({ open: true });
                    setTimeout(() => {
                        this.props.history.replace("/");
                        this.setState({ redirect: true })
                    }, 2000);
                }
            )
            .catch(
                (err) => {
                    this.setState({ "flash": err.message });
                    this.setState({ open: true });
                }
            );
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleClick = () => {
        this.setState({
            open: false,
        });
    };


    render() {
        if (this.state.redirect) {
            // return <Redirect to="/profile" />
            return <Redirect to="/" />
        } else {
            return (
                <form onSubmit={this.submitForm}>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        onChange={this.updateEmail}
                        value={this.state.email}
                        required
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type={this.state.showPassword ? "text" : "password"}
                        name="password"
                        onChange={this.updatePassword}
                        value={this.state.password}
                        required
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        className="submitButton"
                        variant="contained"
                        margin="normal"
                        color="primary"
                        type="submit"
                        value="submit"
                    >
                        Submit
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClick}
                    >
                        <MySnackBar
                            variant={this.state.messageType}
                            message={this.state.flash}
                        />
                    </Snackbar>
                    <Link to="/signup">SignUp</Link>
                </form>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        flash: state.auth.token
    }
}

export default connect(mapStateToProps)(SignIn);