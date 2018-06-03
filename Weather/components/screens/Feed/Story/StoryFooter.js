/* @flow */
/*
  StoryFooter
  Like, Comment and share actions
*/
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Animated,
} from 'react-native'
import {
  generateRandomColor,
  Icon,
  ionicon,
} from '@utils'
import {
  colors
} from '@styles'
import api from '../../Login/api';
const IconAnimated = Animated.createAnimatedComponent(Icon)
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';


class AnimatedIcon extends React.Component{
  constructor(props){
    super(props)
    this.state = {
       fadeAnim: new Animated.Value(0), // init opacity 0
     };
  }
  componentDidMount(){
    Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 1}            // Configuration
     ).start();
  }
  render(){
    return (
      <IconAnimated

         {...this.props} />
    )
  }
}
type StoryFooterProps = {
  style?: any,
  likes: number,
  comments: number,
  liked_by_user: boolean
}

const defaultProps: StoryFooterProps = {
  likes: 0,
  comments: 0,
  liked_by_user: false,
}
class StoryFooter extends React.Component {
  constructor(props:StoryFooterProps) {
    super(props);
    reactions = this.props.reactions === '' ? [] : JSON.parse(this.props.reactions);
    this.state = {
      likedByCurrentUser:
        reactions.some(user=>user === this.props.user.id)
        &&
        this.props.reactions.length !== 0,
    }
    this.like = this.like.bind(this)
    this.unlike = this.unlike.bind(this)
    this.onLikePress = this.onLikePress.bind(this)
  }

  onLikePress(){
    if (this.state.likedByCurrentUser) {
      this.unlike()
    }else{
      this.like()
    }
  }
  like(){
    this.setState({
      likedByCurrentUser: !this.state.likedByCurrentUser,
    });
    var reactions = this.props.reactions === '' ? [] : JSON.parse(this.props.reactions);
    reactions.push(this.props.user_id);
    var params = {
      reactions: JSON.stringify(reactions),
      comments : this.props.comments,
      body : this.props.body,
      id: this.props.post_id
    }
    api.updateStory(params).then(function(response){
      this.props.onRefreshClicked();
    }.bind(this));
  }
  unlike(){
    this.setState({
      likedByCurrentUser: !this.state.likedByCurrentUser,
    });
    var reactions = this.props.reactions === '' ? [] : JSON.parse(this.props.reactions);
    reactions = reactions.filter(function(reaction){
      return reaction !== this.props.user_id;
    }.bind(this));
    var params = {
      reactions: JSON.stringify(reactions),
      comments : this.props.comments,
      body : this.props.body,
      id: this.props.post_id
    }
    api.updateStory(params).then(function(response){
      this.props.onRefreshClicked();
    }.bind(this));
  }
  share(){
    Share.share({
      message: this.props.body,
      title: 'Post by ' + this.props.user.first_name + this.props.user.last_name,
      url: "https://google.com",
    }, {
      dialogTitle: "Share post",
      tintColor: 'papayawhip',
    }).then(this.showResult)
  }
  showResult(result){
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  }
  render(){
    //TODO: use yahoo intl
    let reaction = this.props.reactions == '' ? [] : JSON.parse(this.props.reactions);
    let likes = reaction.length
    // let likes = rand
    let likesText
    if (likes === 0) {
      likesText = 'Like'
    }else if(likes === 1){
      likesText = '1 Like'
    }else{
      likesText = likes + ' Likes'
    }
    let comments = this.props.comments === '' ? [] : JSON.parse(this.props.comments);
    let commentsCount = comments.length;
    let commentsText
    if (commentsCount === 0) {
      commentsText = 'Comment'
    }else if(commentsCount === 1){
      commentsText = '1 Comment'
    }else{
      commentsText = commentsCount + ' Comments'
    }

    return (
      <View style={[this.props.style, styles.container]}>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={this.onLikePress.bind(this)}>
            {
              this.state.likedByCurrentUser?
              <Icon
                 name={ionicon('heart')} size={24} color={'#e74c3c'}
                 style={{

                 }}
                />
              :
              <Icon
                name={ionicon.outline('heart')} size={24} color={colors.text.grey}

               />
            }

          <Text style={styles.actionText}>{likesText}</Text>
          </TouchableOpacity>
        </View>
        { <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name={ionicon('chatboxes')} size={24} color={colors.text.grey} />
            
          <Text style={styles.actionText}>{commentsText}</Text>
          </TouchableOpacity>
        </View> }
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={this.share.bind(this)}>
            <Icon name={ionicon('share')} size={24} color={colors.text.grey} />
            
          <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container:  {
      flex: 1, justifyContent: 'space-around', flexDirection: 'row',
      padding: 13,
      borderTopColor: colors.border.lightgrey, borderTopWidth: .5,
    },
    actionContainer: { flexDirection: 'row', alignItems: 'center'},
    actionButton: { marginRight: 8, },
    actionText: { color: colors.text.grey, fontSize: 12, }
})
StoryFooter.defaultProps = defaultProps
export default StoryFooter
