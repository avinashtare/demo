import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    const alertFunctions = {
        type: "danger",
        message: "this is message",
        show: false
    };

    let [AlertFunctions, setAlertfunction] = useState(alertFunctions);

    const setAlert = (type, message, show)=> {
        setAlertfunction({type: type,message: message,show: show})
       
    };
    return (
        <AlertContext.Provider value={{ AlertFunctions, setAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;