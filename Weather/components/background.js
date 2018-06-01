/**
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  RefreshControl
} from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'
const renderForecastImage = require('./forecastimage')
import dateFormat from 'dateformat';
const today = dateFormat(new Date(), 'ddd d mmmm');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height -450;
class Background extends React.Component {
  constructor(props) {
    super(props);
  this.state = { cityName: this.props.cityName } ;
  }
  componentWillReceiveProps(next) {
    if (this.props.cityName !== next.cityName) {
      this.setState({
        cityName: next.cityName,
      });
    }
  }
   render() {
    var icon = this.props.icon;
     return (
       <Animated.View key={`background`} style={styles.headerViewAnimated}>
         <View style={styles.headerView}>
           <View>
             <Text style={styles.location}>{this.state.cityName}</Text>
             <Text style={styles.forecast}>{this.props.temperature}</Text>
           </View>
         <View style={styles.centerView}>
           <View style={styles.centerImageView}>
             { renderForecastImage(icon, 100, 100) }</View>
           <View>
             <Text style={styles.currentTemp}>{this.props.temperature}</Text>
             <Text style={styles.feelsLike}>Feels like </Text>
           </View>
         </View>
         <View style={styles.bottomView}>
           <View style={styles.bottomViewLeft}>
             <Text style={styles.bottomViewToday}>
               Today
             </Text>
             <Text style={styles.bottomViewTodayDate}>{ today }</Text>
           </View>
           <View style={styles.bottomViewRight}>
             <Text style={styles.low}>12</Text>
             <Text style={styles.high}>
                38
             </Text>
           </View>
         </View>
       </View>
         </Animated.View>
     );
   }
}
export default Background;

const styles = StyleSheet.create({
  headerViewAnimated: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  titleViewAnimated: {
    width: SCREEN_WIDTH,
    position: 'absolute'
  },
  headerView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  location: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 35,
    color: '#fff'
  },
  forecast: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 3,
    color: '#fff'
  },
  stickyHeaderView: {
    paddingTop: 24,
    paddingLeft: 12,
    flexDirection: 'row'
  },
  stickyHeaderLocation: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 6
  },
  stickyHeaderToday: {
    color: '#fff',
    fontSize: 16
  },
  centerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  centerImageView: {
    paddingRight: 20
  },
  currentTemp: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '200'
  },
  feelsLike: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500'
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 40
  },
  bottomViewLeft: {
    flex: 1,
    flexDirection: 'row'
  },
  bottomViewToday: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 6,
    fontSize: 16
  },
  bottomViewTodayDate: {
    color: '#fff',
    fontSize: 16
  },
  bottomViewRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  low: {
    color: '#fff',
    marginRight: 12,
    fontSize: 18,
    fontWeight: '300',
    width: 22,
    textAlign: 'right',
  },
  high: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    width: 24,
    textAlign: 'right',
  },
  childrenView: {
    top: -30
  }
});
