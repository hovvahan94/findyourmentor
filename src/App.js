import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';


function App(props) {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/suggestions'>
          <Suggestions />
        </PrivateRoute>
        <PrivateRoute path='/profile'>
          <Profile />
        </PrivateRoute>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
