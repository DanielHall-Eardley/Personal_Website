import React from "react"
import "../App.css"

const TitlePlaceholder = (props)=>{
    return(
      <div className="title_container">
        <button onClick={()=>props.animationFunction()} className="ignition"><b>Ignition</b></button>
      </div>
    )
}

export default TitlePlaceholder