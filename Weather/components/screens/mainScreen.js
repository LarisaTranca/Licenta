import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Dimensions } from 'react-native';
import Background from '../background.js';

class Main extends React.Component {
  constructor(props) {
      super(props);
      this.state = { cityName: this.props.cityN } ;
    }

    componentWillReceiveProps(next) {
      if (this.props.cityN !== next.cityN) {
        this.setState({
          cityName: next.cityN,
        });
      }
    }
     render() {
       // if(this.state.cityName !== ''){
         return (
           <Background cityName={this.state.cityName}>
           </Background>
         )
       // }
     }
  }
export default Main;



const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   boldText: {
      fontSize: 30,
      color: 'red',
   }
})
