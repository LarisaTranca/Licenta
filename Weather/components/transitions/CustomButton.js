
import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
export default class CollapsingHeader extends React.Component {
  render(){
    return(
        <TouchableOpacity
    style={[styles.button, { backgroundColor: 'tomato' }]}
    onPress={() => console.log('pressed me!')}
  >
    <View style={styles.button}>
    </View>
  </TouchableOpacity>
);
}
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
