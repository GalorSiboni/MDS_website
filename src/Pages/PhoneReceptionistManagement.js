import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import phoneReceptionistService from "../Services/phoneReceptionistService";

export const PhoneReceptionistManagement = () => {
    const [phoneReceptionistsArray, setPhoneReceptionistsArray] = useState([])
    phoneReceptionistService.getAllPhoneReceptionists().then(response => {
        console.log(response.data);
        setPhoneReceptionistsArray(response.data);
    })
        .catch(e => {
            console.log(e);
        });
    return (
        <div className='daily_reports'>
            <h1>דו"ח יומי</h1>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
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

export const AddNewPhoneReceptionist = (props) => {
    const classes = useStyles();
    const username = useFormInput('');
    const password = useFormInput('');
    const phoneReceptionist_name = useFormInput('');
    const phone_number = useFormInput('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const PhoneReceptionist = null;
    // handle button click of login form
    const handleAddNewUser = () => {
        phoneReceptionistService.addPhoneReceptionist(username.value, password.value, PhoneReceptionist).then(response => {
            setLoading(false);
            props.history.push('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("משהו השתבש, נא נסה שנית מאוחר יותר");
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    MDS הרשמה - מערכת
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="שם משתמש"
                        name="user"
                        autoComplete="user"
                        autoFocus
                        {...username}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="סיסמא"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="שם המוקדן"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        {...phoneReceptionist_name}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="מספר טלפון"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        autoFocus
                        {...phone_number}
                    />
                    <Button
                        type="button"
                        onClick={() => handleAddNewUser()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        הוסף מוקדן חדש
                    </Button>
                </form>
            </div>
        </Container>
    );
};

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}
