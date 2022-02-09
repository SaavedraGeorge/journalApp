import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useform';
import validator from 'validator';
import { setErrorAction, unSetError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { registerEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'pepe',
        email: 'pepe@example.com',
        password: '123456',
        password2: '123456'
    });

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if (isFormValid()){
            dispatch(registerEmailPasswordName(email, password, name));
        }
    }
    const isFormValid = () => {
        if( name.trim().length === 0 ){
            dispatch(setErrorAction('Name is required'))
            return false;
        }else if( !validator.isEmail(email)){
            dispatch(setErrorAction('it not valid email'))
            return false;
        }else if( password.trim().length < 6 ){
            dispatch(setErrorAction('Password with min 6 caracters required'))
            return false;
        }else if( password !== password2){
            dispatch(setErrorAction('Password not match'))
            return false;
        }
        dispatch(unSetError())
        return true
    }
    

    return (
        <>
        <h3 className="auth__title">Register</h3>
        
        <form onSubmit={ handleRegister }>
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
                placeholder="Nombre de usuario"
                name="name"
                className='auth__input'
                autoComplete="off"
                value={ name }
                onChange={ handleInputChange }
            />
            <input 
                type="text"
                placeholder="Email"
                name="email"
                className='auth__input'
                autoComplete="off"
                value={ email }
                onChange={ handleInputChange }
            />
            <input 
                type="password"
                placeholder="Password"
                name="password"
                className='auth__input'
                value={ password }
                onChange={ handleInputChange }
            />
            <input 
                type="password"
                placeholder="Confirm Password"
                name="password2"
                className='auth__input'
                value={ password2 }
                onChange={ handleInputChange }
            />
            <button
                type="submit"
                className='btn btn_primary btn_block mb-5'
            >
                Register
            </button>

            
          
            <Link  
                to="/auth/login"
                className='mt-5 link'
            >
                Alredy register
            </Link>
        </form>
    </>
    );
};
