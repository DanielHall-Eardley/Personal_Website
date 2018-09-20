import React, {Component} from "react"
import config from "../config.js"
import {connect} from "react-redux"
import axios from "axios"
import UpdateContent from "./UpdateContent"

const mapStateToProps = state =>({
  loginState: state.loginReducer.loginState
})

class ConnectedLikeList extends Component{
  state={
    title:"",
    searchInput:"",
    likeData:[],
    scrollClass: "list_container"
  }

  componentDidMount(){
    axios.get("http://localhost:8080/Search")
    .then((res)=>{
    this.setState({
      likeData:res.data
    })
    })
  }
  
  handleInput=(e)=>{
  if(e.target.type === "text"){
    this.setState({
      title: e.target.value
    })
  }else if(e.target.type==="url"){
    this.setState({
      searchInput: e.target.value
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
    method: "get",
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=${this.state.searchInput}&type=video&videoDefinition=high&fields=items(id%2Csnippet)&key=${config.youtubeApiKey}`
    }).then(res=>{
      console.log(res.data)
      axios({
        method: requestMethod,
        url:"http://localhost:8080/Search",
        data:{
        title: this.state.title,
        url: res.data.items[0].id.videoId, 
        urlPictue: res.data.items[0].snippet.thumbnails.high.url,
        }
      }).then(res=>{
        this.setState({
          likeData: res.data
        })
      })
    })
  }

  scrollFunction = (direction)=>{
  if(direction === "left"){
    this.setState({
      scrollClass: "list_container_left"
    })
  }else if(direction === "right"){
    this.setState({
      scrollClass: "list_container_right"
    })
  }
  } 
  
render(){
    const {title, searchInput, likeData, scrollClass} = this.state
    const {loginState} = this.props

    return(
    <div className={"like_list"}>
     {loginState === true ?
      <UpdateContent
      firstInputType="text"
      firstInputPlaceholder="Title"
      secondInputType="url"
      secondInputPlaceholder="Search Input"
      handleInput={this.handleInput}
      firstInputValue={title}
      secondInputValue={searchInput}
      submitMethod={this.submitMethod}
      /> : null}
      
      <div className={scrollClass}>
      <button className="scroll_button_left" onClick={()=>this.scrollFunction("left")}>Left</button>
      <button className="scroll_button_right" onClick={()=>this.scrollFunction("right")}>Right</button> 
      {likeData.map(video=>{
      return(
        <iframe className="video"
        id={video._id}
        src={`https://www.youtube.com/embed/${video.url}`}
        title={video.title}
        allowFullScreen={true}
        referrerPolicy="origin-when-cross-origin"
        frameBorder="0">
         </iframe>
      
      )})}
    </div>
    </div>
    )
  }
}

let LikeList = connect(mapStateToProps)(ConnectedLikeList)

export default LikeList
