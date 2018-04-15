/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import Main from './components/screens/mainScreen';
type Props = {};
const deviceW = Dimensions.get('window').width

import Wallpaper from './components/Wallpaper';
const basePx = 375
function px2dp(px) {
  return px *  deviceW / basePx
}

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        // <Wallpaper>
          <Main></Main>
          // </Wallpaper>
      </View>
    )
  }
}

class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
      </View>
    )
  }
}

class Locations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Locations
        </Text>
      </View>
    )
  }
}
export default class App extends React.Component  {
  state= {
    selectedTab: 'home'
  };
  render() {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
          badgeText="1"
          onPress={() => this.setState({selectedTab: 'home'})}>
          <Home/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <Profile/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'locations'}
          title="Locations"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon2 name="location" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon2 name="location" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'locations'})}>
          <Locations/>
        </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('App', () => App);
