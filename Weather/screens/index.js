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
import LoginScreen from '../components/screens/Login/LoginScreen';
// register all screens of the app (including internal ones)
export function registerScreens() {


// Register the component
  Navigation.registerComponent('CustomButton', () => CustomButton);
  Navigation.registerComponent('LoginScreen', () => LoginScreen);
  Navigation.registerComponent('Menu', () => Menu);
  Navigation.registerComponent('mainScreen', () => mainScreen);
  Navigation.registerComponent('locationsScreen', () => Locations);
  Navigation.registerComponent('feedScreen', () => Feed);
  Navigation.registerComponent('profileScreen', () => Profile);
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
}
