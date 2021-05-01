import React, {useState, useMemo} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import restaurantService from "../../Services/restaurantService";
import {useDispatch, useSelector} from "react-redux";
import {DropdownButton, Dropdown} from "react-bootstrap";

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
    addCity: {
        margin: theme.spacing(3, 0, 2),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
}));

const AddNewDeliveryMan = (props) => {
    const classes = useStyles();
    const username = useFormInput('');
    const password = useFormInput('');
    const phoneNumber = useFormInput('');
    const delivery_man_name = useFormInput('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const deliveryman =
            {
                deliverymanID: null,
                phoneNumber: phoneNumber.value,
                name: delivery_man_name.value,
                location: null,
                isDeleted: false,
                shiftID: null,
                routeID: null
            }

        ;
    // handle button submit of signup form
    const handleAddNewUser = () => {
        restaurantService.addRestaurant(username.value, password.value,deliveryman).then(response => {
            setLoading(false);
            props.history.push('/deliveries');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("משהו השתבש, נא נסה שנית מאוחר יותר");
        });
    }

    // handle button add new city
    const handleNewCity = () => {
        // restaurantService.getAllCities().then(response => {
        //     dispatch(setAllCities(response.data));
        // })
        //     .catch(e => {
        //         console.log(e);
        //     });
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    MDS הוספת שליח חדש - מערכת
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
                        {...delivery_man_name}
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
export default AddNewDeliveryMan;

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