import React from "react"
import "../App.css"

const Title = (props)=>{
    return(
        <div className="sub_title_container">
        <h3 className="sub_title_text">{props.title}</h3>
        </div>
    )
}

export default Title