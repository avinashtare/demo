import React, { useContext, useEffect } from 'react';
import LoginContext from "../context/authentication/LoginContext";
import AlertContext from '../context/alert/AlertContext';
import { useCookies } from 'react-cookie';


export default function SignUp() {
    let host = "http://localhost:5000";
    const { isLogin, userLogin } = useContext(LoginContext);
    const { setAlert } = useContext(AlertContext);

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['session']);

    // cheaking login
    useEffect(() => {
        return async () => {
            // eslint-disable-next-line
            await userLogin();
            document.title = ("Sign Up | iNotebook");
        }
        // eslint-disable-next-line
    }, [])

    if (isLogin.login) { window.history.back() };

    // show password chackbox
    const showPassword = (e) => {
        let password = document.getElementById("SginUpPassword");
        let confirmPassword = document.getElementById("cPassword");
        if (e.target.checked) {
            password.type = "text";
            confirmPassword.type = "text";
        }
        else {
            password.type = "password";
            confirmPassword.type = "password";
        }
    };

    var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // SginUp function
    const handleSginUp = async (event) => {
        event.preventDefault();

        // geting email and password
        let SginUpfullName = document.getElementById("SginUpfullName");
        let emailAddress = document.getElementById("SignUpemaillAddress");
        let password = document.getElementById("SginUpPassword");
        let confirmPassword = document.getElementById("cPassword");
        // console.log(SginUpfullName.value, emailAddress.value, password.value, confirmPassword.value);

        // varifaction
        if (SginUpfullName.value.length >= 3 && emailAddress.value.match(validEmailRegex) && password.value.length >= 6 && confirmPassword.value.length >= 6) {

            if (password.value === confirmPassword.value) {
                SginUpfullName.style.border = "1px solid #ced4da";
                emailAddress.style.border = "1px solid #ced4da";
                password.style.border = "1px solid #ced4da";
                confirmPassword.style.border = "1px solid #ced4da";

                let data = { name: SginUpfullName.value, email: emailAddress.value, password: password.value };

                let url = `${host}/api/auth/createuser`;

                let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                let responseValue = await response.json();
                console.log(responseValue);

                if (responseValue.success) {
                    // validation
                    setAlert("success", "Your Account Crated Successfuly", true);
                    setTimeout(() => { setAlert("success", "", false) }, 5000);

                    emailAddress.style.border = "1px solid #ced4da";
                    // set cookies
                    // console.log(responseValue.success[0].authToken);
                    let authToken = (responseValue.success[0].authToken);

                    setCookie('SID', authToken, { path: '/' });

                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2000);
                }
                else {
                    if (responseValue.errors[0].value === "Email address is alredy exist!") {
                        emailAddress.style.border = "1px solid red";

                        setAlert("danger", responseValue.errors[0].value + " try to diffrent email.", true);
                        setTimeout(() => { setAlert("success", "", false) }, 5000);
                    }
                };
            }
            else {
                setAlert("danger", "Confirm Password Don't Match", true);
                setTimeout(() => { setAlert("success", "", false) }, 5000);
                confirmPassword.style.border = "1px solid red";
            }
        }
        else {
            // varification
            let SginUpfullName = document.getElementById("SginUpfullName");
            let emailAddress = document.getElementById("SignUpemaillAddress");
            let password = document.getElementById("SginUpPassword");
            let confirmPassword = document.getElementById("cPassword");


            if (SginUpfullName.value.length < 3 && !emailAddress.value.match(validEmailRegex) && password.value.length < 6 && confirmPassword.value.length < 6) {
                SginUpfullName.style.border = "1px solid red";
                emailAddress.style.border = "1px solid red";
                password.style.border = "1px solid red";
                confirmPassword.style.border = "1px solid red";

                setAlert("danger", "Please Fill All Fequired Fields", true);
                setTimeout(() => { setAlert("success", "", false) }, 5000);
            }
            else {

                if (SginUpfullName.value.length < 3) {
                    SginUpfullName.style.border = "1px solid red";
                }
                else {
                    SginUpfullName.style.border = "1px solid #ced4da";
                };

                if (!emailAddress.value.match(validEmailRegex)) {
                    emailAddress.style.border = "1px solid red";
                }
                else {
                    emailAddress.style.border = "1px solid #ced4da";
                };

                if (password.value.length < 6) {
                    password.style.border = "1px solid red";
                }
                else {
                    password.style.border = "1px solid #ced4da";
                };

                if (confirmPassword.value.length < 6) {
                    confirmPassword.style.border = "1px solid red";
                }
                else {
                    confirmPassword.style.border = "1px solid #ced4da";
                };
            };
        };
    };

    return (
        <div className="container my-3">
            <h2 className='text-center'>Sign Up | iNotebook</h2>
            <form>
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="SginUpfullName" className="htmlForm-label">Full Name</label>
                        <input type="text" className="form-control" id="SginUpfullName" />
                    </div>
                    <label htmlFor="SignUpemaillAddress" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="SignUpemaillAddress" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="htmlForm-label">Password</label>
                    <input type="password" className="form-control" id="SginUpPassword" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="htmlForm-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cPassword" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={showPassword} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSginUp}>Sign Up</button>
            </form>
        </div>
    )
}