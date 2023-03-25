import React from 'react';
import AlertContext from '../context/alert/AlertContext';
import { useContext } from 'react';

export default function Alert(props) {

    let { AlertFunctions } = useContext(AlertContext);

    return (
        <>
            {
                AlertFunctions.show && <div className={`alert alert-${AlertFunctions.type} alert-dismissible fade show`} role="alert" style={{ display: "block", position: 'fixed', width: "auto", bottom: "0", zIndex: "3" }}>
                    <strong>iNotebook!</strong> {AlertFunctions.message}
                </div>
            }
        </>
    )
};