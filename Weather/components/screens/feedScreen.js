import {ScrollView, Text, View, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native'
import React from 'react';
import FeedHeader from './Feed/FeedHeader';
import StoryInput from './Feed/StoryInput';
import Story from './Feed/Story';
import api from './Login/api';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            posts: [],
            loading: false,
        }
        this._toggleTabs = 'shown';
        this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
    }
    navigatorButtons = (navigator) => {
    return {
      leftButtons: [
        {
          id: 'custom-button',
          component: 'CustomButton',
          passProps: {
            text: 'Hi!',
            navigator
          }
        }
      ]
    };
  }
    onRefreshClicked() {
         api.getPosts().then(function(data){
            console.log(data);
            this.setState({posts: data.data});
            this.setState({loading: false});
        }.bind(this));
    }

    componentDidMount() {
        this.setState({loading: true});

        api.getPosts().then(function(data){
            console.log(data);
            this.setState({posts: data.data});
            this.setState({loading: false});
        }.bind(this));
    }
    renderData() {
        console.log(this.state.posts);
        // if(this.state.userInfo !== ''){

        // }else{
        //     return <Text style={styles.emptyFeedMessage}>Nothing to show ... Try to post something</Text>;
        // }

         if (this.state.loading) {
            return <ActivityIndicator/>
        } 
        else if(this.state.posts.length === 0){
          return <Text style={styles.emptyFeedMessage}>Nothing to show ... Try to post something</Text>
        } else{
            return this.state.posts.map((post, index) => {
                return <Story
                   {...post} index={index}
                  style={styles.story} key={post.post_id} type={'post'} user={this.props.userInfo}
                  onRefreshClicked={this.onRefreshClicked.bind(this)}/>
            })
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <FeedHeader/> */}
                <StoryInput user={this.props.userInfo} onRefreshClicked={this.onRefreshClicked.bind(this)}/>
                <View style={{
                    padding: 9,
                    flex: 1
                }}>
                    {this.renderData()}
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#f4f3f3'
    },
    story: {
        marginBottom: 8
    },
    emptyFeedMessage:{
      color: '#90a0a9',
      alignSelf: 'center',
      marginTop: 10
    }
})
export default Feed
