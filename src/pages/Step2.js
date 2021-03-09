import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { RegionData } from '../RegionData';

const departments = [
    'Marketing',
    'Support',
    'Human Resources',
    'Product Management',
    'Services',
    'Legal',
    'Accounting',
    'Sales'
]

function Step2({ formData, setForm, navigation }) {
    const classes = useStyles();

    const handleNext = () =>
    {
        if(formData.department)
        {
            navigation.next()
        }
        else{
            alert('Please select department')
        }
    }

    return (
        <Container component="main" maxWidth="xs" className="container signup step2">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up step 2
                </Typography>
                <form className={classes.form} noValidate>
                    <FormControl fullWidth margin="normal" className={classes.formControl}>
                        <InputLabel>Department</InputLabel>
                        <Select
                            variant="outlined"
                            required
                            fullWidth
                            id="department"
                            value={formData.department}
                            label="Department"
                            name='department'
                            onChange={setForm}
                        >
                            {departments.map((dep) => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="job_title"
                        label="Job Title"
                        type="text"
                        id="job_title"
                        autoComplete="off"
                        value={formData.job_title}
                        onChange={setForm}
                    />
                    <FormControl fullWidth margin="normal" className={classes.formControl}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            variant="outlined"
                            required
                            fullWidth
                            id="country"
                            value={formData.country}
                            label="Country"
                            name='country'
                            onChange={setForm}
                        >
                            {RegionData.map(data => <MenuItem key={data.countryName} value={data.countryName}>{data.countryName}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" className={classes.formControl}>
                        <InputLabel>City</InputLabel>
                        <Select
                            variant="outlined"
                            required
                            fullWidth
                            id="city"
                            value={formData.city}
                            label="City"
                            name='city'
                            onChange={setForm}
                        >
                            {RegionData.filter(country => country.countryName === formData.country)[0].regions.map(data =>
                                <MenuItem key={data.name} value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
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
                            onClick={handleNext}
                        >
                            Make a match suggestion
                    </Button>
                    </div>
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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

export default Step2
