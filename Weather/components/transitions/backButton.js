
import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const backButton = props => {
  const {navigator} = props;
  return(
        <TouchableOpacity
    style={[styles.button]}
    onPress={() => props.onDone()}
  >
    <View style={styles.button}>
    <Icon name="ios-arrow-back" size={30} color="#ff505c" />
    </View>
  </TouchableOpacity>
);
}
const styles = StyleSheet.create({
button: {
  overflow: 'hidden',
  width: 34,
  height: 34,
  borderRadius: 34 / 2,
  justifyContent: 'center',
  alignItems: 'center',
},
});
export default backButton;