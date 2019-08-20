import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import MySnackBar from "./MySnackBar";
import Snackbar from "@material-ui/core/Snackbar";

class SignUp extends Component {
    constructor(props) {

        super(props);
        this.state = {
            email: "",
            password: "",
            passwordBis: "",
            firstname: "",
            lastname: "",
            flash: "",
            showPassword: false,
            showPasswordBis: false,
            open: false,
            messageType: "success"
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordBis = this.updatePasswordBis.bind(this);
        this.updateFirstname = this.updateFirstname.bind(this);
        this.updateLastname = this.updateLastname.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleClickShowPasswordBis = this.handleClickShowPasswordBis.bind(this);
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
            const { passwordBis, flash, showPassword, showPasswordBis, open, messageType, ...user } = this.state;
            fetch("/auth/signup",
                {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(user),
                })
                .then(res => {
                    if (res.status !== 200) {
                        this.setState({ messageType: "error" });
                    } else {
                        this.setState({ messageType: "success" });
                    }
                    return res.json();
                })
                .then(res => {
                    this.setState({ "flash": res.flash });
                    this.setState({ open: true });
                }
                );
        }
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleClickShowPasswordBis = () => {
        this.setState({
            showPasswordBis: !this.state.showPasswordBis,
        });
    };

    handleClick = () => {
        this.setState({
            open: false,
        });
    };

    render() {

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
                <TextField
                    id="passwordBis"
                    label="Confirm Password"
                    type={this.state.showPasswordBis ? "text" : "password"}
                    name="passwordBis"
                    onChange={this.updatePasswordBis}
                    value={this.state.passwordBis}
                    required
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPasswordBis}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPasswordBis ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="firstname"
                    label="Firstname"
                    type="firstname"
                    name="firstname"
                    onChange={this.updateFirstname}
                    value={this.state.firstname}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="lastname"
                    label="Lastname"
                    type="lastname"
                    name="lastname"
                    onChange={this.updateLastname}
                    value={this.state.lastname}
                    required
                    margin="normal"
                    variant="outlined"
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
            </form>
        );
    };
}

export default SignUp;