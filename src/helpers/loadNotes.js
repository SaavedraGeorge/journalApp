import { db } from "../firebase/firebase-config"

export const loadNotes = async(uid) => {
   const notesSnap =  await db.collection(`${uid}/journal/notes`).get();
   const notes = [];

   notesSnap.forEach(notesChild => {
       notes.push({
           id: notesChild.id,
           ...notesChild.data()
       })
   })

   return notes;
}