import {connect} from "react-redux"
import {toggleLogin} from "../redux/actions/ActionCreators"
import React, { Component } from 'react';
import {Link} from "react-router-dom"
const config = require("../config.js")
const mapDispatchToProps = dispatch =>({
    toggleLogin: payload => dispatch(toggleLogin(payload))
})

class ConnectedLogin extends Component{
    state={
        title: "Login to edit information",
        password:""
    }

    handleChange=(e)=>{
      this.setState({
          password: e.target.value
      })
    }

    handleSubmit=(e)=>{
       e.preventDefault()
       if(this.state.password === config.hardcodedPassword){
        this.props.toggleLogin(true) 
        this.setState({
            password:""
        },()=>{this.props.history.push("/")})
       }else{
        this.setState({
            title:"Nice try, but there can only be one",
            password:""
        })
       } 
    }

    componentDidMount(){
      let formContainer = document.querySelector(".form_container")
        return formContainer.scrollIntoView({
          behavior:"smooth" 
        })
    }
    
    render(){
        const {title} = this.state
        const {getText, toggleLogin} = this.props
        return(
        <form className="form_container" onSubmit={this.handleSubmit}>
        <label className="login_title">{title}</label>
           <input className="login_text" type="password" onChange={this.handleChange} 
           value={getText} placeholder="Password"/>
           <button className="login button" type="submit">Login</button>
           <Link to="/" className="home_login button" 
           onClick={()=>toggleLogin(false)}>Logout</Link>
       </form>
        )
    }
}

const Login = connect(null, mapDispatchToProps)(ConnectedLogin)

export default Login