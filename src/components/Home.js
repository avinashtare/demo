import React,{useEffect} from 'react';
import Notes from "./Notes";
import AddNoteForm from './AddNoteForm';


export default function Home() {
  useEffect(() => {
    return () => {
      document.title = ("Home | iNotebook");
    }
  },[])
  
  return (
    <>
      <AddNoteForm />
        <Notes />
    </>
  )
}