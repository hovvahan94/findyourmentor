import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../firebase';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

function Profile() {
    let history = useHistory();
    const classes = useStyles();
    const [profileInfo, setProfileInfo] = useState(null);
    const curentUserEmail = useSelector(state => state.firebase.auth.email);

    useEffect(() => {

        
        function fetchProfileInfo() {
            const database = firebase.database();
            const employers = database.ref().child('employers');
            const query = employers.orderByChild('email').equalTo(curentUserEmail).limitToFirst(1);

            query.on('value', snap => {
                console.log(snap.val()[Object.keys(snap.val())[0]])
                setProfileInfo(snap.val()[Object.keys(snap.val())[0]])
            })
        }

        fetchProfileInfo()
    }, [])





    return (
        <>
        {profileInfo && <Container component="main" maxWidth="xs" className="container profile">
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {`${profileInfo.first_name} ${profileInfo.last_name}`}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {profileInfo.email}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`${profileInfo.department} / ${profileInfo.job_title}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {`${profileInfo.country}, ${profileInfo.city}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => history.push('/suggestions')}>Suggest a Mentor</Button>
                </CardActions>
                <CardActions>
                    <Button size="small" onClick={() => firebase.logout()}>Logout</Button>
                </CardActions>
            </Card>
        </Container>}
        </>
    )
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default Profile
