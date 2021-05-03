import React, {useState} from "react";
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
import addressService from "../../Services/addressService";
import {setAllCities} from "../../Actions";

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

const AddNewDelivery = (props) => {
    const classes = useStyles();
    const customerName = useFormInput('');
    const price = useFormInput('');
    const street = useFormInput('');
    const addressNotes = useFormInput('');
    const buildingNumber = useFormInput('');
    const floorNumber = useFormInput('');
    const apartmentNumber = useFormInput('');
    const deliveryNotes = useFormInput('');
    const phoneNumber = useFormInput('');
    const addressIsDeleted = useFormInput(false);
    const deliveryIsDeleted = useFormInput(false);
    const city = useFormInput(null);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cityArray, setCityArray] = useState(null)
    const [addressBoundary, setAddressBoundary] = useState([])
    const [cityPicked, setCityPicked] = useState(false)


    const address = {
        addressID: null,
        phoneNumber: phoneNumber.value,
        customerName: customerName.value,
        city: city.value,
        street: street.value,
        notes: addressNotes.value,
        buildingNumber: buildingNumber.value,
        floorNumber: floorNumber.value,
        apartmentNumber: apartmentNumber.value,
        addressLocationId: null,
        isDeleted: addressIsDeleted.value

    }
    const delivery =
        {
            deliveryID: null,
            deliverymanID: null,
            addressID: addressBoundary.addressID,
            receivedTime: null,
            deliveryTime: null,
            phoneNumber: phoneNumber.value,
            customerName: customerName.value,
            doTime: (cityPicked ? cityArray.find(item => item.name == city.value ).doTime : null),
            price: price.value,
            restaurantCost: (cityPicked ? cityArray.find(item => item.name == city.value ).price : null),
            notes: deliveryNotes.value,
            isDeleted: deliveryIsDeleted.value
        }

    ;
    // handle button submit of signup form
    const handleAddNewDelivery = () => {
        addressService.addAddress(address).then(response => {
            setLoading(false);
            setAddressBoundary(response.data)
            restaurantService.addDelivery(delivery).then(response1 => {
                setLoading(false);
                console.log(response1.data)
                props.history.push('/deliveries');
            }).catch(error => {
                setLoading(false);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("משהו השתבש, נא נסה שנית מאוחר יותר");
            });
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("משהו השתבש, נא נסה שנית מאוחר יותר");
        });

    }

    // handle button add new city
    const handleNewCity = () => {
            addressService.getAllCities().then(response => {
                // dispatch(setAllCities(response.data));
            })
                .catch(e => {
                    console.log(e);
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
                    MDS הוספת משלוח חדש - מערכת
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="customerName"
                        label="שם הלקוח"
                        name="customerName"
                        autoComplete="customerName"
                        autoFocus
                        {...customerName}
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
                        id="price"
                        label="מחיר"
                        name="price"
                        autoComplete="price"
                        autoFocus
                        {...price}
                    />
                    <DropDownComp onpress={() => {setCityPicked(true)}}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="buildingNumber"
                        label="מספר בית"
                        name="buildingNumber"
                        autoComplete="buildingNumber"
                        autoFocus
                        {...buildingNumber}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="floorNumber"
                        label="קומה"
                        name="floorNumber"
                        autoComplete="floorNumber"
                        autoFocus
                        {...floorNumber}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="apartmentNumber"
                        label="מספר דירה"
                        name="apartmentNumber"
                        autoComplete="apartmentNumber"
                        autoFocus
                        {...apartmentNumber}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="deliveryNotes"
                        label="הערות למשלוח"
                        name="deliveryNotes"
                        autoComplete="deliveryNotes"
                        autoFocus
                        {...deliveryNotes}
                    />
                    <Button
                        type="button"
                        onClick={() => handleAddNewDelivery()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        הוסף משלוח חדש
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default AddNewDelivery;

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
    const dispatch = useDispatch();
    const [title, setTitle] = useState("ערים")
    if(useSelector(state => state.allCities).length == 0)
    addressService.getAllCities().then(response => {
       dispatch(setAllCities(response.data))
    }).catch()
    return(
        <DropdownButton id="dropdown-basic-button" title={title}>
            {useSelector(state => state.allCities).map(i => { return <Dropdown.Item dir={"RTL"}>{"עיר: " + cityTranslate(i.city)}</Dropdown.Item> })}
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
