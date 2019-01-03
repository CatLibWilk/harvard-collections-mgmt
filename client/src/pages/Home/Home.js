import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import MainContainer from "../../components/MainContainer";
import ScrollDiv from "../../components/ScrollDiv";
import Form from "../../components/Form";
import Button from "../../components/Button";
import Preloader from "../../components/Preloader"

import API from "../../utils/API";
import Logic from "../../utils/Logic";

import ScrollMagic from "scrollmagic";

import Chart from "chart.js"

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
                items: []
            },
            chart_percentage: 0,
            chart_made: false,
            first_load: 'true'
            
        }
    };

    componentDidMount(){

        if(localStorage.getItem('first_load')){
            console.log('found sth in localstorage')
            const loadState = localStorage.getItem('first_load')
            console.log(`localstorage value is: ${loadState}`)
            this.setLoadState(loadState)
        }

        setTimeout(this.loadWelcome, 500)

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
        
        const section4 = new ScrollMagic.Scene({
            triggerElement: '#section-4'
        })
          .setClassToggle('#section-4', 'fade-in')
          .addTo(this.controller);
        
    };

    setLoadState = (status) => {
        this.setState({first_load: status})
    }

    loadWelcome = () => {
        const tar = document.getElementById('welcome');
        if(tar){
            tar.classList.add('loaded')
        }
    }

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
            if(document.getElementById('welcome')){

                if(!document.getElementById('welcome').classList.contains('fade-out')){
                    document.getElementById('welcome').classList.add('fade-out')
                }
            }

            this.loadPreloader();
            API.harvest(this.state)
            .then(returned => {
                if(returned.data.message === "Please fill in atleast one query field."){
                    alert('Please fill in atleast one query field.')
                    this.hidePreloader();
                }else{
                    
                    if(returned.data.items == null || returned.data.items.mods.length == null){
                        this.handleError()
                    }else{
                    if(this.state.date_input){
                        console.log('dates search home.js')
                      
                        Logic.dateSort(returned.data, this.state.date_input)
                                .then(returned => {
                                    console.log(returned)
                                    const passToFormat = []
                                    returned.map(item => {
                                        passToFormat.push(item.data)
                                    })
                                    console.log(passToFormat)

                                    Logic.getBasicBib(passToFormat)
                                          .then(returned => {
                                              console.log(returned)
                                              const returnedData = {
                                                count: returned.length,
                                                items: returned
                                            };
                                            
                                            this.setState({returned_data: returnedData});
                                            this.scrollTo();
                                            this.hidePreloader();
                                          }) 
                                          //
                                })
                    }else{
                        console.log('no date facet home.js')
                        Logic.getBasicBib(returned.data)
                        .then(response => {
                            console.log(response)
                            if(response[0].title === 'No items found'){
                                console.log(`no items found`)
                                const failItem = {
                                    count: '0',
                                    items: [{
                                        author: 'No items returned',
                                        title: 'Please try a new search',
                                        pubDate: 'after clearing the form.'
                                    }]
                                }
                                this.setState({returned_data: failItem})
                                this.scrollTo();
                                this.hidePreloader();
                            }else{
                            const returnedData = {
                                count: returned.data.pagination.numFound,
                                items: response
                            };
                            
                            this.setState({returned_data: returnedData})
                            this.buildChart();
                            this.scrollTo();
                            this.hidePreloader();
                        }
                        });  
                    }
                }
                };
            });
    };
    
    handleClear = (e) => {
        e.preventDefault();
        const stateReset = {
            title_input: '',
            author_input: '',
            subject_input: '',
            medium_input: '',
            date_input: '',
            returned_data: {
                count: '',
                items: []
            }
        }
        this.setState(stateReset)
        document.getElementById('form').reset();
        const form = document.querySelector('#section-2').getBoundingClientRect();
        window.scrollTo({top: form.y+1100, behavior: 'smooth'});
        
        const tar = document.getElementById('wrapper')
        tar.classList.add('hide')


        
        

    };

    handleError = () => {
        // alert('no items found')
        this.hidePreloader();
        document.getElementById('error').classList.add('fade-in')
        setTimeout(function(){window.location.reload()}, 3000)
    }
    loadPreloader = () => {
        const tar = document.getElementById('preloader')

        tar.classList.add('preloader-fade')
    }

    hidePreloader = () => {
        const tar = document.getElementById('preloader');
        tar.classList.remove('preloader-fade')
    }
    closeWelcome = () => {
        localStorage.setItem('first_load', 'false')
        const tar = document.getElementById('welcome')
        tar.classList.add('fade-out')
    };


    buildChart = () => {
        if(document.getElementById('wrapper').classList.contains('hide')){
            document.getElementById('wrapper').classList.remove('hide')
        }

        const total = 15930353
        const returnValue = this.state.returned_data.count
        const label = `Query`
        const percentage = returnValue/total
       
        const prePerc = (percentage*100).toFixed(2)

        let perc

        if(prePerc[prePerc.length-1] === "0"){
            perc = prePerc.slice(0, prePerc.length-1)
        }else{
            perc = prePerc
        }

        this.setState({chart_percentage: perc, chart_made: true})


        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [`Other`, `${label}`],
                datasets: [{
                    label: '% of collection',
                    data: [`${total-returnValue}`, `${returnValue}`],
                    backgroundColor: [
                        'rgba(255, 168, 92, 1)',
                        'rgba(255, 218, 185, 1)',
                        
                    ],
                    borderColor: [
                        'rgba(255, 218, 185, 1)',
                        'rgba(255, 218, 185, 1)',
                        
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    animateRotate:true
                }
            }
            
        })
    
    };

    scrollTo = () => {
        const results = document.querySelector("#section-3").getBoundingClientRect();

            window.scrollTo({top: (results.y + 750), behavior: 'smooth'})

    }

    render(){
       
        return(
            <div>
                <Navbar id="home-nav"/>
                    {console.log(this.state.first_load)}
                    {this.state.first_load === 'true' ? <div id="welcome" className="col-6 p-4">
                        <span className="d-inline">
                        <h1 className="float-left">Welcome To CloudManager+</h1>
                        <div className="btn close-btn float-right" onClick={this.closeWelcome}>X</div>
                        </span>
                        <span className=".clearfix col-12">
                        <p className="mt-5">Use the form below to make queries against the Harvard LibraryCloud API. Query responses include a total of items matching your query, a subset of item information including 
                            Author/item title/publication date, and a set of basic data visualizations. Please note that due to API limitations, 
                            only 250 item records can be returned, so while overall result numbers reflect the number of item records in the collection that match your query,
                            searching with date limitations will reflect only a subset of items matching your query.  Also please note that the form must be cleared before each
                            new query.  
                        </p>
                        <p><i>Boolean operations are also unfortunately not possible within the current API</i></p>
                        </span>
                    </div> : ''}

                <MainContainer>
                    <div className="row">
                    <ScrollDiv id={"section-1"}>
                        <p>Welcome to Collection Management with LibraryCloud Item API</p>

                    </ScrollDiv>

                    </div>
                    
                    <div className="row">
                    <ScrollDiv id={"section-2"}>
                    <div id="error" className="col-6 p-4">
                        <span className="d-inline">
                        <h1 className="float-left">No Items were returned from your search or there was an error.  The page will reload.</h1>
                        </span>
                        
                    </div>
                    <Preloader />
                        <Form function={this.handleInput}
                            field1_text={"Title Query"}
                                field1_placeholder={"Introduction to Cataloging and Classification"}
                                field1_id={'title_input'}

                            field2_text={"Author"}
                                field2_id={'author_input'}

                            field3_text={"Medium"}
                                field3_id={'medium_input'}
                                dropdown_options={[
                                    {value:'fiction', text:'Fiction'},
                                    {value:'nonfiction', text:'Non-Fiction'}
                                ]}

                            field4_text={"Date Range"}
                                field4_id={'date_input'}
                                optionList_options={[{value:5, text:'Last 5 Years'}, {value:10, text:'Last 10 Years'}, {value:15, text:'Last 15 Years'}, {value:20, text:'Last 20 Years'}, {value:25, text:'Last 25 Years'}]}

                            field5_text={"Subject"}
                                field5_placeholder={"Library Sciences"}
                                field5_id={'subject_input'}

                        />
                        <Button id={'sub-btn'} width={"12"} text={'Search'} click={this.handleSubmit}/>
                        <Button id={'clear-btn'} width={"12"} text={'Clear'} click={this.handleClear}/>
                    </ScrollDiv>

                    </div>
                    <div className="row">
                        <ScrollDiv id={"section-3"}>
                            {(!this.state.returned_data.items[0] 
                                ? <div>No data Yet</div> 
                                : <div>
                                    <h2>Total Items found in the collection: {this.state.returned_data.count}</h2>
                                    {this.state.returned_data.items.map(item => {
                                        console.log(item)
                                        return(
                                            (item.author ? <p>{`${item.author}, ${item.title}, ${item.pubDate}`}</p> :
                                            item.title === 'No Items found' ? `` : <p>{`${item.title}, ${item.pubDate}`}</p>)
                                        )
                                        
                                    })}
                                  </div>
                             
                            )}

                        </ScrollDiv>
                        <ScrollDiv id={"section-4"}>
                                <div id="wrapper" className="pb-5">
                                    {this.state.chart_percentage > 0 ? <h1>Items matching your query make up {this.state.chart_percentage}% of the collection</h1> : this.state.chart_made !== false ? <h1>Items matching you query represent less than .01% of the collection.</h1> : ''}
                                    <canvas id="myChart"></canvas>
                                </div>

                        </ScrollDiv>
                    </div>
                </MainContainer>
            </div>
        )
    }
};


export default Home;
