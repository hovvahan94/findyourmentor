import React, {useEffect} from 'react'
import { Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

function Home() {
    return (
        <div className="container home" style={homeStyle}>
            <div>FIND YOUR MENTOR</div>
            <div>
                <Button variant="contained" color='primary' to="/signup" component={Link}>SIGNUP</Button>
                &nbsp;
                <Button variant="contained" color='primary' to='/login' component={Link}>LOGIN</Button>
            </div>
            </div>
    )
}
const homeStyle = {
    flexDirection: 'column '
}

export default Home
