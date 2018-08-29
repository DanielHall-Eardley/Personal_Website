
let intialState={
    toggleState: "expand"
}

const toggleReducer = (state = intialState, action)=>{
 
    switch (action.type){
    case "toggleHeight":
    return {...state, toggleState:action.payload}
    default:
    return state

    }
}

export default toggleReducer