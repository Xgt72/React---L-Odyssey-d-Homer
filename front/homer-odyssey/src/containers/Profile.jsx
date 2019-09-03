import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                email: "homer.simpson@wildcodeschool.fr",
                name: "Homer",
                lastname: "Simpson"
            },
            redirect: false
        };
    }

    componentWillMount() {
        fetch("/profile",
            {
                headers: {
                    "Authorization": 'Bearer ' + this.props.token,
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(res => this.setState({ profile: res }))
            .catch();
    }



    logout = () => {
        this.props.dispatch(
            {
                type: "SIGNOUT"
            }
        );
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/signin" />
        } else {
            return (
                <div>
                    <List>
                        <ListItem>
                            <ListItemText primary="email" secondary={this.state.profile.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="name" secondary={this.state.profile.name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="lastname" secondary={this.state.profile.lastname} />
                        </ListItem>
                    </List>
                    <Button
                        className="submitButton"
                        variant="contained"
                        margin="normal"
                        color="primary"
                        type="button"
                        onClick={this.logout}
                    >
                        Sign Out
                    </Button>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return { token: state.auth.token };
}

export default connect(mapStateToProps)(Profile);