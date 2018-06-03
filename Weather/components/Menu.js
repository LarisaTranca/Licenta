import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, 	Animated, Easing,StyleSheet, Image } from 'react-native';
import Logo from './Logo';
import Wallpaper from './Wallpaper';
// import { Actions, ActionConst } from 'react-native-router-flux';

const menuList = require('./Constants.js');

export default class Menu extends Component {
  constructor(props){
    super(props);
    this.state ={
      temp: ''
    }
    this._onPressSettings = this._onPressSettings.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
  }
  onNavigationEvent(event) {
    if (event.type == 'DeepLink') {
      if(event.link == 'temperature'){
        this.props.navigator.showModal({
          screen: 'Temperature',
          title: 'Temperature',
          overrideBackPress: true,
          navigatorStyle: {
              navBarButtonColor: '#859cc1',
              navBarHeight: 50,
              navBarTextColor: '#000000',
              navigationBarColor: '#003a66',
              navBarBackgroundColor: '#003a66',
              statusBarColor: '#002b4c',
              tabFontFamily: 'BioRhyme-Bold',
              drawUnderTabBar: true,
              topBarCollapseOnScroll: true,
              navBarTextColor: '#859cc1',
              },
              passProps:{
                temperature: event.payload,
                handleClickTemp: (item)=>{
                  this.state.temp = item.index;
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                }
              },
          navigatorButtons:{
            leftButtons: [
            {
              id: 'backWithCheck',
              component: 'backButton',
              passProps: {
                navigator,
                onDone: ()=>{
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                }
              }
            }
          ]
        }});
      }
      if(event.link == 'precipitation'){

        this.props.navigator.showModal({
          screen: 'Precipitation',
          title: 'Precipitation',
          overrideBackPress: true,
          navigatorStyle: {
              navBarButtonColor: '#859cc1',
              navBarHeight: 50,
              navBarTextColor: '#000000',
              navigationBarColor: '#003a66',
              navBarBackgroundColor: '#003a66',
              statusBarColor: '#002b4c',
              tabFontFamily: 'BioRhyme-Bold',
              drawUnderTabBar: true,
              topBarCollapseOnScroll: true,
              navBarTextColor: '#859cc1',
              },
              passProps:{
                precipitation: event.payload,
                handleClickPrecip: (item)=>{
                  this.state.precipitation = item.index;
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                }
              },
          navigatorButtons:{
            leftButtons: [
            {
              id: 'backWithCheck',
              component: 'backButton',
              passProps: {
                navigator,
                onDone: ()=>{
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                }
              }
            }
          ]
        }});
      }
      if(event.link == 'speed'){

        this.props.navigator.showModal({
          screen: 'Speed',
          title: 'Speed',
          overrideBackPress: true,
          navigatorStyle: {
              navBarButtonColor: '#859cc1',
              navBarHeight: 50,
              navBarTextColor: '#000000',
              navigationBarColor: '#003a66',
              navBarBackgroundColor: '#003a66',
              statusBarColor: '#002b4c',
              tabFontFamily: 'BioRhyme-Bold',
              drawUnderTabBar: true,
              topBarCollapseOnScroll: true,
              navBarTextColor: '#859cc1',
              },
              passProps:{
                speed: event.payload,
                handleClickSpeed: (item)=>{
                  this.state.speed = item.index;
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                }
              },
          navigatorButtons:{
            leftButtons: [
            {
              id: 'backWithCheck',
              component: 'backButton',
              passProps: {
                navigator,
                onDone: ()=>{
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                }
              }
            }
          ]
        }});
      }
        if(event.link == 'notifications'){
        this.props.navigator.showModal({
          screen: 'Notifications',
          title: 'Notifications',
          overrideBackPress: true,
          navigatorStyle: {
              navBarButtonColor: '#859cc1',
              navBarHeight: 50,
              navBarTextColor: '#000000',
              navigationBarColor: '#003a66',
              navBarBackgroundColor: '#003a66',
              statusBarColor: '#002b4c',
              tabFontFamily: 'BioRhyme-Bold',
              drawUnderTabBar: true,
              topBarCollapseOnScroll: true,
              navBarTextColor: '#859cc1',
              },
              passProps:{
                location: event.payload[0],
                send_time: event.payload[1],
                handleClickNotifications: (item)=>{
                  this.state.speed = item.index;
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                },
                updateLocation : (place)=>{
                  this.state.location = place.addressComponents.locality;
                }
              },
          navigatorButtons:{
            leftButtons: [
            {
              id: 'backWithCheck',
              component: 'backButton',
              passProps: {
                navigator,
                onDone: ()=>{
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                }
              }
            }
          ]
        }});
      }
    }
  }
    _onPressSettings() {
               this.props.navigator.showModal({
      screen: 'Settings',
      title: 'Settings',
      overrideBackPress: true,
      navigatorStyle: {
          navBarButtonColor: '#859cc1',
          navBarHeight: 50,
          navBarTextColor: '#000000',
          navigationBarColor: '#003a66',
          navBarBackgroundColor: '#003a66',
          statusBarColor: '#002b4c',
          tabFontFamily: 'BioRhyme-Bold',
          drawUnderTabBar: true,
          topBarCollapseOnScroll: true,
          navBarTextColor: '#859cc1',
          },
          passProps:{
            userInfo: this.props.userInfo,
            onDoneTemp: (temp)=>{
              this.props.navigator.handleDeepLink({
                link: 'temperature',
                payload: temp // (optional) Extra payload with deep link
              });
            },
            onDonePrecip: (temp)=>{
              this.props.navigator.handleDeepLink({
                link: 'precipitation',
                payload: temp // (optional) Extra payload with deep link
              });
            },
            onDoneSpeed : (temp)=>{
              this.props.navigator.handleDeepLink({
                link: 'speed',
                payload: temp // (optional) Extra payload with deep link
              });
            },
            onDoneNotifications : (location, send_time)=>{
              var obj =[];
              obj.push(location);
              obj.push(send_time);
              this.props.navigator.handleDeepLink({
                link: 'notifications',
                payload: obj
              });
            }
          },
      navigatorButtons:{
        leftButtons: [
        {
          id: 'backWithCheck',
          component: 'backButton',
          passProps: {
            text: 'Hi!',
            navigator,
            onDone: ()=>{
              this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              });
              this.props.navigator.switchToTab({
                tabIndex: 0 // (optional) if missing, this screen's tab will become selected
              });
              this.props.navigator.toggleDrawer({
  side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
  animated: true, // does the toggle have transition animation or does it happen immediately (optional)
  to: 'close' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
});
            }
          }
        }
      ]
        }});
    };
  render() {
    var settings = require('./img/settings.png');
    return (
      <View style={{ flex:1, backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
      <Wallpaper>
        <Logo/>
        <ScrollView>
              <TouchableOpacity
                onPress={this._onPressSettings}
              >
                <Image source={settings} style={styles.inlineIcon} />
                <Text style={{color: 'white', fontSize: 16, paddingLeft: 40, paddingTop: 16}}>Settings</Text>
              </TouchableOpacity>
          </ScrollView>
      </Wallpaper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inlineIcon: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 15,
    top: 15,
    paddingLeft: 20, paddingTop: 16
  },
});
