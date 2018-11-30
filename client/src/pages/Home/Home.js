import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import MainContainer from "../../components/MainContainer";
import ScrollDiv from "../../components/ScrollDiv";
import Form from "../../components/Form";
import Button from "../../components/Button";
import API from "../../utils/API";

import ScrollMagic from "scrollmagic";

import home_style from "./home-style.css";

class Home extends Component {

    constructor (props) {
        super(props)
        this.controller = new ScrollMagic.Controller();
        this.state = {
            title_input: '',
            author_input: '',
            subject_input: '',
            medium_input: '',
            date_input: '',
            returned_data: {
                count: '',
                title: ''
            }
        }
    };

    componentDidMount(){

        const section1 = new ScrollMagic.Scene({
            triggerElement: '#section-1'
        })
          .setClassToggle('#section-1', 'fade-in')
          .addTo(this.controller);

        const section2 = new ScrollMagic.Scene({
            triggerElement: '#section-2'
        })
          .setClassToggle('#section-2', 'fade-in')
          .addTo(this.controller);
        
        const section3 = new ScrollMagic.Scene({
            triggerElement: '#section-3'
        })
          .setClassToggle('#section-3', 'fade-in')
          .addTo(this.controller);
    };

    handleInput = (e) => {

        switch (e.target.id) {
            case "title_input":
                this.setState({title_input: e.target.value})
                break;
            case "author_input":
                this.setState({author_input: e.target.value})
                break;
            case "subject_input":
                this.setState({subject_input: e.target.value})
                break;
            case "medium_input":
                this.setState({medium_input: e.target.value})
                break;
            case "date_input":
                this.setState({date_input: e.target.value})
                break;
        };
    };

    handleSubmit = (e) => {
        e.preventDefault();
        API.harvest(this.state)
            .then(returned => {
                if(returned.data.message === "Please fill in atleast one query field."){
                    alert('Please fill in atleast one query field.')
                }else{
                    // console.log(returned.data)
                    const returnedData = {
                        count: returned.data.pagination.numFound,
                        title: returned.data.items.mods[0].titleInfo.title,

                    }
                    this.setState({returned_data: returnedData})
                };
            });
    };

    handleClear = (e) => {
        e.preventDefault();
        document.getElementById('form').reset();
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
                        <Form function={this.handleInput}
                            field1_text={"Title Query"}
                                field1_placeholder={"Introduction to Cataloging and Classification"}

                            field2_text={"Author"}

                            field3_text={"Medium"}

                            field4_text={"Date Range"}

                            field5_text={"Subject"}
                                field5_placeholder={"Library Sciences"}

                        />
                        <Button id={'sub-btn'} width={"12"} text={'Search'} click={this.handleSubmit}/>
                        <Button id={'clear-btn'} width={"12"} text={'Clear'} click={this.handleClear}/>
                    </ScrollDiv>

                    </div>
                    <div className="row">
                        <ScrollDiv id={"section-3"}>
                            {(this.state.returned_data.title === '' 
                                ? <div>No data Yet</div> 
                                : <div>
                                    <p>Items found in the collection: {this.state.returned_data.count}</p>
                                    <p>First Title Returned: {this.state.returned_data.title}</p>

                                  </div>
                            )}

                        </ScrollDiv>
                    </div>
                </MainContainer>
            </div>
        )
    }
};


export default Home;
