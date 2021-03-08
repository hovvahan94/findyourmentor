import React from 'react';
import Suggestions from './Suggestions';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

function Step3({ formData, setForm, navigation, handleRegistration }) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg" className="container signup step3">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up step 3
                </Typography>
                <Suggestions />
                <div className={classes.buttonContainer}>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => navigation.previous()}
                >
                    Back
                    </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleRegistration}
                >
                    Complete Registration
                    </Button>
                </div>
            </div>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

export default Step3
