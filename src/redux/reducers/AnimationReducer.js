
let intialState = {
    animationState: "stop"
} 

const animationReducer = (state = intialState, action)=>{
    switch(action.type){
     case "animation":
     return state
     default:
     return state
    }  
}

export default animationReducer