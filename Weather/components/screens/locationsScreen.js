import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Animated, Dimensions, Image, Title, Subtitle, ImageBackground, FlatList,   TouchableHighlight,
  TouchableNativeFeedback, Button} from 'react-native';
import { Container, Header, Content, Text } from 'native-base';
import { List, ListItem, ListView } from 'react-native-elements'
import Wallpaper from '../Wallpaper';
import * as css from "../transitions/Styles";
// import {listData} from "../transitions/Data";
import {Icon} from "react-native-elements";
import Icon2 from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import api from './Login/api';
import Location from '../transitions/Location';
export default class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      time:'',
      listData: []
    }
    this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
    this.onPress = this.onPress.bind(this);
    // this.getTime = this.getTime.bind(this);
  }
    navigatorButtons = (navigator) => {
    return {
      leftButtons: [
        {
          id: 'custom-button',
          component: 'CustomButton',
          passProps: {
            text: 'Hi!',
            navigator
          }
        }
      ]
    };
  }
  componentDidMount(){
    var user_id = JSON.parse(this.props.userInfo).id;
    api.locations({'user_id': user_id}).then(function(result){
      this.setState({listData:result.locations});
    }.bind(this));
  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
  }
  onPress(){
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {

    var user_id = JSON.parse(this.props.userInfo).id;
    var data = {
      user_id: user_id,
      location: JSON.stringify(place),
      temperature: 20,
      unit: 'C'
    };
    api.locationAdd(data).then(function(result){
      api.locations({'user_id': user_id}).then(function(result){
        this.setState({listData:result.locations});
      }.bind(this));
    }.bind(this));
    // place represents user's selection from the
    // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  renderRow =(item) => (
    <Location {...item}/>
  );
  render () {
    return (
     <View style={css.home_screen.v_container}>
      <FlatList
          style={css.home_screen_list.container}
          data={this.state.listData}
          renderItem={this.renderRow}
        />
        <View style={styles.container}>
        <TouchableHighlight
         style={styles.button}
         onPress={this.onPress}
        >
         <Icon2 name='md-add' size={20} style={styles.icon}/>
        </TouchableHighlight>
        </View>
        </View>
   );
  }
}
styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  icon:{
    fontSize: 26,
    color: 'white'
  },
button: {
  borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       flexDirection: 'row',
       justifyContent:'center',
       marginRight: 10,
       width:60,
       height:60,
       backgroundColor:'rgba(111, 202, 186, 1)',
       borderRadius:100,
  },
  container:{
    flex:0,
    alignSelf: 'flex-end',
  }
})
