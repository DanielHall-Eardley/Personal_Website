import React, { Component } from 'react';
import AnimatedTitle from "./components/AnimatedTitle.js"
import Summary from "./components/Summary.js"
import Details from "./components/Details.js"
import LikeList from "./components/LikeList.js"
import Footer from "./components/Footer.js"
import Title from "./components/Title"
import TitlePlaceholder from "./components/TitlePlaceholder"
import MobileTitle from "./components/MobileTitle"
import './App.css';

class App extends Component {

  state={
    animationState: false
  }

  animationFunction = ()=>{
    this.setState((prevState, props)=>{
      return{
        animationState:!prevState.animationState
      }
    })
  }

  titleFunction = ()=>{
    const {animationState} = this.state
    let width = window.innerWidth
      if(width < 650){
        return <MobileTitle/>
      }else if(animationState === true){
        return <AnimatedTitle
        animationState={animationState}
        animationFunction={this.animationFunction}/>
      }else if(animationState === false){
        return <TitlePlaceholder
        animationFunction={this.animationFunction}/>
    }
  }

  render() {
    return (
   <div>
    {this.titleFunction()}
    <Summary/>
    
    <Title title="Power Levels"/>
    <Details/>
    
    <Title title="Stuff I Like"/>
    <LikeList/>

    <Title title="Links and Contact Information"/>
    <Footer/>

   </div>
    );
  }
}

export default App;
