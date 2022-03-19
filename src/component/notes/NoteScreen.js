import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useform';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector( state => state.notes );
    
    const [formValues, handleInputChange, reset] = useForm(note);

    const {title, body} = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
      if(note.id != activeId.current){
          reset( note );
          activeId.current = note.id;
      }
    }, [note, reset])
    
    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}))
        
    }, [formValues])
    

    return (
        <div className="note__main-content">
            <NotesAppBar />
            <div className="note__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="note__tittle-input"
                    autoComplete='off'
                    value={title}
                    onChange={ handleInputChange }
                    name="title"
                />
                <textarea
                    className="note__tittle-text-area"
                    placeholder="What happenes today"
                    value={body}
                    onChange={ handleInputChange }
                    name="body"
                >   
                </textarea>
                
                {
                    note.url
                    &&
                    <div className="note__image">
                        <img src={note.url} alt="image" />
                    </div>
                }
            </div>
        </div>
    );
};
