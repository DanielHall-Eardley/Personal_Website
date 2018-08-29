import React, { Component } from 'react';
import AnimatedTitle from "./components/AnimatedTitle.js"
import Summary from "./components/Summary.js"
import Details from "./components/Details.js"
import LikeList from "./components/LikeList.js"
import Footer from "./components/Footer.js"
import Title from "./components/Title"
import './App.css';

class App extends Component {
  render() {
    return (
   <div>
    <AnimatedTitle/>

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
