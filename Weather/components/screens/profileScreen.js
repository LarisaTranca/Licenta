import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import { Navigation } from 'react-native-navigation';

export default class Profile extends Component {

  state = {
    user: undefined, // user has not logged in yet
  };

constructor(props){
  super(props);
   this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
   this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
  // (this: any).loginWithApp = this.loginWithApp.bind(this);
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
  onNavigationEvent(event) {
// handle a deep link
    console.log(event);
    if (event.id == 'push') {
      const parts = event.link;
      this.loginWithApp();
      // if (parts == 'Screen1') {
      //   this.onPressScreen1();
      // }
    }
}
  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
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
    console.log(this.props.navigator);
     this.props.navigator.showModal({
      screen: 'LoginScreen',
      title: 'Login In',
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
}, navigatorButtons: {
  leftButtons: [
        {
          id: 'done',
          // component: 'CustomButton',
          // passProps: {
          //   text: 'Hi!',
          //   navigator
          // }
        }
      ]
}
    });
//     this.props.navigator.push({
//       screen: 'LoginScreen', // unique ID registered with Navigation.registerScreen
//   title: 'Login in' , // navigation bar title of the pushed screen (optional)
//   subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
//   titleImage: require('../img/sun.gif'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
//   passProps: {}, // Object that will be passed as props to the pushed screen (optional)
//   animated: true, // does the push have transition animation or does it happen immediately (optional)
//   animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
//   backButtonTitle: undefined, // override the back button title (optional)
//   backButtonHidden: false, // hide the back button altogether (optional)
//   navigatorStyle: {
//           navBarButtonColor: '#859cc1',navBarHeight: 50,
//           navBarTextColor: '#000000',
//           navigationBarColor: '#003a66',
//           navBarBackgroundColor: '#003a66',
//           statusBarColor: '#002b4c',
//           tabFontFamily: 'BioRhyme-Bold',
//           drawUnderTabBar: true,
//           topBarCollapseOnScroll: true,
// navBarTextColor: '#859cc1',
// },// override the navigator style for the pushed screen (optional)
//   navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
//   // enable peek and pop - commited screen will have `isPreview` prop set as true.
//   previewView: undefined, // react ref or node id (optional)
//   previewHeight: undefined, // set preview height, defaults to full height (optional)
//   previewCommit: true, // commit to push preview controller to the navigation stack (optional)
//   previewActions: [{ // action presses can be detected with the `PreviewActionPress` event on the commited screen.
//     id: '', // action id (required)
//     title: '', // action title (required)
//     style: undefined, // 'selected' or 'destructive' (optional)
//     actions: [], // list of sub-actions
//   }],
//     })
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

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        { user
          ? // Show user info if already logged in
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user.name}!
              </Text>
              <View style={styles.avatar}>
                <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
              </View>
            </View>
          : // Show Please log in message if not
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome Stranger!
              </Text>
              <View style={styles.avatar}>
                <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
              </View>
              <Text style={styles.text}>
                Please log in to continue {'\n'}
                to the awesomness
              </Text>
            </View>
        }
        {/* Login buttons */}

        <View style={styles.button}>
          <Icon.Button
          name="cloud"
          backgroundColor="#859cc1"
          onPress={this.loginWithApp}
          {...iconStyles}
        >
        Weather Prediction
        </Icon.Button>
        </View>
        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
          >
            Login with Facebook
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Or with Google
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
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
});
