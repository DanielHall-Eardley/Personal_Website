import React, {Component} from "react"
import {connect} from "react-redux"
import axios from "axios"
import UpdateContent from "./UpdateContent"
import {CSSTransition, TransitionGroup} from "react-transition-group"

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
    startIndex:0,
  }

  componentDidMount(){
    
    axios.get("/Search")
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
    method: "post",
    url: "/Secure"
  }).then(res=>{
  axios({
    method: "get",
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=${this.state.searchInput}&type=video&videoDefinition=high&fields=items(id%2Csnippet)&key=${res.data.youtubeApiKey}`
    }).then(res=>{
      axios({
        method: requestMethod,
        url:"/Search",
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
  })
  }

  scrollFunction = (direction)=>{
    if(direction === "left"){
      this.setState({
        scrollClass: "list_container_left",
        right:"right",
        startIndex:0,
      })
    }else if(direction === "right"){
      this.setState({
        scrollClass: "list_container_right",
        right:"secondRight",
        startIndex:3
      })
    }else if(direction === "secondRight"){
      this.setState({
        scrollClass: "list_container_second_right",
        left:"backLeft",
        startIndex:6
      })
    }else if(direction === "backLeft"){
      this.setState({
        scrollClass: "list_container_back_left",
        left:"left",
        startIndex:3
      })
    }
  } 

  videoTitle=()=>{
    const {startIndex, likeData} = this.state
    let i = startIndex
    let length = startIndex + 3
    let titleArray=[]
      for(i; i < length; i++){
        if(likeData[i] === undefined){
          let individualTitle = null
          titleArray.push(individualTitle)
        }else{
          let individualTitle = 
            <CSSTransition
              key={likeData[i].title}
              timeout={4000}
              classNames="video_title"
              appear={true}>
              <h3>{likeData[i].title}</h3>
            </CSSTransition>
          titleArray.push(individualTitle)
        }
      }
    return titleArray  
  }
  
render(){
    const {title, searchInput, likeData, scrollClass} = this.state
    const {loginState} = this.props

    return(
    <div className={"like_list"}>
      {loginState === true 
      ?
      <UpdateContent
      firstInputType="text"
      firstInputPlaceholder="Title"
      secondInputType="url"
      secondInputPlaceholder="Search Input"
      handleInput={this.handleInput}
      firstInputValue={title}
      secondInputValue={searchInput}
      submitMethod={this.submitMethod}/>  
      : 
      null}
        {window.innerWidth > 650 ?
        <div className="scroll_button_container">
          <button className="scroll_left button" onClick={()=>this.scrollFunction(this.state.left)}>Left</button>
          <TransitionGroup
          component={null}
          exit={false}>
            {likeData.length > 0 
            ?
            this.videoTitle()
            :
            null}
          </TransitionGroup>
          <button className="scroll_right button" onClick={()=>this.scrollFunction(this.state.right)}>Right</button> 
        </div>
        : null}
    <div className={scrollClass}>
      {likeData.map(video=>{
      return(
        <TransitionGroup
        component={null}
        exit={false}>
          <CSSTransition
            key={video._id}
            classNames="video"
            timeout={5000}
            appear={true}>
              <iframe className="video"
                key={video._id}
                src={`https://www.youtube.com/embed/${video.url}`}
                title={video.title}
                allowFullScreen={true}
                referrerPolicy="origin-when-cross-origin"
                frameBorder="0">
              </iframe>
          </CSSTransition>
        </TransitionGroup>
      )})}
    </div>
    </div>
    )
  }
}

let LikeList = connect(mapStateToProps)(ConnectedLikeList)

export default LikeList
