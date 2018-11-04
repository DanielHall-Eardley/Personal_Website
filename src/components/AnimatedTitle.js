import React, {Component} from "react"
import "../App.css"


class AnimatedTitle extends Component{

  state={
    animationRpm: null,
    animationCover: null,
    mute: "/mute.png",
  }

  startAnimation =()=>{
    let hellcat = document.querySelector("audio")
    this.setState({
      animationCover:"cover_box",
      animationRpm:"animated_rpms"
    },()=>hellcat.play())
    hellcat.onended = ()=>{
      this.setState({
        animationCover:null,
        animationRpm:null,
      })
    }
  }
  
  muteSound = (e)=>{
    let hellcat = document.querySelector("audio")
      if(this.state.mute === "/mute.png"){
        hellcat.muted = true
        this.setState({mute:"/unmute.png"})
      }else if(this.state.mute === "/unmute.png"){
        hellcat.muted = false
        this.setState({mute:"/mute.png"})
      }
  }

  componentDidMount(){
    this.startAnimation()
  }

  replay = (e)=>{
    this.startAnimation()
  }

  render(){ 
    return(
      <div className="title_container">
        <audio>
        <source src ="/hellcat_sounds.mp3"/>
        Your browser does not support this audio type.
        </audio>
        <h1 className="title_name">Daniel Hall Eardley</h1>
        <div className={this.state.animationRpm}></div>
        <div className={this.state.animationCover}></div>
        {this.state.animationRpm === null ?
        <img height="15" width="15" className="replay" src="/replay.png" alt="replay icon" onClick={()=>this.replay()}/>
        : null}
        <img height="20" width="20" className="mute" src={this.state.mute} alt="mute icon" onClick={()=>this.muteSound()}/>
      </div>
    )
  }
}
export default AnimatedTitle