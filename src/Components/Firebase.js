import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAhve5RIX-8KJA6bbdw_gLlZODpW0T2bMY",
    authDomain: "mds-webapp.firebaseapp.com",
    projectId: "mds-webapp",
    storageBucket: "mds-webapp.appspot.com",
    messagingSenderId: "285229230223",
    appId: "1:285229230223:web:8e53b2df8d1f11bc2268fa"
};
const secondaryFirebaseConfig = {
    apiKey: "AIzaSyCGpXfVHammoOGCvO3iwh00HDKC6FwuqHI",
    authDomain: "mds-application.firebaseapp.com",
    databaseURL: "https://mds-application-default-rtdb.firebaseio.com",
    projectId: "mds-application",
    storageBucket: "mds-application.appspot.com",
    messagingSenderId: "732976874834",
    appId: "1:732976874834:web:c424595f7d93daf7e2e68b"
};


class Firebase {
    constructor() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth()
    }

    login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password)
    }
    logout(){
        return this.auth.signOut()
    }

    async register(name, email, password){
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }
}
export default new Firebase()