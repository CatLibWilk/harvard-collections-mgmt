import React, { Component } from "react";

class Form extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <form id='form'>
            <div class="form-group">
                <label for="exampleFormControlInput1">{this.props.field1_text}</label>
                <input type="email" class="form-control" id="title_input" onChange={this.props.function} placeholder={this.props.field1_placeholder}></input>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">{this.props.field2_text}</label>
                <input type="email" class="form-control" id="author_input" onChange={this.props.function} placeholder={this.props.field2_placeholder}></input>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">{this.props.field5_text}</label>
                <input type="email" class="form-control" id="subject_input" onChange={this.props.function} placeholder={this.props.field5_placeholder}></input>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">{this.props.field3_text}</label>
                <select class="form-control" id="medium_input" onChange={this.props.function}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect2">{this.props.field4_text}</label>
                <select multiple class="form-control" id="date_input" onChange={this.props.function}>
                <option value={5}>Last 5 years</option>
                <option value={10}>Last 10 years</option>
                <option value={15}>Last 15 years</option>
                <option value={20}>Last 20 years</option>
                <option value={25}>Last 25 years</option>
                </select>
            </div>
            </form>
        )
    }
}

export default Form;