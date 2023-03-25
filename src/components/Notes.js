import { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import noteContext from '../context/notes/NoteContext';
import NoteItems from './NoteItems';
import AlertContext from '../context/alert/AlertContext';
import LoginContext from "../context/authentication/LoginContext";

export default function Notes() {
    // geting notes and setNotes function data from use context api
    // eslint-disable-next-line
    const { notes, getAllNotes, editNote } = useContext(noteContext);
    let { setAlert } = useContext(AlertContext);
    const { isLogin, userLogin } = useContext(LoginContext);

    // geting all notes
    useEffect(() => {
        return async () => {
            // eslint-disable-next-line
            let ReturngetAllNotes = await getAllNotes()
            await userLogin();
        }
        // eslint-disable-next-line
    }, [])


    const handleNoteModal = (todo,modalTitle,id, title, description, tag) => {
        // console.log(id, title, description, tag)
        // show edit modal
        const showEditModalBtn = document.getElementById('showEditModal')
        showEditModalBtn.click();

        // adding edit modal current values
        let edit_id = document.getElementById("edit-id");
        let edit_title = document.getElementById("edit-title");
        let edit_description = document.getElementById("edit-description");
        let edit_tag = document.getElementById("edit-tag");
        let editModalLabel = document.getElementById("editModalLabel");
        let modalUpdateBTN = document.getElementById("modalUpdateBTN");

        if(todo === "UPDATE"){
            modalUpdateBTN.style.display = "block";

               // read only
               edit_title.readOnly = false;
               edit_description.readOnly = false;
               edit_tag.readOnly = false;
        }
        else if(todo === "SEE NTOES"){
            modalUpdateBTN.style.display = "none";

            // read only
            edit_title.readOnly = true;
            edit_description.readOnly = true;
            edit_tag.readOnly = true;
        }

        edit_id.value = id
        edit_title.value = title
        edit_description.value = description
        edit_tag.value = tag
        editModalLabel.innerText = modalTitle;
    };

    // edit notes value from api
    const editNotesValue = async () => {
        let edit_id = document.getElementById("edit-id").value;
        let edit_title = document.getElementById("edit-title").value;
        let edit_description = document.getElementById("edit-description").value;
        let edit_tag = document.getElementById("edit-tag").value;

        let data = { edit_id, edit_title, edit_description, edit_tag };

        // console.log(data);
        let returnEditNote = await editNote(data.edit_id, data.edit_title, data.edit_description, edit_tag);
        // console.log(returnEditNote)

        // for show alert
        if (returnEditNote.status === 200) {
            setAlert("success", "You Note Updated successfuly.", true);
            setTimeout(() => { setAlert("success", "", false) }, 5000);
        }
        else {
            setAlert("danger", "Sorry Some Internal Server Error We Can't Update Your Note", true);
            setTimeout(() => { setAlert("success", "", false) }, 5000);
        };

        // hide modal
        if (returnEditNote) {
            const showEditModalBtn = document.getElementById('showEditModal')
            showEditModalBtn.click();
        };
    };

    return (
        <>
            {/* show data modal */}
          
            {/* <!-- Edit Modal --> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" id='showEditModal' style={{ display: "none" }}></button>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">UPDATE NOTE</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="edit-title" className="form-label"><strong>Title:</strong></label>
                                    <input type="text" className="form-control" id="edit-title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edit-description" className="form-label"><strong>Description:</strong></label>
                                    <textarea type="text" className="form-control" id="edit-description"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edit-tag" className="form-label"><strong>Tag:</strong></label>
                                    <input type="text" className="form-control" id="edit-tag" />
                                    <input type="hidden" className="form-control" id="edit-id" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" id='modalUpdateBTN' onClick={editNotesValue}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* all notes */}
            <div className="container my-3">
                <h2>Your Notes</h2>
                {isLogin.login ?
                    <div className="my-3" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {notes.length === 0 && "No Notes Available In Cloud :("}
                        {notes.map((note) => {
                            return (
                                <NoteItems key={note._id} note={note} handleNoteModal={handleNoteModal} />
                            );
                        })}
                    </div>
                    :
                    <div className='flex'>
                        <b>Please Login Or SignUp And Add Note</b><br />
                        <Link className="btn btn-primary mx-1 my-2" to="/signup">Sign Up</Link>
                        <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                    </div>
                }
            </div>
        </>
    )
};