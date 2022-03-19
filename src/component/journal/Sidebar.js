import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const handleLogout = () =>{
        dispatch(startLogout());
    }

    const {name} = useSelector( state => state.auth );
    const handleNewEntry = () => {
        dispatch(startNewNote())
    }
   return (
        <aside className="journal__sidebar" >
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fa fa-robot"></i>
                    <span className="journal__sidebar-name"> { name } </span>
                </h3>
                <button 
                    className="btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div 
                className='journal_new-entry'
                onClick={handleNewEntry}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className='mt-5'>New Entry</p>
            </div>

            <JournalEntries />
        </aside >
    );
};
