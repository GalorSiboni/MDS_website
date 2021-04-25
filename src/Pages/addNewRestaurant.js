import React, {useState} from "react";
import phoneReceptionistService from "../Services/phoneReceptionistService";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import restaurantService from "../Services/restaurantService";

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

const AddNewRestaurant = (props) => {
    const classes = useStyles();
    const username = useFormInput('');
    const password = useFormInput('');
    const restaurantID = useFormInput('');
    const phoneNumber = useFormInput('');
    const restaurant_name = useFormInput('');
    const location = useFormInput('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const Restaurant =
            {
                restaurantID: restaurantID.value,
                phoneNumber: phoneNumber.value,
                restaurant_name: restaurant_name.value,
                location: location.value,
                cities: [],
                deliveries: [],
                isDeleted: false,
            }

        ;
    // handle button click of login form
    const handleAddNewUser = () => {
        restaurantService.addRestaurant(username.value, password.value, Restaurant).then(response => {
            setLoading(false);
            props.history.push('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("משהו השתבש, נא נסה שנית מאוחר יותר");
        });
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    MDS הוספת מסעדה חדשה - מערכת
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField dir="RTL"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="restaurantID"
                        label="מזהה מסעדה"
                        name="restaurantID"
                        autoComplete="restaurantID"
                        autoFocus
                        {...restaurantID}
                    />
                    <TextField dir="RTL"
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
                    <TextField dir="RTL"
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
                    <TextField dir="RTL"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="שם המסעדה"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        {...restaurant_name}
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
                        {...phoneNumber}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="מיקום המסעדה"
                        name="location"
                        autoComplete="location"
                        autoFocus
                        {...location}
                    />
                    <Button
                        type="button"
                        onClick={() => handleAddNewUser()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        הוסף מסעדה חדשה
                    </Button>
                </form>
            </div>
        </Container>
    );
};
export default AddNewRestaurant;
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