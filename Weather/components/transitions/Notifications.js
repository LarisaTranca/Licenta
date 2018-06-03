import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Moment from 'moment';
import RNGooglePlaces from 'react-native-google-places';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Separator, Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
class Notifications extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    isDateTimePickerVisible: false,
  };
    this.openLocation = this.openLocation.bind(this);
    this.setTime = this.setTime.bind(this);
  }
  openLocation(){
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      this.props.updateLocation(place);
    // place represents user's selection from the
    // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }
  setTime(){
    this.setState({isDateTimePickerVisible: true});
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
  };
  render() {
    return (
      <Container>
        <Content>
        <ListItem icon button={true} onPress={this.openLocation}>
           <Left>
                <Icon3 name="location" />
              </Left>
          <Body>
            <Text>Location</Text>
            </Body>
            <Right>
                <Text>{this.props.location}</Text>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          <ListItem icon button={true} onPress={this.setTime}>
           <Left>
                <Icon3 name="time-slot" />
              </Left>
          <Body>
            <Text>Send Time</Text>
            </Body>
            <Right>
                <Text>{Moment(this.props.send_time).format('HH:mm')}</Text>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode='time'
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Notifications;
