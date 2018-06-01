import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Text,
	Animated,
	TouchableOpacity,
	Easing,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
const MARGIN = 40;
export default class SignupSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		};
		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
		this._onPressForgotPass = this._onPressForgotPass.bind(this);
	}
	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}
	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

		setTimeout(() => {
			this._onGrow();
		}, 200);

		setTimeout(() => {
			// Actions.createAccount();
			// console.log(this.props);
			//  this.props.navigator.navigator.showModal({
   //    screen: 'createAccount',
   //    title: 'Create Account',
   //    overrideBackPress: true,
   //    navigatorStyle: {
   //        navBarButtonColor: '#859cc1',
   //        navBarHeight: 50,
   //        navBarTextColor: '#000000',
   //        navigationBarColor: '#003a66',
   //        navBarBackgroundColor: '#003a66',
   //        statusBarColor: '#002b4c',
   //        tabFontFamily: 'BioRhyme-Bold',
   //        drawUnderTabBar: true,
   //        topBarCollapseOnScroll: true,
   //        navBarTextColor: '#859cc1',
   //        },
   //        passProps:{
   //          onDone: (data) =>{
   //            this.props.navigator.dismissModal({
   //              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
   //            });
   //            this.props.navigator.handleDeepLink({
   //              link: 'logged-in',
   //              payload: data // (optional) Extra payload with deep link
   //            });

   //            // this.props.navigator.setButtons(this.navigatorRightButtons(this.props.navigator));
   //          }
   //        },
   //    navigatorButtons:{
   //      leftButtons: [
   //      {
   //        id: 'backWithCheck',
   //        component: 'backButton',
   //        passProps: {
   //          text: 'Hi!',
   //          navigator,
   //          onDone: ()=>{
   //            this.props.navigator.dismissModal({
   //              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
   //            });
   //            this.props.navigator.switchToTab({
   //              tabIndex: 2 // (optional) if missing, this screen's tab will become selected
   //            });
   //          }
   //        }
   //      }
   //    ]
   //      }});
   			
			
			 this.props.navigator.navigator.handleDeepLink({
                link: 'create'
              });
			this.setState({ isLoading: false });
			this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
		}, 200);
	}

	_onPressForgotPass() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

		setTimeout(() => {
			this._onGrow();
		}, 200);

		setTimeout(() => {
			Actions.forgotPassword();
			this.setState({ isLoading: false });
			this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
		}, 200);
	}

	render() {
		return (
			<View style={styles.container}>
			<Animated.View>
				<TouchableOpacity
					onPress={this._onPress}>
					<Text style={styles.text}>Create Account</Text>
				</TouchableOpacity>
			</Animated.View>
			<Animated.View>
				<TouchableOpacity
					onPress={this._onPressForgotPass}>
					<Text style={styles.text}>Forgot Password?</Text>
				</TouchableOpacity>
			</Animated.View>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: 65,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
});
