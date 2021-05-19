import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Firebase from "../Components/Firebase"
import phoneReceptionistService from "../Services/phoneReceptionistService";
import {useDispatch, useSelector} from "react-redux";
import {setAllPhoneReceptionists} from "../Actions";

export const PhoneReceptionistManagement = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentPhoneReceptionist, setCurrentPhoneReceptionist] = useState();
    const dispatch = useDispatch();
    phoneReceptionistService.getAllPhoneReceptionists().then(response => {
        dispatch(setAllPhoneReceptionists(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    return (
        <div>
                {isClicked ? <PhoneReceptionist_details myVar={setIsClicked} current={currentPhoneReceptionist}/> : <PhoneReceptionist_name_list myVar={setIsClicked} current={setCurrentPhoneReceptionist}/> }
        </div>
    );
};

const PhoneReceptionist_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentPhoneReceptionist = props.current
    return(
        <div className='phoneReceptionist_management' style={{alignItems: "center"}}>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>:מוקדנים</h1>
            <div>
                <section className='phoneReceptionists'>
                    {useSelector(state => state.allPhoneReceptionists).map((phoneReceptionist) => {
                        return <PhoneReceptionist key={phoneReceptionist.phoneReceptionistID} phoneReceptionist={phoneReceptionist} myVar={setClicked} current={setCurrentPhoneReceptionist}></PhoneReceptionist>
                    })}
                </section>
            </div>
        </div>
    );
}

const PhoneReceptionist_details = (props) =>  {
    const currentPhoneReceptionist = props.current
    const setClicked = props.myVar
    return(
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <button onClick={() => setClicked(false)} style={{
                margin: 'auto',
                textAlign: 'center',
                color: 'black',
                fontSize: 20
            }}>חזור לרשימה</button>
            <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>:דף מוקדן</h1>
            <PhoneReceptionist_full phoneReceptionist={useSelector(state => state.allPhoneReceptionists).find(x => x.phoneReceptionistID === currentPhoneReceptionist)}/>
        </div>
    )
}

const PhoneReceptionist_full = (props) =>{
    const { phoneReceptionistID, name, phoneNumber, shiftID, deleted} = props.phoneReceptionist;

    return (
        <article className='phoneReceptionist'>
            <ul  style={{paddingRight: '25rem'}} dir="RTL">
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } dir="RTL">{"מזהה מוקדן: " + phoneReceptionistID}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"שם מוקדן: " + name}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מס' טלפון: " + phoneNumber}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מס' משמרת: " + (shiftID ? shiftID : "לא במשמרת")}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{((deleted === false) || (deleted ===  undefined)) ? "סטטוס פעילות מוקדן: פעיל" : "סטטוס פעילות מוקדן: לא פעיל"}</li>
            </ul>
        </article>
    );
}

const PhoneReceptionist = (props) =>{
    const { name , phoneReceptionistID} = props.phoneReceptionist;
    return (
        <article className='phoneReceptionist'>
            <h2 onClick={() => {props.myVar(true) ; props.current(phoneReceptionistID)}} style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{name}</h2>
        </article>
    );
}

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
    const PhoneReceptionist = {
        name: ("" + phoneReceptionist_name.value),
        phoneNumber: ("" + phone_number.value),
        isDeleted: false
    };
    // handle button click of login form
    const handleAddNewUser = () => {
        Firebase.register(phoneReceptionist_name.value, username.value, password.value).then(() => {
            phoneReceptionistService.addPhoneReceptionist(username.value, password.value, PhoneReceptionist).then(response => {
                props.history.push('/phone_receptionist/phone_receptionist_management');
            }).catch(error => {
                console.error(error.message)
            });
        }).catch(error => {
            console.error(error.message)
        });
    }

    return (
        <Container component="main" maxWidth="xs">
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

const Image = () => (
    <img className="logo"
         src={process.env.PUBLIC_URL + '/app_icon.png'}
         alt={""}
    />
)