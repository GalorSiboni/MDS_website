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
import {setAllCities} from "../../Actions";
import {useDispatch, useSelector} from "react-redux";
import {DropdownButton, Dropdown} from "react-bootstrap";
import addressService from "../../Services/addressService";

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
    const dispatch = useDispatch();
    const [cities, setCities] = useState([]);


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
            console.log(error + "משהו השתבש, נא נסה שנית מאוחר יותר");
        });
    }

    // handle button add new city
    const handleNewCity = () => {
        addressService.getAllCities().then(response => {
            dispatch(setAllCities(response.data));
        })
            .catch(e => {
                console.log(e);
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
                    MDS הוספת מסעדה חדשה - מערכת
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
                    <DropDownComp/>
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
const DropDownComp = () => {
    addressService.getAllCities().then(value => {
        console.log(value)
    }).catch()
    return(
        <DropdownButton id="dropdown-basic-button" title="ערים">
            {useSelector(state => state.allRestaurants)[3].cities.map(i => { return <Dropdown.Item dir={"RTL"}>{"עיר: " + cityTranslate(i.city) + ", מחיר: " + i.price+ ", זמן משלוח: " + i.doTime}</Dropdown.Item> })}
        </DropdownButton>
    )
}
function cityTranslate(city) {
    let translate = "";
        switch (city){
            case "ROSH_AAYIN":
                translate = "ראש העין";
                break;
            case "ORANIT":
                translate = "אורנית";
                break;
            case "SHAHAREI_TIQWA":
                translate = "שערי תקווה";
                break;
            case "ELKANA":
                translate = "אלקנה";
                break;
            case "EZ_EFRAIM":
                translate = "עץ אפריים";
                break;
            case "HAGOR":
                translate = "חגור";
                break;
            case "MATAN":
                translate = "מתן";
                break;
            case "NIRIT":
                translate = "נירית";
                break;
            case "YARHIV":
                translate = "ירחיב";
                break;
            case "SHOHAM":
                translate = "שהם";
                break;
            case "GIVAT_HASLOSHA":
                translate = "גבעת השלושה";
                break;
            case "NAHSHONIM_BASE":
                translate = "בסיס נחשונים";
                break;
            case "KFAR_SABA":
                translate = "כפר סבא";
                break;
            case "TEL_AVIV":
                translate = "תל-אביב";
                break;
            case "KFAR_KASEM":
                translate = "כפר קאסם";
                break;
            case "OTHER":
                translate = "אחר";
                break;
            case "NAHSHONIM":
                translate = "נחשונים";
                break;
            case "PETAH_TIQWA":
                translate = "פתח תקווה";
                break;
            case "EINAT":
                translate = "עינת";
                break;
            default:
        }
        return translate;
}
