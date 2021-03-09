import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase'

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}


function App(props) {
  const isLoadedProfile = useSelector(state => state.firebase.profile.isLoaded);
  const auth = useSelector(state => state.firebase.auth)
  return (
    <AuthIsLoaded>
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
    </AuthIsLoaded>
  );
}

export default App;
