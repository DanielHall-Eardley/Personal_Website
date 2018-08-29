import React from "react"

const UpdateContent = (props)=>{
  const {
    handleInput, 
    firstInputType,
    firstInputPlaceholder,
    secondInputType,
    secondInputPlaceholder,
    firstInputValue,
    secondInputValue,
    submitMethod,
  } = props
  return(
<div className="update_container">
<label>Update</label>
<input className="update_first_input" value={firstInputValue} 
type={firstInputType} placeholder={firstInputPlaceholder} onChange={handleInput}/>
<input className="update_second_input" value={secondInputValue} 
type={secondInputType} placeholder={secondInputPlaceholder} onChange={handleInput}/>
<button  onClick={()=>submitMethod("create")}  className="create_button">Create</button>
<button  onClick={()=>submitMethod("update")}  className="update_button">Update</button>
<button  onClick={()=>submitMethod("delete")}  className="delete_button">Delete</button>
</div>
)
}


export default UpdateContent
