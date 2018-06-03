
/* @flow */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  LayoutAnimation,
  Easing,
} from 'react-native'
const { width } = Dimensions.get('window')
import StoryHeader from './StoryHeader'
import StoryFooter from './StoryFooter'
import {
  generateRandomColor,
  Icon,
  ionicon,
} from '@utils'

import {
  colors
} from '@styles'
class Story extends React.Component {
  constructor(props) {
    super(props)
     this.animatedValue = []
    // this.props.forEach((value) => {
    //   this.animatedValue[value] = new Animated.Value(0)
    // })
    this.state = {
       fadeAnim: new Animated.Value(0), // init opacity 0
     };
  }
  componentDidMount() {
    this.spin();
   }

   spin (){
        Animated.sequence([
      Animated.timing(          // Uses easing functions
        this.state.fadeAnim,    // The value to drive
        {
          toValue: 1,
          duration:20,
          easing: Easing.elastic(.5)
        }           // Configuration
      )
    ]).start(() => this.spin());
   }

  renderBody(props){
    let imageSource
    if (props.image) {
      imageSource = {
        uri: props.image,
        // isStatic: true
      };
    }
      return (
        <View>
          <Text style={styles.textBody}>{props.body}</Text>
          {
            imageSource?
            <Image style={styles.postImage} source={imageSource} />
            :
            null
            // <Image style={styles.postImage} source={require('@assets/images/prototype.jpg')} />
          }
        </View>
      )
  }
  render(){
    return (
      <Animated.View style={[this.props.style, styles.container, {
        opacity: this.state.fadeAnim,
        transform: [{
           translateY: this.state.fadeAnim.interpolate({
             inputRange: [0, 1],
             outputRange: [-10, 0]  // 0 : 150, 0.5 : 75, 1 : 0
           }),
        }],
      }]}>
        <StoryHeader {...this.props}/>
          {this.renderBody(this.props)}
          <StoryFooter  {...this.props} style={styles.footer} />
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
    container:  {
      flex: 1,
      // borderColor: colors.border.greyblue, borderWidth: 2,
      backgroundColor: 'white',
      borderRadius: 2.1, shadowOpacity: .1, shadowRadius: 1,
      shadowOffset: {width:1, height: 1}
    },
    textBody: { fontSize: 15, color: colors.text.black, paddingHorizontal: 14,},
    footer: { marginHorizontal: 16, marginTop: 13, },
    postImage: { height: 220, width: width - 22, marginTop:8 },
})
export default Story
export {
  StoryFooter,
  StoryHeader,
}
