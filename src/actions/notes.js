import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from '../helpers/loadNotes'
import Swal from "sweetalert2";
import { uploadImage } from "../helpers/uploadImage";




export const startNewNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch(activeNote(doc.id, newNote));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const findingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const notes = await loadNotes(uid);   
        dispatch( setNotes(notes) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: { 
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = (file) => {
    return async(dispatch, getState) => {
        const {active:noteActive} = getState().notes;
        Swal.fire({
            title: "loading...",
            text: 'please wait',
            allowOutsideClick: false,
            didOpen: () =>{
                Swal.showLoading();
            }
        })
        const fileUrl = await uploadImage(file);

        console.log(noteActive);
        
        noteActive.url = fileUrl;

        console.log(noteActive);

        
        dispatch(startSaveNote(noteActive))

        Swal.close();
    }
}