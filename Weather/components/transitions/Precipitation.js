import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Separator, Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
class Precipitation extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var precip_list = [
  { index: 'mm', name: 'Millimeter (mm)' },
  { index: 'l/m', name: 'Liters/square meter (l/m2)'},
  { index: 'in', name: 'Inch (in)'},
];
    return (
      <Container>
        <Content>
          <List dataArray={precip_list}
            renderRow={(temp) =>{
              if(this.props.precipitation == temp.index){
              return(<ListItem button={true} onPress={()=>{this.props.handleClickPrecip(temp);}}>
              <Left>
                <Text>{temp.name}</Text>
                </Left>
                <Right>
                   <Icon name="checkmark" /> 
                </Right>
                </ListItem>)
              }else{
                return(<ListItem button={true} onPress={()=>{this.props.handleClickPrecip(temp);}}>
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

export default Precipitation;
