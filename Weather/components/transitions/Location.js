import React from 'react';
import { View, ActivityIndicator, StyleSheet, Animated, Dimensions, Image, Title, Subtitle, ImageBackground, FlatList,   TouchableHighlight,
  TouchableNativeFeedback, Button, Text} from 'react-native';
  import { Container, Header, Content } from 'native-base';
import * as css from "./Styles";
import api from '../screens/Login/api';
import {Icon} from "react-native-elements";
var googleMapsClient = require('react-native-google-maps-services').createClient({
  key: 'AIzaSyBDfYplegsFdLGE5GYwHaSDy1pi40iHCWI'
});

class Location extends React.Component {
  constructor(props){
    super(props);
    console.log(props, "PROPS");
    this.state ={
      location: '',
      temperature: '',
      time:''
    }
  }
  componentDidMount(){
    var place = this.props.item.location;
    var location = JSON.parse(place).addressComponents.locality;
    location = location.replace(/\u21b5/g, "");
    var lat = JSON.parse(place).latitude;
    var long = JSON.parse(place).longitude;
    var time;
    const temperature = css.addDegreesToEnd(this.props.item.temperature);
    this.setState({location: location});
    setTimeout(async () => {
    var targetDate = new Date();
    time =  await api.getTimezone(lat,long, googleMapsClient).then(function(response){
      return response;
    });
   var splitedTime = time.split(',');
   var result;
   if(splitedTime[splitedTime.length -1].charAt(0) === ' '){
    result = splitedTime[splitedTime.length -1].substr(1);
   }
   this.setState({time: result});
   api.getWeather(lat,long).then(function(result){
    var hour = time.split(':');
    var findTemp = result.filter(function(fctime){
      return fctime.FCTTIME.hour == targetDate.getHours();
    })[0].temp.metric;
    const temperature = css.addDegreesToEnd(findTemp);
    this.setState({temperature: temperature});
   }.bind(this));
  },500);
  }
  render() {
    if (require('react-native').Platform.OS === 'ios') {
      return(
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={css.colors.transparent_white}
      >
        <View style={css.home_screen_list.row}>
        <View style={css.home_screen_list.row_cell_timeplace}>
        <Text style={css.home_screen_list.row_time}>{this.state.time}</Text>
          <Text style={css.home_screen_list.row_place}>{this.state.location}</Text>
        </View>
        <Icon color={'#464646'} size={css.values.small_icon_size} name={'ios-moon-outline'}
              type={'ionicon'}/>
        <Text style={css.home_screen_list.row_cell_temp}>{this.state.temperature}</Text>
      </View>
      </TouchableHighlight>
      );
    }
    else 
      {
        return (
      <TouchableNativeFeedback
        useForeground={true}
      >
        <View style={css.home_screen_list.row}>
        <View style={css.home_screen_list.row_cell_timeplace}>
        <Text style={css.home_screen_list.row_time}>{this.state.time}</Text>
          <Text style={css.home_screen_list.row_place}>{this.state.location}</Text>
        </View>
        <Icon color={'#464646'} size={css.values.small_icon_size} name={'ios-moon-outline'}
              type={'ionicon'}/>
        <Text style={css.home_screen_list.row_cell_temp}>{this.state.temperature}</Text>
      </View>
      </TouchableNativeFeedback>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Location;