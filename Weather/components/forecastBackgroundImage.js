
import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Image,
  View,
  ImageBackground
} from 'react-native';
export default class ForecastBackgroundImage extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var image;
    switch (this.props.icon) {
    case 'chanceflurries':
      image = require('./img/background/rain.gif');
      break;
    case 'chancerain':
    image = require('./img/background/rain.gif');
      break;
    case 'chancesleet':
    image = require('./img/background/rain.gif');
      break;
    case 'chancesnow':
    image = require('./img/background/rain.gif');
      break;
    case 'chancetstorms':
    image = require('./img/background/storm.gif');
      break;
    case 'clear':
    image = require('./img/clouds.jpg');
      break;
    case 'cloudy':
    image = require('./img/clouds.gif');
      break;
    case 'flurries':
    image = require('./img/background/storm.gif');
      break;
    case 'fog':
    image = require('./img/background/storm.gif');
      break;
    case 'hazy':
    image = require('./img/background/storm.gif');
      break;
    case 'mostlycloudy':
    image = require('./img/background/storm.gif');
      break;
    case 'mostlysunny':
    image = require('./img/background/sun.gif');
      break;
    case 'sleet':
    image = require('./img/background/storm.gif');
      break;
    case 'snow':
    image = require('./img/background/storm.gif');
      break;
    case 'sunny':
    image = require('./img/background/sun.gif');
      break;
    case 'tstorms':
    image = require('./img/background/storm.gif');
      break;
    case 'cloudy':
    image = require('./img/background/thunder.gif');
      break;
    case 'partlycloudy':
    image = require('./img/clouds.gif');
      break;
    case 'nt_chanceflurries':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_chancerain':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_chancesleet':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_chancesnow':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_chancetstorms':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_clear':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_cloudy':
    image = require('./img/background/cloudy-nt.gif');
      break;
    case 'nt_flurries':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_fog':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_hazy':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_mostlycloudy':
    image = require('./img/background/cloudy-nt.gif');
      break;
    case 'nt_mostlysunny':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_sleet':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_snow':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_sunny':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_tstorms':
    image = require('./img/background/storm.gif');
      break;
    case 'nt_cloudy':
    image = require('./img/background/cloudy-nt.gif');
      break;
    case 'nt_partlycloudy':
      image = require('./img/sunny.png');
      break;
  }
    return (
      <ImageBackground style={styles.picture} source={image}>
        {this.props.children}
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    opacity: 0.77
  },
});
