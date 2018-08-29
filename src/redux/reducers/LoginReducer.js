
let intialState={
    loginState: false
}

const loginReducer = (state=intialState, action)=>{
 
    switch (action.type){
    case "toggleLogin":
    return {...state, loginState:action.payload}
    default:
    return state
  }
}

export default loginReducer