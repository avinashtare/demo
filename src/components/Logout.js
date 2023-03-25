import React from 'react';
import { useCookies } from 'react-cookie';

export default function Logout() {
    document.title = ("Logout | iNotebook");

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['session']);

    removeCookie('SID');

    window.location.href = "/signup";
    return (
        <h1>iNoteBook | Logout</h1>
    )
}
