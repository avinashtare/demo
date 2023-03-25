import React from 'react'

export default function NotFound() {
    window.document.title = "Not Found | iNootbook";
    document.body.style.overflow = "hidden";

    return (
        <>
            <div style={{position: "absolute",top: 0,left: 0,width: "100%",height: "100vh",background:"#020202",display: "flex",alignItems: "center",justifyContent: "center"}}><h1 style={{color: "#525252",fontFamily:"-webkit-body"}}>404 | Not Found</h1></div>
        </>
    )
}