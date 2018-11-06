import React, {Component} from "react"
import {connect} from "react-redux"
import {toggleHeight} from "../redux/actions/ActionCreators"
import UpdateContent from "./UpdateContent"
import axios from "axios"

const mapStateToProps = state =>({
  loginState: state.loginReducer.loginState,
  toggleState: state.toggleReducer.toggleState,
})

const mapDispatchToProps = dispatch =>({
  toggleHeight: payload => dispatch(toggleHeight(payload))
})


class ConnectedDetails extends Component{
state={
  skillData:[],
  name: "",
  level: 0,
}

componentDidMount(){
  axios.get("/Update")
  .then((res)=>{
    this.setState({
      skillData: res.data
    })
  })
}

handleInput=(e)=>{
  if(e.target.type === "text"){
    this.setState({
      name:e.target.value
    })
  }else if(e.target.type==="number"){
    this.setState({
      level: e.target.value
    })
  }
}

submitMethod = (method)=>{
  let requestMethod=""
  if(method ==="create"){
    requestMethod = "post"
  }else if(method === "update"){
    requestMethod = "put"
  }else if(method === "delete"){
    requestMethod = "delete"
  }
axios({
  method: requestMethod,
  url: "/Update",
  data: {
    name: this.state.name,
    level: this.state.level,
  }
})
.then((res)=>{
this.setState({
  skillData: res.data
})
})
}

toggleDetails= ()=>{
  if(this.props.toggleState === "expand"){
    return this.props.toggleHeight("shrink")
  }else if(this.props.toggleState === "shrink"){
    return this.props.toggleHeight("expand")  
  }
}

powerLevel=(level)=>{
  let divArray = []
  for(let i = 0; i < 10; i++){
  divArray.push(<div className={ i <= level-1 ? "skill_level highlight" : "skill_level"}></div>)
  }
  return divArray
}

  render(){
    const {skillData, name, level} = this.state
    const {toggleState, loginState,} = this.props
    return(
    <div s className={toggleState === "expand" ? "details_container" : "details_container_expanded"}>
      {loginState === true ?
      <UpdateContent
        firstInputType="text"
        firstInputPlaceholder="Name of Skill"
        secondInputType="number"
        secondInputPlaceholder="Level of Skill"
        handleInput={this.handleInput}
        firstInputValue={name}
        secondInputValue={level}
        submitMethod={this.submitMethod}/> 
      : null}
      <div className="edit_button_container">
        <button className="expand_shrink button" onClick={this.toggleDetails}>
          {toggleState}
        </button>
      </div>
  
      {skillData.map(skill =>(
        <div key={skill._id} className="skill_table">
          <p className="skill_name">{skill.name}</p> 
          <div className="skill_stat">{this.powerLevel(skill.level)}</div>
        </div>
      ))}
    </div>
    )
  }
}

const Details = connect(mapStateToProps, mapDispatchToProps)(ConnectedDetails)

export default Details