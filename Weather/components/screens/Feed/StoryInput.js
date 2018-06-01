/* @flow */

/*
an input that grows up when clicked to show up fullscreen
displays an image on the left and parses mentions and hashtags
accepts images too
NOTE:
  -
TODO:
  - [] animate to show fullscreen
  - [] parse mentions in style
  - [] autocomplete users
  - [] parse mentions to users: generate an object
  - [x] get an image from device storage
  - [x] get an image live from camera
  - [] get an image from camera roll
  - [] display the chosen image in small format under the text (facebook like)
      -[x] Maybe next to the input
  - [] remove image
*/
import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    AsyncStorage
} from 'react-native'
import {generateRandomColor, Icon, ionicon} from '@utils';
import api from '../Login/api';
// import gql from 'graphql-tag';
// import {graphql} from 'react-apollo';
import ImagePicker from 'react-native-image-picker'
const defaultAvatar = require('../../img/profile.png')
export default class StoryInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: '',
            avatarSource: defaultAvatar,
            data: undefined,
            filename: '',
            user:{}
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        var userInfo = JSON.parse(this.props.user);
        var imageSource = {
            uri: 'data:image/jpeg;base64,' + userInfo.image,
          };
                    this.setState({user: userInfo});
                  this.setState({avatarSource :imageSource});
    }

    handleCameraAction() {
        var options = {
            title: 'Select Avatar',
            customButtons: [
                {
                    name: 'fb',
                    title: 'Choose Photo from Facebook'
                }
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
                waitUntilSaved: true,
                cameraRoll: true
            },
            allowsEditing: true
        };

        /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can display the image using either data...
                const source = {
                    uri: 'data:image/jpeg;base64,' + response.data,
                    isStatic: true
                };

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {
                        uri: response.uri.replace('file://', ''),
                        isStatic: true
                    };
                } else {
                    const source = {
                        uri: response.uri,
                        isStatic: true
                    };
                }
                const filename = response.fileName.substr(0, response.fileName.indexOf('.'));
                const extension = response.uri.split('.');
                const name = filename+'.'+extension[extension.length-1];
                console.log(filename, extension[extension.length-1]);
                this.setState({avatarSource: source, data: response.data, filename: name});
            }
        }, function(err) {
            console.log("err: ", err);
        });
    }
    onSubmit() {
        var obj ={
            image: this.state.data,
            body: this.state.textValue,
            user_id: this.state.user.id,
            filename: this.state.filename,
            comments: '',
            reactions: ''
        }
        api.postStory(obj).then(function(response){
            console.log(response);
            this.setState({textValue: '', data: undefined})
            this.props.onRefreshClicked()
        }.bind(this));
    }
    handleTextChange(textValue) {
        this.setState({textValue})
    }
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Image source={this.state.avatarSource} style={styles.avatar}/>
                <TextInput returnKeyType={'done'} onSubmitEditing={this.onSubmit} style={styles.textInput} placeholder={'What’s on your mind?'} placeholderTextColor={'#90a0a9'} onChangeText={this.handleTextChange.bind(this)} value={this.state.textValue}/>

                <TouchableOpacity onPress={this.handleCameraAction.bind(this)} style={styles.cameraButton}>
                    <Icon name={ionicon('camera')} size={34} color={'#405979'}/>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    avatar: {
        width: 30,
        height: 30,
        marginVertical: 7.5,
        borderRadius: 15,
        marginLeft: 11,
        marginRight: 16
    },
    textInput: {
        height: 45,
        color: 'black',
        flex: 1
    },
    cameraButton: {
        alignSelf: 'center',
        marginRight: 11
    }
})

// const submitPost = gql `
//   mutation createPost ($post: CreatePostInput!){
//     createPost(input: $post){
//       post{
//         id
//         body
//       }
//     }
//   }
// `
// export default graphql(submitPost, {
//     props: ({mutate}) => ({
//         submit: ({
//             body,
//             userId = 1,
//             image
//         }) => mutate({
//             variables: {
//                 post: {
//                     post: {
//                         body,
//                         userid: userId,
//                         image
//                     }
//                 }
//             }
//         })
//     })
// })(StoryInput)
