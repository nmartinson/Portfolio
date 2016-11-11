import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Styles  from '../styles';

class ContactForm extends React.Component {
  constructor(){
    super();
    this.state = {
      email: null,
      loading:false,
      subject: null,
      body: null,
      first_name: null,
      last_name: null
    }
  }

  handleFirstNameChange(e) {
    this.setState({ first_name: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ last_name: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

    handleSubjectChange(e) {
    this.setState({ subject: e.target.value });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }


  handleOnSubmit(e){
    e.preventDefault();
    const { email, subject, body, first_name, last_name} = this.state;
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/emails`
    axios.post(path, 
      {
        email: email,
        subject: subject,
        body: body,
        name_first: first_name,
        name_last: last_name
      })
      .then( function(response) {
        console.log('success')
        console.log(response)
        window.location = `/`
      }.bind(this))
      .catch((error) => {
        console.log("Error in send email: ", error);
      });
  }

  componentDidMount(){
    const { photo_id, name } = this.props.params;
    if(name != undefined){
      this.setState({subject: `[Photo name: ${name}]`})
    }
  }

  componentWillReceiveProps(nextProps){
    //handle new props

  }
  render(){
    const { primaryPhotos, loading, subject } = this.state;

    if(loading){
      return <p>Loading</p>
    } else {
      return (
        <div>
          <form className="col-md-6 col-md-offset-3">
              <div className="row">
                <div className="form-group col-xs-6">
                  <input id="firstname" className="form-control input-group-lg" type="text" name="firstname" onChange={(x) => {this.handleFirstNameChange(x) }} placeholder="First name"/>
                </div>
                <div className="form-group col-xs-6">
                  <input id="lastname" className="form-control input-group-lg" type="text" name="lastname" onChange={(x) => {this.handleLastNameChange(x) }} placeholder="Last name"/>
                </div>      
              </div>
              <div className="form-group">
                <input required='required' type="email" className="form-control" id="email" placeholder="Email" onChange={(x) => {this.handleEmailChange(x) }} />         
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="subject"  value={subject != null && subject != '' ? subject : ""} placeholder="Subject" onChange={(x) => {this.handleSubjectChange(x) }} /> 
              </div>
              <div className="form-group">
                <input type="textarea" className="form-control" id="body" placeholder="Message" onChange={(x) => {this.handleBodyChange(x) }} />    
              </div>
              <button onClick={(x) => {this.handleOnSubmit(x)}}>Send</button>
          </form>   
        </div>   
      )
    }
  }
}

export default ContactForm;

 // value={this.state.subject != null || this.state.subject != '' ? this.state.subject :"Subject"}