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
            {this.props.dropdown_options ? <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">{this.props.field3_text}</label>
                <select className="form-control" id={this.props.field3_id} onChange={this.props.function}>
                <option value={''}>no medium specified</option>
                
                {this.props.dropdown_options.map(option => {
                    return <option value={option.value}>{option.text}</option>
                })}
               
                </select>
            </div> : ''}
            
            {this.props.optionList_options ? 

                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">{this.props.field4_text}</label>
                    <select multiple className="form-control" id={this.props.field4_id} onChange={this.props.function}>
                    {this.props.optionList_options.map(option => {
                        return <option value={option.value}>{option.text}</option>
                    })}
                    </select>
                </div> : ''
            }
            </form>
        )
    }
}

export default Form;