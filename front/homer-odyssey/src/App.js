import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SignUp from "./component/SignUp";

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
            <Grid item xs={12} sm={6}
              alignContent="center"
            >
              <img src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png" alt="Homer Simpson" />
            </Grid>
            <Grid item xs={12} sm={6}
              alignContent="center"
            >
              <SignUp />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
