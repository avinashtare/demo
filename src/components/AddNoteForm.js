import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';
import LoginContext from "../context/authentication/LoginContext";


export default function AddNoteForm() {
  const { addNote } = useContext(NoteContext);
  const { setAlert } = useContext(AlertContext);
  const { isLogin, userLogin } = useContext(LoginContext);

  // cheaking login
  useEffect(() => {
    return async () => {
      // eslint-disable-next-line
      await userLogin();
    }
    // eslint-disable-next-line
  }, [])

  async function handleAddNote(e) {
    e.preventDefault()
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const tag = document.getElementById("tag");

    // validation
    title.style.border = "1px solid #ced4da";
    description.style.border = "1px solid #ced4da";

    if (title.value.length >= 3 && description.value.length >= 4) {

      // cheaking user online 
      const data = {
        title: title.value,
        description: description.value,
        tag: tag.value
      }

      if (navigator.onLine) {
        // adding note form server
        let RetrunAddNote = await addNote(data.title, data.description, data.tag);

        // console.log(RetrunAddNote)
        // for show alert
        if (RetrunAddNote.status === 200) {
          setAlert("success", "You Note Added successfuly.", true);
          setTimeout(() => { setAlert("success", "", false) }, 5000);
        }
        else {
          setAlert("danger", "Sorry Some Internal Server Error We Can't Add Your Note", true);
          setTimeout(() => { setAlert("success", "", false) }, 5000);
        };

        // clear all text
        if (RetrunAddNote) {
          title.value = "";
          description.value = "";
          tag.value = "";
        };
      }
      else {
        setAlert("danger", "Network Connection Error :(", true);
        setTimeout(() => { setAlert("success", "", false) }, 5000);
      }
    }
    else {
      // validation
      if (title.value.length < 3 && description.value.length < 4) {
        setAlert("danger", "Title Length Must Be 3 Letter & description 4", true);
        title.style.border = "1px solid red";
        description.style.border = "1px solid red";
        setTimeout(() => { setAlert("success", "", false) }, 5000);
      }
      else {
        if (title.value.length < 3) {
          title.style.border = "1px solid red";
          setAlert("danger", "Title Length Must Be 3 Letter ", true);
          setTimeout(() => { setAlert("success", "", false) }, 5000);
        }
        else {
          title.style.border = "1px solid #ced4da";
        }
        if (description.value.length < 4) {
          description.style.border = "1px solid red";
          setAlert("danger", "Title description Must Be 4 Letter", true);
          setTimeout(() => { setAlert("success", "", false) }, 5000);
        }
        else {
          description.style.border = "1px solid #ced4da";
        };
      };
    };

  };
  return (
    <div className="container my-3">
      <h2 className='text-center'>Add a Note | iNotebook</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label"><strong>Title:</strong></label>
          <input type="text" className="form-control" id="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label"><strong>Description:</strong></label>
          <textarea type="text" className="form-control" id="description"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"><strong>Tag:</strong></label>
          <input type="text" className="form-control" id="tag" />
        </div>
        {isLogin.login ?
          <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button> :
          <Link to="/signup" type="submit" className="btn btn-primary">Add Note</Link>
        }
      </form>
    </div>
  )
};