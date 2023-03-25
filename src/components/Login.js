import React, { useContext, useEffect } from 'react';
import LoginContext from "../context/authentication/LoginContext";
import { useCookies } from 'react-cookie';
import AlertContext from '../context/alert/AlertContext';

// API => 
export default function Login() {
    let host = "http://localhost:5000";
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const { isLogin, userLogin } = useContext(LoginContext);
    const { setAlert } = useContext(AlertContext);

    // cheaking login
    useEffect(() => {
        return async () => {
            // eslint-disable-next-line
            await userLogin();
            document.title = ("Login | iNotebook");
        }
        // eslint-disable-next-line
    }, [])

    if (isLogin.login) { window.history.back() };

    // show password chackbox
    const showPassword = (e) => {
        let password = document.getElementById("LoginPassword");
        if (e.target.checked) {
            password.type = "text";
        }
        else {
            password.type = "password";
        }
    };

    // varification
    var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // login function
    const handleLogin = async (event) => {
        event.preventDefault();

        // geting email and password
        let emailAddress = document.getElementById("LoginemailAddress");
        let password = document.getElementById("LoginPassword");
        // console.log(emailAddress.value, password.value);

        if (emailAddress.value.match(validEmailRegex) && password.value.length >= 6) {

            let data = {
                email: emailAddress.value,
                password: password.value
            };

            let url = `${host}/api/auth/login`;

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            let responseValue = await response.json();
            // console.log(responseValue);

            if (responseValue.success) {

                // validation
                emailAddress.style.border = "1px solid #ced4da";
                password.style.border = "1px solid #ced4da";

                setAlert("success", "You Have Successfly Login.", true);
                setTimeout(() => { setAlert("success", "", false) }, 5000);

                // user set cookie
                let authToken = (responseValue.success[0].authToken);

                setCookie('SID', authToken, { path: '/' });

                setTimeout(() => {
                    window.location.href = "/"
                }, 2000);
            }
            else {
                if (responseValue.errors) {
                    emailAddress.style.border = "1px solid red";
                    password.style.border = "1px solid red";

                    setAlert("danger", "email & password don't match.", true);
                    setTimeout(() => { setAlert("success", "", false) }, 5000);
                }
            };
        }
        else {
            if (!emailAddress.value.match(validEmailRegex) && password.value.length < 6) {
                emailAddress.style.border = "1px solid red";
                password.style.border = "1px solid red";

                setAlert("danger", "Please Fill All Blanks Required", true);
                setTimeout(() => { setAlert("success", "", false) }, 5000);
            }
            else {
                if (!emailAddress.value.match(validEmailRegex)) {
                    emailAddress.style.border = "1px solid red";
                }
                else {
                    emailAddress.style.border = "1px solid #ced4da";
                }

                if (password.value.length < 6) {
                    password.style.border = "1px solid red";
                }
                else {
                    password.style.border = "1px solid #ced4da";
                };
            };
        };
    };
    return (
        <div className="container my-3">
            <h2 className='text-center'>iNotebook | Login</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="LoginemailAddress" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="LoginemailAddress" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="LoginPassword" className="htmlForm-label">Password</label>
                    <input type="password" className="form-control" id="LoginPassword" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={showPassword} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}
