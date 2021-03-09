import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function Step1({ formData, setForm, navigation, setPassword, password }) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className="container signup step1">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up step 1
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="first_name"
                        label="First Name"
                        type="text"
                        id="first_name"
                        autoComplete="off"
                        value={formData.first_name}
                        onChange={setForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="last_name"
                        label="Last Name"
                        type="text"
                        id="last_name"
                        autoComplete="off"
                        value={formData.last_name}
                        onChange={setForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
                        value={formData.email}
                        onChange={setForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal" className={classes.formControl}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            variant="outlined"
                            required
                            fullWidth
                            id="gender"
                            value={formData.gender}
                            label="Gender"
                            name='gender'
                            onChange={setForm}
                        >
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => navigation.next()}
                    >
                        Next
                    </Button>
                </form>
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default Step1
