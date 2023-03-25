import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { useCookies } from 'react-cookie';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  // let Auth_Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NTA1MDhlYmVhNzI5YmQ0ZmZiNWMxIn0sImlhdCI6MTY1MzkzMzMyMH0.ZEAlACvni62_svtdmJc1XHioLC8k4O9iGd4ELccf-pE';
  let Auth_Token = cookies.SID;

  // GET all notes
  const notes_list = [];
  const [notes, setNotes] = useState(notes_list)

  const getAllNotes = async () => {

    let url = `${host}/api/notes/fetchallnotes`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Auth_Token,
      },
    });

    let json = await response.json();
    // console.log(json)
    setNotes(json);

    return (json)
  };

  // ADD NOTE
  const addNote = async (title, description, tag) => {
    // console.log("title :"+title+" des:"+description+" tag:" +tag)
    // call the api
    let data = { "title": title, "description": description, "tag": tag }

    let url = `http://localhost:5000/api/notes/addnote`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Auth_Token,
      },
      body: JSON.stringify(data)
    });

    getAllNotes();

    let addNote_response = await response;

    return addNote_response;
  };

  // DELETE NOTE
  const deleteNote = async (deleteId) => {
    // console.log(deleteId)

    let url = `${host}/api/notes/deletenote/${deleteId}`;

    const response = await fetch(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Auth_Token
      },
    });

    let retrun_deleteNote = await response;

    getAllNotes();

    return retrun_deleteNote;
  };

  // EDIT NOTE
  const editNote = async (editId, title, description, tag) => {
    // console.log(`edit id=> ${editId}, title => ${title}, description => ${description}, tag =>${tag}`)

    let url = `${host}/api/notes/updatenote/${editId}`;

    let data = { title: title, description: description, tag: tag };

    let response = await fetch(url, {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Auth_Token
      },
      body: JSON.stringify(data)
    });

    let response_value = await response;

    getAllNotes();

    return response_value;
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;