import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import Profile from "./component/Profile";

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
                  <Route exact path={["/", "/signin"]} component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/profile" component={Profile} />
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
