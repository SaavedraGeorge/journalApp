import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2'

export const startLoginEmailPassword = ( email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(
                login({
                    uid: user.uid,
                    displayName: user.displayName
                }
                )
            )
            dispatch(finishLoading())
        })
        .catch(err => {
            
            if(err.code === 'auth/user-not-found'){
                err.message =  'Usuario no encontrado'
            }
            
            Swal.fire('Error de Identificacion', err.message, 'error')
            dispatch(finishLoading())
        });
        
        
    }
}


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
                Swal.fire('Error', err.message, 'error')
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
const startLoading = () =>{
   return{
        type: types.uiStartLoading
    }
    
}
const finishLoading = () =>{
    return{
        type: types.uiFinishLoading
    }
    
}
export const startLogout = () =>{

    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
;
    }
}
export const logout = () => ({
    type: types.logout
})