import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import restaurantService from "../../Services/restaurantService";
import {useDispatch, useSelector} from "react-redux";
import {DropdownButton, Dropdown} from "react-bootstrap";
import addressService from "../../Services/addressService";
import cityTranslator from "../../Utils/CityNameTranslate";
import {setAllCities} from "../../Actions";

const useStyles = makeStyles((theme) => ({
    paper: {
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
    },
    addCity: {
        margin: theme.spacing(3, 0, 2),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
}));

const AddNewRestaurant = (props) => {
    const classes = useStyles();
    const username = useFormInput('');
    const password = useFormInput('');
    const phoneNumber = useFormInput('');
    const restaurant_name = useFormInput('');
    const cities =useSelector(state => state.allCities);


    const Restaurant =
            {
                restaurantID: null,
                phoneNumber: phoneNumber.value,
                name: restaurant_name.value,
                location: null,
                RestaurantCityBoundary: cities,
                deliveries: null,
                isDeleted: false
            }

        ;
    // handle button submit of signup form
    const handleAddNewUser = () => {
        restaurantService.addRestaurant(username.value, password.value,Restaurant).then(response => {
            props.history.push('/restaurants');
        }).catch(error => {
            console.log(error + "???????? ??????????, ???? ?????? ???????? ?????????? ????????");
        });
    }

    return (
        <Container component="main" maxWidth="xs" >
            <div style={{textAlign: "center"}}>
                <img className="logo"
                     src={process.env.PUBLIC_URL + '/app_icon.png'}
                     alt={""}
                />
            </div>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    MDS ?????????? ?????????? ???????? - ??????????
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="???? ??????????"
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
                        label="??????????"
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
                        label="???? ????????????"
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
                        label="???????? ??????????"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        autoFocus
                        {...phoneNumber}
                    />
                    <DropDownComp cities={cities}/>
                    <Button
                        type="button"
                        onClick={() => handleAddNewUser()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        ???????? ?????????? ????????
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
const DropDownComp = (props) => {
    return(
        <DropdownButton id="dropdown-basic-button" title="????????">
            {props.cities.map(i => { return <Dropdown.Item dir={"RTL"}>{"??????: " + cityTranslator(i.city) + " ,  ????????: " + i.price+ " ,  ?????? ??????????: " + i.doTime}</Dropdown.Item> })}
        </DropdownButton>
    )
}