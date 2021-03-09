import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';

function AuthIsLoaded({ children }) {
  const isLoaded = useSelector(state => state.firebase.profile.isLoaded);
  if (!isLoaded) return <div>splash screen...</div>;
  return children
}

function App() {
  const isEmptyProfile = useSelector(state => state.firebase.profile.isEmpty);
  const isLoaded = useSelector(state => state.firebase);

  console.log(isEmptyProfile, isLoaded)
  return (
    <AuthIsLoaded>
      <Router>
        <Switch>
          {!isEmptyProfile && <Route path='/suggestions' component={Suggestions}/>}
          {!isEmptyProfile && <Route path='/profile' component={Profile}/>}
          {isEmptyProfile && <Route path='/login' component={Login}/>}
          {isEmptyProfile && <Route path='/signup' component={Signup}/>}
          <Route path='/' component={Home} exact/>
          {isEmptyProfile ? <Redirect to='/'/> : <Redirect to='/profile'/>}
        </Switch>
      </Router>
    </AuthIsLoaded>
  );
}

export default App;
