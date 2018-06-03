import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Separator, Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
class Temperature extends React.Component {
  constructor(props){
    super(props);
    this.onPress= this.onPress.bind(this);
  }
  onPress(temp){
    this.props.handleClickTemp(temp);
  }
  render() {
    var temperature_list = [
  { index: 'C', name: 'Celcius(°C)', icon: 'temperature-celsius' },
  { index: 'F', name: 'Fahrenheit(°F)', icon: 'temperature-fahrenheit' },
];
    console.log(temperature_list, this.props.temperature);
    return (
      <Container>
        <Content>
          <List dataArray={temperature_list}
            renderRow={(temp) =>{
              console.log(temp);
              if(this.props.temperature == temp.index){
              return(<ListItem button={true} onPress={()=>{this.props.handleClickTemp(temp);}}>
              <Left>
                <Text>{temp.name}</Text>
                </Left>
                <Right>
                   <Icon name="checkmark" /> 
                </Right>
                </ListItem>)
              }else{
                return(<ListItem button={true} onPress={()=>{this.props.handleClickTemp(temp);}}>
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

export default Temperature;
