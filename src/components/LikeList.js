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
    scrollClass: "list_container",
    right: "right",
    left: "left",
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
        scrollClass: "list_container_left",
        right:"right"
      })
    }else if(direction === "right"){
      this.setState({
        scrollClass: "list_container_right",
        right:"secondRight"
      })
    }else if(direction === "secondRight"){
      this.setState({
        scrollClass: "list_container_second_right",
        left:"backLeft",
      })
    }else if(direction === "backLeft"){
      this.setState({
        scrollClass: "list_container_back_left",
        left:"left",
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
      submitMethod={this.submitMethod}/>  
      : null}
        <div className="scroll_button_container">
          <button className="scroll_button_left" onClick={()=>this.scrollFunction(this.state.left)}>Left</button>
          <button className="scroll_button_right" onClick={()=>this.scrollFunction(this.state.right)}>Right</button> 
        </div>
      <div className={scrollClass}>
    
      {likeData.map(video=>{
      return(
        <iframe className="video"
        id={video._id}
        src={`https://www.youtube.com/embed/${video.url}?iv_load_policy=3&modestbranding=1`}
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
