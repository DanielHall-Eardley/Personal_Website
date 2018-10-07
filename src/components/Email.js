import React, {Component} from "react"
import axios from "axios";

export default class Email extends Component{
  state={
    name:"", 
    email:"", 
    subject:"", 
    message:"",
  }

  handleEvent= (e)=>{
    switch(e.target.name){
      case "name":
        this.setState({
          name: e.target.value
        })
        break
      case "email":
        this.setState({
          email: e.target.value
        })
        break
      case "subject":
        this.setState({
          subject: e.target.value
        })
        break
      case "message":
        this.setState({
          message: e.target.value
        })
        break
    }
  }

  handleSubmit= async(e)=>{
    e.preventDefault()
    const {name, email, subject, message, } = this.state
    let sendEmail= {name:name, email:email, subject:subject, message:message}
    let result = await sendEmail
    axios({
      method:"post",
      url: "http://localhost:8080/Email",
      data: result
    }).then(res=>{
      alert(res.data)
      this.props.history.push("/")
    })
  }

  render(){
    const {form} = this.state
      return(
        <div className="email_container">
          <h3 className="sub_title"> Tell me a story</h3>
          <form onSubmit={this.handleSubmit} className="email_form">
            <input className="name" name="name" onChange={this.handleEvent}  placeholder="name"/>
            <input className="email" name="email" onChange={this.handleEvent}  placeholder="email"/>
            <input className="subject" name="subject" onChange={this.handleEvent}  placeholder="subject"/>
            <textarea className="message" name="message" onChange={this.handleEvent}  placeholder="message me!"></textarea>
            <button className="email_submit">Send Message!</button>
            <button className="home_button" onClick={()=>this.props.history.push("/")}>Back</button>
          </form>
        </div>
      )
  }
}