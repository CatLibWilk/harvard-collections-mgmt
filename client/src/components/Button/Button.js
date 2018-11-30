import React from "react";

const Button = ({id, width, text, click}) => {
        return(
            <div id={id} className={`btn col-${width} mt-1`} onClick={click}>{text}</div>
        )
    };


export default Button;