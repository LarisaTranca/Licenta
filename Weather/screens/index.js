import { Navigation } from 'react-native-navigation';
import StyleSheet from 'react-native';
import FirstTabScreen from '../components/FirstTabScreen';
import SecondTabScreen from '../components/SecondTabScreen';
import mainScreen from '../components/screens/mainScreen';
import Locations from '../components/screens/locationsScreen';
import Feed from '../components/screens/feedScreen';
import Profile from '../components/screens/profileScreen';
import Menu from '../components/Menu';
import CustomButton from '../components/transitions/CustomButton';
import logOut from '../components/transitions/logOut';
import backButton from '../components/transitions/backButton';
import Settings from '../components/transitions/Settings';
import Temperature from '../components/transitions/Temperature';
import Precipitation from '../components/transitions/Precipitation';
import Speed from '../components/transitions/Speed';
import Notifications from '../components/transitions/Notifications';
import LoginScreen from '../components/screens/Login/LoginScreen';
import createAccount from '../components/screens/Login/createAccount';
// register all screens of the app (including internal ones)
export function registerScreens() {


// Register the component
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('Temperature', () => Temperature);
  Navigation.registerComponent('Precipitation', () => Precipitation);
   Navigation.registerComponent('Speed', () => Speed);
   Navigation.registerComponent('Notifications', () => Notifications);
  Navigation.registerComponent('CustomButton', () => CustomButton);
  Navigation.registerComponent('logOut', () => logOut);
  Navigation.registerComponent('backButton', () => backButton);
  Navigation.registerComponent('LoginScreen', () => LoginScreen);
  Navigation.registerComponent('createAccount', () => createAccount);
  Navigation.registerComponent('Menu', () => Menu);
  Navigation.registerComponent('mainScreen', () => mainScreen);
  Navigation.registerComponent('locationsScreen', () => Locations);
  Navigation.registerComponent('feedScreen', () => Feed);
  Navigation.registerComponent('profileScreen', () => Profile);
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
}
