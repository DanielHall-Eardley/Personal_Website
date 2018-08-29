import React from "react"
import {Switch, Route, Link} from "react-router-dom"
import Login from "./Login"
import Email from "./Email"


const Footer = (props)=>{
  return(
    <div className="footer_container">
    <div className="footer">
      <a href="https://protected-savannah-70839.herokuapp.com/" 
      rel="noopener noreferrer" target="_blank">Audio App</a>
        <a href="https://expo.io/@danielhalleardley/youtube-search" 
      rel="noopener noreferrer" target="_blank">React Native App</a>
        <a href="https://github.com/DanielHall-Eardley" 
      rel="noopener noreferrer" target="_blank">GitHub</a>
      <Link to="Login">Edit information</Link>
      <Link to="Email">Message me!</Link>
      </div>
      <div className="login_container">
      <Switch>
      <Route path="/Login" render={(routerProps)=>(
      <Login {...routerProps}/>
      )}/>
      <Route path="/Email" render={(routerProps)=>(
      <Email {...routerProps}/>
      )}/>
    </Switch>
    </div>
    </div>
  )
}

export default Footer