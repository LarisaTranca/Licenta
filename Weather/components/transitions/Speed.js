import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Separator, Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
class Speed extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var speed_list = [
  { index: 'km/h', name: 'Kilometers/hour (km/h)' },
  { index: 'mph', name: 'Miles/hour (mph)'},
  { index: 'kn', name: 'Knots (kn)'},
  { index: 'm/s', name: 'Meter/second (m/s)'},
  { index: 'bf', name: 'Beaufort (Bf)'},
];
    return (
      <Container>
        <Content>
          <List dataArray={speed_list}
            renderRow={(temp) =>{
              if(this.props.speed == temp.index){
              return(<ListItem button={true} onPress={()=>{this.props.handleClickSpeed(temp);}}>
              <Left>
                <Text>{temp.name}</Text>
                </Left>
                <Right>
                   <Icon name="checkmark" /> 
                </Right>
                </ListItem>)
              }else{
                return(<ListItem button={true} onPress={()=>{this.props.handleClickSpeed(temp);}}>
                <Text>{temp.name}</Text>
                </ListItem>)
              }
              }
              
            }>
          </List>
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

export default Speed;
