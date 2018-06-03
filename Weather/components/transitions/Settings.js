import React, { Component } from 'react';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import api from '../screens/Login/api';
import { Separator, Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
export default class Settings extends Component {

  constructor(props){
    super(props);
    this.state = {
      settings : {}
    }
    this.handleClickTemperature = this.handleClickTemperature.bind(this);
    this.handleClickPrecipitation = this.handleClickPrecipitation.bind(this);
    this.handleClickSpeed = this.handleClickSpeed.bind(this);
    this.handleClickNotifications = this.handleClickNotifications.bind(this);
  }
  handleClickTemperature(){
    this.props.onDoneTemp(this.state.settings.temperature);
  }
  handleClickPrecipitation(){
    this.props.onDonePrecip(this.state.settings.precipitation);
  }
  handleClickSpeed(){
    this.props.onDoneSpeed(this.state.settings.speed);
  }
  handleClickNotifications(){
    this.props.onDoneNotifications(this.state.settings.location, this.state.settings.send_time);
  }

  componentDidMount(){
    var user_id = JSON.parse(this.props.userInfo).id;    
    api.getSettings(user_id).then(function(result){
      this.setState({settings:result});
    }.bind(this));
  }

  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Custom Units</Text>
          </Separator>
          <List>
          <ListItem icon button={true} onPress={this.handleClickTemperature}>
           <Left>
                <Icon2 name="temperature-celsius" />
              </Left>
          <Body>
            <Text>Temperature</Text>
            </Body>
            <Right>
                <Text>°{this.state.settings.temperature}</Text>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>

          <ListItem icon button={true} onPress={this.handleClickPrecipitation}>
           <Left>
                <Icon name="md-rainy" />
              </Left>
          <Body>
            <Text>Precipitation</Text>
            </Body>
            <Right>
                <Text>{this.state.settings.precipitation}</Text>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>

          <ListItem icon button={true} onPress={this.handleClickSpeed}>
           <Left>
                <Icon3 name="speedometer" />
              </Left>
          <Body>
            <Text>Speed</Text>
            </Body>
            <Right>
                <Text>{this.state.settings.speed}</Text>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>

          </List>
          <Separator bordered>
            <Text>Notifications</Text>
          </Separator>
          <ListItem icon button={true} onPress={this.handleClickNotifications}> 
              <Left>
                <Icon name="notifications" />
              </Left>
              <Body>
                <Text>Weather Push Notifications</Text>
              </Body>
              <Right>
                <Switch value={this.state.settings.push_notification == 'yes' ? true : false} />
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
        </Content>
      </Container>
    );
  }
}