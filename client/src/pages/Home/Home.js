import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import MainContainer from "../../components/MainContainer";
import ScrollDiv from "../../components/ScrollDiv";
import Form from "../../components/Form";
import ScrollMagic from "scrollmagic";

import home_style from "./home-style.css";

class Home extends Component {

    constructor (props) {
        super(props)
        this.controller = new ScrollMagic.Controller();
    };

    componentDidMount(){

        const section1 = new ScrollMagic.Scene({
            triggerElement: '#section-1'
        })
          .setClassToggle('#section-1', 'fade-in')
          .addIndicators()
          .addTo(this.controller);

        const section2 = new ScrollMagic.Scene({
            triggerElement: '#section-2'
        })
          .setClassToggle('#section-2', 'fade-in')
          .addIndicators()
          .addTo(this.controller);
    };

   

    render(){
  
        return(
            <div>
                <Navbar id="home-nav"/>
                <MainContainer>
                    <div className="row">
                    <ScrollDiv id={"section-1"}>
                        <p>Welcome to Collection Management with LibraryCloud Item API</p>

                    </ScrollDiv>

                    </div>
                    
                    <div className="row">
                    <ScrollDiv id={"section-2"}>
                        <Form 
                            field1_text={"Title Query"}
                                field1_placeholder={"Introduction to Cataloging and Classification"}

                            field2_text={"Author"}

                            field3_text={"Medium"}

                            field4_text={"Date Range"}

                            field5_text={"Subject"}
                                field5_placeholder={"Library Sciences"}

                        />

                    </ScrollDiv>

                    </div>
                </MainContainer>
            </div>
        )
    }
};


export default Home;
