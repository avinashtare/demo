import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';

export default function NoteItems(props) {
    // getin data form props
    const { _id, title, description, tag, date } = props.note;

    // geting all funciton form context api
    const { deleteNote } = useContext(NoteContext);
    const { setAlert } = useContext(AlertContext);
    // const {deleteNote,editNote} = useContext(NoteContext);

    const handleDeleteNote = async () => {
        let return_deleteNote = await deleteNote(_id);

        // for show alert
        if (return_deleteNote.status === 200) {
            setAlert("danger", "You Note Delete successfuly.", true);
            setTimeout(() => { setAlert("success", "", false) }, 5000);
        }
        else {
            setAlert("danger", "Sorry Some Internal Server Error We Can't Delete Your Note", true);
            setTimeout(() => { setAlert("success", "", false) }, 5000);
        };
    }
    return (
        <>
            <div className="card text-bg-light mb-3 mx-2" style={{ width: "300px" }}>
                <div className="card-header">{new Date(date).toUTCString().replace("GMT", "")}</div>
                <div className="card-body" style={{ padding: "10px" }}>
                    <h5 className="card-title">{title.length < 20 ? title : title.substring(0, 25) + "... "}</h5>
                    <p className="card-text">{description.length < 255 ? description : description.substring(0, 255) + "... "}
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { props.handleNoteModal("SEE NTOES","Your Note",_id, title, description, tag) }} style={{ transform: "scale(0.8)" }}>See More</button>
                    </p>
                    <button className="btn btn-primary mx-2" onClick={() => { props.handleNoteModal("UPDATE", "UPDATE NOTE", _id, title, description, tag) }}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="btn btn-danger mx-2" onClick={handleDeleteNote}><i className="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </>
    )
};
