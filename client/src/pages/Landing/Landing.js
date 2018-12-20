import React, { Component } from "react";
import {Link} from "react-router-dom";
import landing_style from "./landing-style.css";

class Landing extends Component {

    constructor (props) {
        super(props);
    
    };



    componentDidMount(){
        setTimeout(this.loadJumbo, 1000);
        localStorage.clear()

    };

    loadJumbo = () => {
        const tar = document.querySelector('.jumbotron')
        tar.classList.add('loaded')
        setTimeout(this.loadBtn, 3000)
    };


    loadBtn = () => {
        const tar = document.getElementById('enter-btn')
        tar.classList.add('loaded')
        localStorage.setItem('viewed', 'true')
    };

    render(){
  
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-10 col-md-12">
                    <div className="jumbotron jumbotron-fluid vertical-center">
                        <div className="container">
                            <h1 className="display-4">CloudManager+</h1>
                            <p className="lead">Collections Management Tool utilizing Harvard LibraryCloud API.</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="row">
                    <div className="col-12 justify-content-center">
                    <Link to={"/home"}>
                        <div id="enter-btn" className=" btn mx-auto">Enter</div>
                    </Link>
                    </div>
                </div>
            </div>
        )
    }
};


export default Landing;
