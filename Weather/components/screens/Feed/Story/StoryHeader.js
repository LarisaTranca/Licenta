/* @flow */
/*
  StoryHeader
*/
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActionSheetIOS,
  Platform
} from 'react-native'
import {
  generateRandomColor,
  Icon,
  ionicon,
  moment
} from '@utils';


import { colors } from '@styles'
import api from '../../Login/api';
const defaultProps: StoryHeaderProps = {
  publisher: {
    type: 'attendee',
    publisher_id: 'id', // NOTE when organizer => no id
    publisher_name: 'Christina Hendricks',
  },
  created: "2016-11-15T12:53:21.146Z",
  avatar: require('@assets/images/photoProfile2.png'),
}
class StoryHeader extends React.Component {
  constructor(props:StoryHeaderProps) {
    super(props)
    this.handleMorePress = this.handleMorePress.bind(this)
  }
  render(){
    let imageSource
    if(this.props.user){
      imageSource = {
        uri: 'data:image/jpeg;base64,' + JSON.parse(this.props.user).image,
        // isStatic: true
      };
    }
    const name = JSON.parse(this.props.user).first_name + ' ' +JSON.parse(this.props.user).last_name;
    console.log(this.props, "props");
    const created = moment(this.props.date).fromNow(true)
    return (
      <View style={[this.props.style, styles.container]}>
        <Image style={styles.avatar} source={imageSource} />
        <View style={styles.informations}>
          <Text style={styles.publisher}>{name}</Text>
          <Text style={styles.publishedDate}>{created + ' ago'}</Text>
        </View>
        {/*TODO: check if post is mine*/}
        <TouchableOpacity style={styles.moreButton} onPress={this.handleMorePress}>
          <Icon name={ionicon('more')} size={25} color={colors.text.grey}/>
        </TouchableOpacity>
      </View>
    )
  }
  handleMorePress = () => {
    const BUTTONS = [
      'Delete',
      'Cancel',
      'Edit'
    ];
    const DESTRUCTIVE_INDEX = 0;
    const CANCEL_INDEX = 1;
    if(Platform.OS === 'ios'){
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
      },
      (buttonIndex) => {
        console.log(buttonIndex);
        if (buttonIndex === DESTRUCTIVE_INDEX) {
          //TODO check if it's the user's post first
          //TODO check also in the database
          api.deletePost({id:this.props.post_id}).then(function(response){

            this.props.onRefreshClicked();
          }.bind(this));
        }
        if(buttonIndex === 2){
          
        }
      });
    }else{
      //TODO
    }
  };
}
const styles = StyleSheet.create({
  container:  {
    flex: 1,  justifyContent: 'center', flexDirection: 'row',
    margin: 12,
    backgroundColor: 'white',
  },
  avatar: {
     width: 36, height: 36,
     marginRight: 12, borderRadius: 18,
  },
  informations: { flex: 1, },
  publisher: { fontSize: 16, color: colors.text.black,  },
  publishedDate: { fontSize: 11.7, color: colors.text.grey, },
  moreButton: { alignSelf: 'center'}
})
// StoryHeader.defaultProps = defaultProps
// const deletePostQuery = gql`
//   mutation deletePost ($post: DeletePostByIdInput!){
//     deletePostById(input: $post){
//      deletedPostId
//     }
//   }
// `
// export default graphql(deletePostQuery, {
//   props: ({ ownProps, mutate })=> {
//     return ({
//       deletePost: () => mutate({ variables: {
//         "post": {
//             "id": ownProps.id
//         }
//       }})
//     })
//   }
// })(StoryHeader)
export default StoryHeader
