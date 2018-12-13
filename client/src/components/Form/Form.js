import React, { Component } from "react";

class Form extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <form id='form'>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">{this.props.field1_text}</label>
                <input type="email" className="form-control" id={this.props.field1_id} onChange={this.props.function} placeholder={this.props.field1_placeholder}></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">{this.props.field2_text}</label>
                <input type="email" className="form-control" id={this.props.field2_id} onChange={this.props.function} placeholder={this.props.field2_placeholder}></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">{this.props.field5_text}</label>
                <input type="email" className="form-control" id={this.props.field5_id} onChange={this.props.function} placeholder={this.props.field5_placeholder}></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">{this.props.field3_text}</label>
                <select className="form-control" id={this.props.field3_id} onChange={this.props.function}>
                <option value={''}>no medium specified</option>
                <option value={'fiction'}>Fiction</option>
                <option value={'nonfiction'}>Non-Fiction</option>
                {/* <option>3</option> */}
                {/* <option>4</option> */}
                {/* <option>5</option> */}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">{this.props.field4_text}</label>
                <select multiple className="form-control" id={this.props.field4_id} onChange={this.props.function}>
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