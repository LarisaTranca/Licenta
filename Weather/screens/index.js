import { Navigation } from 'react-native-navigation';

import FirstTabScreen from '../components/FirstTabScreen';
import SecondTabScreen from '../components/SecondTabScreen';
import mainScreen from '../components/screens/mainScreen';
import Locations from '../components/screens/locationsScreen';
import Feed from '../components/screens/feedScreen';
import Profile from '../components/screens/profileScreen';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('mainScreen', () => mainScreen);
  Navigation.registerComponent('locationsScreen', () => Locations);
  Navigation.registerComponent('feedScreen', () => Feed);
  Navigation.registerComponent('profileScreen', () => Profile);
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
}
