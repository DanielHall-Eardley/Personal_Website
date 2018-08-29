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
    likeData:[]
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
  
  render(){
    const {title, searchInput, likeData} = this.state
    const {loginState} = this.props
    return(
    <div className="like_list">
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
    <div className="video_list"></div>
      {likeData.map(video=>(
      <div className="video_container">
      <iframe className="video"
      src={video.url}/>
      </div>
      ))}
    </div>
    )
  }
}

let LikeList = connect(mapStateToProps)(ConnectedLikeList)

export default LikeList
