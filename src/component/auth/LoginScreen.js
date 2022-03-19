import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useform';

import validator from 'validator';
import { setErrorAction, unSetError } from '../../actions/ui';

export const LoginScreen = () => {
  
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector( state => state.ui );

  const [ formValues, handleInputChange ] = useForm({
    email: 'pepe@pepe.com',
    password: '123456'
  });
  
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if(isValidForm()){
      dispatch( startLoginEmailPassword( email, password ) );
    }
  }

  const isValidForm = () => {
    if( !validator.isEmail(email)){
      dispatch(setErrorAction('it not valid email'))
      return false;
    }else if( password.trim().length < 6 ){
      dispatch(setErrorAction('Password with min 6 caracters required'))
      return false;
  }
    dispatch(unSetError())
    return true
  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  }
  return (
    <>
        <h3 className="auth__title">Login</h3>
        
        <form onSubmit={ handleLogin }>
          {
              msgError &&
              (  
                  <div className="auth__alert-error">
                      { msgError }
                  </div>
              )
          }
          
          <input 
            type="text"
            placeholder="Email"
            name="email"
            className='auth__input'
            autoComplete="off"
            value={email}
            onChange={ handleInputChange }
          />
          <input 
            type="password"
            placeholder="Password"
            name="password"
            className='auth__input'
            value={password}
            onChange={ handleInputChange }
          />
          <button
            type="submit"
            className='btn btn_primary btn_block mb-5'
            disabled={ loading }
          >
            Login
          </button>

          <hr />
          <div className="auth__social-network">
            <p className="auth__p">Login with social network</p>
            <div 
                className="google-btn"
                onClick={ handleGoogleLogin }
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
            </div>

          </div>
            <Link  
              to="/auth/register"
              className='mt-5 link'
            >
              Create a new account
            </Link>
        </form>
    </>
);
};
