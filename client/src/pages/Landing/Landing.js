import React, { Component } from "react";
import {Link} from "react-router-dom";
import landing_style from "./landing-style.css";

class Landing extends Component {

    constructor (props) {
        super(props);
    
    };



    componentDidMount(){
        setTimeout(this.loadJumbo, 1000);

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
            <div class="container-fluid">
                <div class="row">
                <div class="col-10 col-md-12">
                    <div class="jumbotron jumbotron-fluid vertical-center">
                        <div class="container">
                            <h1 class="display-4">CloudManager+</h1>
                            <p class="lead">Collections Management Tool utilizing Harvard LibraryCloud API.</p>
                        </div>
                    </div>
                </div>
                </div>
                <div class="row">
                    <div class="col-12 justify-content-center">
                    <Link to={"/home"}>
                        <div id="enter-btn" class="btn btn-primary mx-auto">Enter</div>
                    </Link>
                    </div>
                </div>
            </div>
        )
    }
};


export default Landing;
