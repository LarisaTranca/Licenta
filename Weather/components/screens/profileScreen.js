import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  AsyncStorage,
  ScrollView,
  ListView,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Card, Icon } from 'react-native-elements'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import { Navigation } from 'react-native-navigation';
import username from '../img/profile.png';
import header from '../img/blur.jpg'
var base64 = require('base-64');
import api from './Login/api';
import Separator from '../transitions/Separator';
import Tel from '../transitions/Tel';
import Email from '../transitions/Email';
import mainColor from '../transitions/constants'
import ImagePicker from 'react-native-image-picker';
export default class Profile extends Component {

  state = {
    user: undefined, // user has not logged in yet
  };

constructor(props){
  super(props);
    tels = [
    { "id": 1, "name": "Mobile", "number": "+66 (089)-928-2134" },
    { "id": 2, "name": "Work", "number": "+41 (112)-435-9887" }
  ];

  emails = [
    { "id": 1, "name": "Personal", "email": "elsie-goodman@mail.com" },
    { "id": 2, "name": "Work", "email": "elsie@work.com" }
  ];
  this.state ={
    'userInfo': '',
    edit: false, 
    telDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(tels),
    emailDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(emails),
    avatarSource: username,
    dataPhoto: undefined,
    user: {}
  };
   this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
   this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
   this.editProfile = this.editProfile.bind(this);
   this.save = this.save.bind(this);
   this.seTel = this.seTel.bind(this);
   this.setEmail = this.setEmail.bind(this);
  // (this: any).loginWithApp = this.loginWithApp.bind(this);
}
  navigatorButtons = (navigator) => {
    var user = this.state.userInfo;
    if(user !== ''){
      return {
        rightButtons: [
        {
          id: 'cancel',
          title: 'Log Out',
          component: 'logOut',
          passProps: {
            text: 'Hi!',
            navigator,
            logOut: ()=>{
              AsyncStorage.setItem('userInfo', '', ()=>{
              });
            }
          }
        }
      ], 
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
      }
    }else{
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
  }
  onNavigationEvent(event) {
// handle a deep link
    if (event.type == 'DeepLink') {
      if(event.link == 'create'){

      this.props.navigator.showModal({
      screen: 'createAccount',
      title: 'Create Account',
      overrideBackPress: true,
      navigatorStyle: {
          navBarButtonColor: '#859cc1',
          navBarHeight: 50,
          navBarTextColor: '#000000',
          navigationBarColor: '#003a66',
          navBarBackgroundColor: '#003a66',
          statusBarColor: '#002b4c',
          tabFontFamily: 'BioRhyme-Bold',
          drawUnderTabBar: true,
          topBarCollapseOnScroll: true,
          navBarTextColor: '#859cc1',
          },
          passProps:{
            onDone: (data) =>{
              this.props.navigator.dismissAllModals({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              });
              this.props.navigator.handleDeepLink({
                link: 'logged-in',
                payload: data // (optional) Extra payload with deep link
              });

              // this.props.navigator.setButtons(this.navigatorRightButtons(this.props.navigator));
            }
          },
      navigatorButtons:{
        leftButtons: [
        {
          id: 'backWithCheck',
          component: 'backButton',
          passProps: {
            text: 'Hi!',
            navigator,
            onDone: ()=>{

              this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              });
              this.props.navigator.switchToTab({
                tabIndex: 2 // (optional) if missing, this screen's tab will become selected
              });
            }
          }
        }
      ]
        }});

        // this.props.navigator.dismissModal({
        //         animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        //       });
      }else{
        if(event.link !== 'temperature' && event.link !== 'precipitation'&& event.link !== 'speed'&& event.link !== 'notifications'){
        AsyncStorage.setItem('userInfo', JSON.stringify(event.payload), ()=>{

      this.setState({userInfo : JSON.stringify(event.payload)});

        this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
        });      
      }
      }
    }
    if(event.type == 'NavBarButtonPress'){
      AsyncStorage.setItem('userInfo', '', ()=>{
        this.setState({"userInfo": ''});
        });
    }
}


  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Linking.addEventListener('userInfo', this.changeUserInfo);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
    AsyncStorage.getItem('userInfo').then((data)=>{
    if(data){
      this.setState({userInfo :data});
      this.setState({user : JSON.parse(data)});
    }
    // return data ? JSON.parse(data): '';
  });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('https://e53e164f.ngrok.io/auth/facebook');

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('https://e53e164f.ngrok.io/auth/google');

  loginWithApp = () => {
     this.props.navigator.showModal({
      screen: 'LoginScreen',
      title: 'Login In',
      overrideBackPress: true,
      navigatorStyle: {
          navBarButtonColor: '#859cc1',
          navBarHeight: 50,
          navBarTextColor: '#000000',
          navigationBarColor: '#003a66',
          navBarBackgroundColor: '#003a66',
          statusBarColor: '#002b4c',
          tabFontFamily: 'BioRhyme-Bold',
          drawUnderTabBar: true,
          topBarCollapseOnScroll: true,
          navBarTextColor: '#859cc1',
          },
          passProps:{
            onDone: (data) =>{
              this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              });
              this.props.navigator.handleDeepLink({
                link: 'logged-in',
                payload: data // (optional) Extra payload with deep link
              });

              // this.props.navigator.setButtons(this.navigatorRightButtons(this.props.navigator));
            }
          },
      navigatorButtons:{
        leftButtons: [
        {
          id: 'backWithCheck',
          component: 'backButton',
          passProps: {
            text: 'Hi!',
            navigator,
            onDone: ()=>{
              this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              });
              this.props.navigator.switchToTab({
                tabIndex: 2 // (optional) if missing, this screen's tab will become selected
              });
            }
          }
        }
      ]
        }});

  }
    navigatorRightButtons = (navigator) => {
    return {
      rightButtons: [
        {
          id: 'compose',
          title: 'Log Out',
          passProps: {
            text: 'Hi!',
            navigator
          }
        }
      ]
    };
  }
  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };
  onPressPlace = () => {
  }

  onPressTel = number => {
    Linking.openURL(`tel:${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
  }

  onPressEmail = email => {
    Linking.openURL(`mailto:${email}?subject=subject&body=body`).catch(err =>
    )
  }
  editProfile = () =>{
    this.setState({"edit": true});
  }
  seTel(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }  
    var obj = this.state.user;
    obj.tel = text; 
    this.setState({user:obj});
  }
  setEmail(text){
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    // if(reg.test(text) === false)
    // {
    // console.log("Email is Not Correct");
    // this.setState({email:text})
    // return false;
    // }
    // else {
    //   this.setState({email:text})
    //   console.log("Email is Correct");
    // }
    var obj = this.state.user;
    obj.email = text; 
    this.setState({user:obj});
  }
  save = ()=>{
    const image = !this.state.dataPhoto ? this.state.user.image : this.state.dataPhoto;
    api.updateUser({first_name: this.state.user.first_name, last_name: this.state.user.last_name, image: image, tel: this.state.user.tel, id:this.state.user.id}).then(function(response){
      var obj = this.state.user;
      obj.image = image;
      this.setState({user:obj});
      this.setState({userInfo:JSON.stringify(obj)});
      this.setState({edit:false});
      AsyncStorage.setItem('userInfo', JSON.stringify(obj), ()=>{
      });

    }.bind(this));
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
                path: 'images'
            },
            allowsEditing: true
        };

        /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
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
                this.setState({avatarSource: source, dataPhoto: response.data});
            }
        }, function(err) {
            // console.log("err: ", err);
        });
    }

  renderHeader = (user, edit) => {
    var userImage = user.image ? 'data:image/png;base64,' + user.image : null;
    if(edit){
      return(
        <View style={styles.headerContainer}>
      <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={header}
        >
         <View style={styles.headerColumn}>
         <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="save"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.save}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userNameText2}>
                  Save
                </Text>
              </View>
            </View>
         { user.image ?
          <View>
                <Image source={{ uri: userImage }} style={styles.userImage} />
                <TouchableOpacity onPress={this.handleCameraAction.bind(this)} style={styles.cameraButton}>
                    <Icon2 name="camera" size={34} color={'#405979'}/>
                </TouchableOpacity>
                </View>
                :
                <View>
                <Image source={this.state.avatarSource} style={styles.userImage} />
                <TouchableOpacity onPress={this.handleCameraAction.bind(this)} style={styles.cameraButton}>
                    <Icon2 name="camera" size={34} color={'#405979'}/>
                </TouchableOpacity>
                </View>
              }
              <View style={styles.userAddressRow}>
              <Text style={styles.userNameText2}>First Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                var obj = this.state.user;
                obj.first_name = text;
                this.setState({user: obj})
                }
              }
              value={this.state.user.first_name}
            />
            <Text style={styles.userNameText2}>Last Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                var obj = this.state.user;
                obj.last_name = text;
                this.setState({user: obj})
                }
              }
              value={this.state.user.last_name}
            />
            </View>
            <TouchableOpacity style={styles.userAddressRow} 
                  onPress={this.onPressPlace}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {user.location}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
            </View>
        )
    }else{
      return (
        <View style={styles.headerContainer}>
      <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={header}
        >
         <View style={styles.headerColumn}>
         <TouchableOpacity style={styles.userAddressRow} 
                  onPress={this.editProfile}>
              <View>
                <Icon
                  name="edit"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userNameText2}>
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
         { user.image ?
                <Image source={{ uri: userImage }} style={styles.userImage} />
                :
                <Image source={username} style={styles.userImage} />
              }
            <Text style={styles.userNameText}>{user.first_name + ' ' + user.last_name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {user.location}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
            </View>
      );
    }
  }
  renderTel = (user, edit) => {
  return(
          <Tel
            number={user.tel}
            edit={edit}
            seTel={this.seTel}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
    />
    )
  }
    renderEmail = (user,edit) => (
      <Email
        email={user.email}
        edit={edit}
        setEmail={this.setEmail}
        onPressEmail={this.onPressEmail}
      />
  )
  render() { 
    var user = this.state.userInfo;
    setTimeout(() => {
    user = this.state.userInfo;

        this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
  },500);
    if(user !== ''){
      user = JSON.parse(user);
      return(
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader(user, this.state.edit)}
            {this.renderTel(user, this.state.edit)}
            {Separator()}
            {this.renderEmail(user, this.state.edit)}
          </Card>
        </View>
      </ScrollView>
        );
    }else{
      return(
      <View style={styles.container}>
      <View style={styles.content}>
              <Text style={styles.header}>
                Welcome Stranger!
              </Text>
              <View style={styles.avatar}>
                <Icon2 name="user-circle" size={100} color="rgba(0,0,0,.09)" />
              </View>
              <Text style={styles.text}>
                Please log in to continue {'\n'}
                to the awesomness
              </Text>

        <View style={styles.button}>
          <Icon2.Button
          name="cloud"
          backgroundColor="#859cc1"
          onPress={this.loginWithApp}
          {...iconStyles}
        >
        Weather Prediction
        </Icon2.Button>
        </View>
        <View style={styles.buttons}>
          <Icon2.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
          >
            Login with Facebook
          </Icon2.Button>
          <Icon2.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Or with Google
          </Icon2.Button>
        </View>
        </View>
      </View>
      );
    }
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    marginLeft: 100,
    marginBottom: 30,
  },
  cameraButton: {
      alignSelf: 'center',
      marginRight: 11
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  userNameText2: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    left:0,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 90,
    height: 30,
    color: '#000000',
    left:0,
    marginRight:20
  },
});
