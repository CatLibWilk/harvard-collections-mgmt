import React, { Component } from "react";

class ScrollDiv extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        return(
                <div id={this.props.id} className="section mt-1 col-12">
                    {this.props.children}
                </div>
        )
    }
}

export default ScrollDiv;