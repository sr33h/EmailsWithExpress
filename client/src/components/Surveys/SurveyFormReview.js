import React from "react";
import _ from 'lodash';
import {connect} from 'react-redux';
import FIELDS from "./formFields";
import {withRouter} from 'react-router-dom'
import * as actions from '../../actions';


const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const formFields = _.map(FIELDS, ({name,label}) => {
        return (
            <div key={name}>
            <label>{label}</label>
            <div>{formValues[name]}</div>
        </div>
        )
    })
    
        return (
            <div>
                <h5>Confirm your entries</h5>
                  {formFields}
                <button
                  className="yellow darken-3 white-text btn-flat"
                  onClick={onCancel}
                >Back</button>
                <button 
                className="btn-flat green right white-text"
                onClick={() => submitSurvey(formValues, history)}>
                    Send Survey
                    <i className="material-icons right">email</i>
                </button>
            </div>
        )
    }


    function mapStateToProps(state){
       return {
        formValues: state.form.surveyForm.values
       }
    }

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));