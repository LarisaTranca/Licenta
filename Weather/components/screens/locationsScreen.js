import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Animated, Dimensions, Image, Title, Subtitle, ImageBackground} from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import Wallpaper from '../Wallpaper';
import Icon from "react-native-vector-icons/MaterialIcons";
export default class Locations extends React.Component {
  render () {
    var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
    return (
      <Container>
       <Content>
         <List dataArray={items}
           renderRow={(item) =>
           <Wallpaper>
             <ListItem style={styles.list}>
               <Text style={styles.item}>{item}</Text>
               <Text style={styles.item2}>{item}</Text>
             </ListItem>
             </Wallpaper>
           }>
         </List>
          <Icon name="add-circle-outline" size={40} style={styles.icon1} />
       </Content>
     </Container>
   );
  }
}
const styles = StyleSheet.create ({
   item:{
     marginLeft: 0,
     fontFamily: "AppleBraille-Outline8Dot",
   },
   item2:{
    fontFamily: "AppleBraille-Outline8Dot",
     flex: 1,
     textAlign: 'right',
   },
   list:{
     width: 132.48,
    height: 67.32
   },
   container: {
   width: 80.38,
   height: 18.99,
      flex: 1,
      marginTop: 50
   },
   boldText: {
      fontSize: 30,
      color: 'red',
   },
   picture: {
 		flex: 1,
 		width: null,
 		height: null,
 		resizeMode: 'cover',
 	},
  icon1: {
    backgroundColor: "transparent",
    // top: 45.97,
    // left: 340.75,
    color: "grey",
    textAlign: 'right',
  }
})
