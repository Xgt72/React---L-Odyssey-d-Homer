import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import Profile from "./containers/Profile";
import requireAuth from "./hoc/requireAuth";
import requireNotAuth from "./hoc/requireNotAuth";

function App() {
  return (
    <Grid container
      alignItems="center"
      style={{ height: '100%' }}>
      <Grid item xs={12}>
        <Paper
          elevation={4}
          style={{ margin: 32 }}
        >
          <Grid container
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={6}>
              <Grid container
                alignItems="center"
                justify="center"
              >
                <img src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png" alt="Homer Simpson" />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BrowserRouter>
                <Switch>
                  <Redirect exact from="/" to="/profile" />
                  <Route exact path="/signin" component={requireNotAuth(SignIn)} />
                  <Route exact path="/signup" component={requireNotAuth(SignUp)} />
                  <Route exact path="/profile" component={requireAuth(Profile)} />
                </Switch>
              </BrowserRouter>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid >
  );
}

export default App;
