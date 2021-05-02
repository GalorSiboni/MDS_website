import React from "react";
import Firebase from "./Firebase"
import phoneReceptionistService from "../Services/phoneReceptionistService";
import {logout} from "../Actions";
import {useDispatch} from "react-redux";

export const Logout = (props) => {
    const dispatch = useDispatch();
    const setter = props.LoginSetter;
    Firebase.logout().then(r => {
        console.log(r)
        dispatch(logout());
        setter(false);
        props.history.push('/');
        // phoneReceptionistService.phoneReceptionistLogout("7RJJHCxWb5YGOXQcKm6zwiOY9ax2").then().catch()
    }).catch(error => {
        console.log(error.statusCode + "משהו השתבש, נא נסה שנית מאוחר יותר, שגיאה: ");
    });
};