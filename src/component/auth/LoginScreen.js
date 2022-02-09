import React from 'react';
import { useDispatch } from 'react-redux';


import { Link } from 'react-router-dom';
import { login, startGoogleLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useform';


export const LoginScreen = () => {
  
  const dispatch = useDispatch();


  const [ formValues, handleInputChange ] = useForm({
    email: 'usu@gmail.com',
    password: '12345'
  });
  
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( login(12345, 'pedro') )

  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  }
  return (
    <>
        <h3 className="auth__title">Login</h3>
        
        <form onSubmit={ handleLogin }>
          
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
