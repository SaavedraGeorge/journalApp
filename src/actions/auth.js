import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
;

export const registerEmailPasswordName = ( email, password, name ) =>{
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
                await user.updateProfile({displayName: name});
                dispatch(
                    login({
                        uid: user.uid,
                        displayName: user.displayName
                    }
                    )
                )
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const startGoogleLogin = () =>{
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({user}) => {
                dispatch(
                    login({
                        uid: user.uid,
                        displayName: user.displayName
                    }
                    )
                )
            })
    }
}


export const login = (uid, displayName) =>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}