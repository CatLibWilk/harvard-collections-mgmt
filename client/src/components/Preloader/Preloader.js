import React, { Component } from "react";
import Spin from "../../assets/preloader.gif";

const Preloader = () => {
    return (
        <div id="preloader">
            <img src={Spin}></img>
        </div>
    )
}

export default Preloader;