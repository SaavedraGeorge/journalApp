import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch } from "react-redux";

import { firebase } from '../firebase/firebase-config';
import { JournalScreen } from '../component/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from "../actions/auth";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { Loading } from "../component/loading/Loading";
import { findingNotes } from "../actions/notes";



export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setchecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
      firebase.auth().onAuthStateChanged( (user) => {
        if (user?.uid){
            dispatch(login(user.uid, user.displayName));
            
            dispatch(findingNotes())
            
            setisLoggedIn(true);
        }else{
            setisLoggedIn(false)
        }
        setchecking(false)
      })
    }, [dispatch, setchecking ]);
    
    if(checking){
        return(
            <Loading />
        )
    }
    return (

        <Router>
            <div>
                <Switch>
                    <PublicRoutes
                        path="/auth" 
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter} 
                    />
                    <PrivateRoutes 
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={JournalScreen} 
                    />
                    <Redirect to='/auth/login'/>
                </Switch>
            </div>
        </Router>

    );
};
