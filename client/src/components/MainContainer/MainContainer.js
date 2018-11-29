import React from "react";

const MainContainer = (props) => {
    return(
        <div className="main-container container-fluid">
            {props.children}
        </div>
    )
}

export default MainContainer;