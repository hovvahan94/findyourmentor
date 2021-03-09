import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

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
