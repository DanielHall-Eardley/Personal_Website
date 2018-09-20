import React from "react"
import {Switch, Route, Link, withRouter} from "react-router-dom"
import Login from "./Login"
import Email from "./Email"
import {toggleLogin} from "../redux/actions/ActionCreators"
import {connect} from "react-redux"

const mapStateToProps = state =>({
  loginState: state.loginReducer.loginState,
})

const ConnectedFooter = (props)=>{
  return(
    <div className="footer_container">
    <div className="footer">
      <a href="https://protected-savannah-70839.herokuapp.com/" 
      rel="noopener noreferrer" target="_blank">Audio App</a>
        <a href="https://expo.io/@danielhalleardley/youtube-search" 
      rel="noopener noreferrer" target="_blank">React Native App</a>
        <a href="https://github.com/DanielHall-Eardley" 
      rel="noopener noreferrer" target="_blank">GitHub</a>
      
      <Link to="/Login">Edit</Link>
      <Link to="/Email">Message me!</Link>
    
      </div>
      <div className="login_container">
      <Switch>
        <Route exact path="/Login" render={routerProps=>(
        <Login {...routerProps}/>)}/>
    
        <Route path="/Email" component={Email}/>
    </Switch>
    </div>
    </div>
  )
}

const Footer = connect(mapStateToProps)(ConnectedFooter)

export default withRouter(Footer)