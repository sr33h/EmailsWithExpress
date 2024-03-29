import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchSurveys } from '../../actions';


class SurveyList extends Component {


    componentDidMount(){
        this.props.fetchSurveys();

    }

    renderSurveys(){

        return this.props.surveys.map(survey => {
            return (
                <div key={survey._id}
                className="card darken-1 ">
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.subject}</p>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    
                </div>
            )
        })
    }


    render(){
        return (
                  <div>{this.renderSurveys()}</div>
        );
    }
}


function mapStateToProps(state){
    return {surveys: state.surveys}
}


export default connect(mapStateToProps, {fetchSurveys})(SurveyList);