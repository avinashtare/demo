import React, { useState } from "react";
import LoginContext from "./LoginContext";
import { useCookies } from 'react-cookie';

const LoginState = (props) => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['session']);

    let login_state = {
        login: false
    };
    let host = "http://localhost:5000";

    const [isLogin, setLogin] = useState(login_state);

    const userLogin = () => {

        let AuthToken = cookies.SID;

        const cheackUserInDatabase = async () => {
            let url = `${host}/api/auth/getuser`;

            let response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': AuthToken
                },
            });

            let response_data = await response.json();

            if (response_data.success[0].param != null) {
                setLogin({ login: true })
            }
        };


        if (AuthToken != null) {
            cheackUserInDatabase();
        }
        else {
            setLogin({ login: false });
        };
    }

    return (
        <LoginContext.Provider value={{ isLogin, userLogin }}>
            {props.children}
        </LoginContext.Provider>
    );
}

export default LoginState;