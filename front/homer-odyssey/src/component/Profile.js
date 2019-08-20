import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";

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

    logout = () => {
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

export default Profile;