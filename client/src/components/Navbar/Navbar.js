import React from "react";


const Navbar = (props) => {
    return (

        <nav id={props.id} className="navbar navbar-light">
        <a className="navbar-brand">CloudManager</a>
    </nav>
    );
};


export default Navbar