import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase'

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}


function App(props) {
  const isLoadedProfile = useSelector(state => state.firebase.profile.isLoaded);
  const isEmptyProfile = useSelector(state => state.firebase.profile.isEmpty);
  const auth = useSelector(state => state.firebase.auth)

  console.log(isEmptyProfile)
  return (
    <AuthIsLoaded>
      <Router>
        <Switch>
          <Route path='/suggestions' component={Suggestions}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </AuthIsLoaded>
  );
}

export default App;
