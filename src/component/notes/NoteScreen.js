import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className="note__main-content">
            <NotesAppBar />
            <div className="note__content">
                <input
                    type="text"
                    placeholder="Some awesome tittletletlet"
                    className="note__tittle-input"
                    autoComplete='off'
                />
                <textarea
                    className="note__tittle-text-area"
                    placeholder="What happenes today">
                </textarea>

                <div className="note__image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjJTcYFdKdHZCkOxvGGIEEfyF1y9lVQImp6g&usqp=CAU" alt="image" />
                </div>
            </div>
        </div>
    );
};
