import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <main>
          <Route path="/" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
        </main>
      </div>
    </Router>
  );
};

export default App;
