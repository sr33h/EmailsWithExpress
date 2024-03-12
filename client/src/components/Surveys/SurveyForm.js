import React, { Component } from "react";
import {reduxForm, Field} from 'redux-form';
import SurveyField from "./SurveyField";
import _ from 'lodash';
import { Link } from "react-router-dom";
import validateEmail from "../../utils/validateEmail";
import FIELDS from "./formFields";



class SurveyForm extends Component {


   renderFields(){
     return (
        _.map(FIELDS, ({name,label}) => {
            return <Field component={SurveyField} type="text" name={name} label={label} key={name} />
        })
     )
   }

    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to='/surveys' className="red btn-flat white-text" >Cancel</Link>
                <button className="teal btn-flat right white-text" type="submit">Next
                <i className="material-icons right">done</i></button>
                </form>
            </div>
        )
    }
}

function validate(values){
  const errors = {};

  errors.recipients = validateEmail(values.recipients || '')

  _.forEach(FIELDS, ({name}) => {
    
      if(!values[name]){
          errors[name] = `You must provide a ${name}`
      }
  })

 

  return errors;
}

export default reduxForm({
    validate ,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);