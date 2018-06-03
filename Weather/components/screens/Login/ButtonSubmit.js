import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
	Keyboard,
} from 'react-native';
// import { Actions, ActionConst } from 'react-native-router-flux';
import api from './api.js';
import spinner from '../../img/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class SubmitCreateAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			username: '',
			password: '',
			props: props
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}

	_onPress() {
		Keyboard.dismiss();
		// var crypto = require('crypto')
		// var hashedPass = crypto.createHash('sha1').update(this.props.password).digest('hex')
		// console.log({username: this.props.username, password:hashedPass});
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
		var res = api.auth({email: this.props.username, password:this.props.password}).then(function(res){
			// console.log(this);
			if(res.found === 1){

				// console.log(this.state);
				setTimeout(() => {
					// console.log(this.props.navigator);
					this.props.navigator.navigator.onDone(res.data);
				// 	// Actions.mapScreen();
				// 	// this.setState({ isLoading: false });
				// 	// this.buttonAnimated.setValue(0);
					}, 1300);
			}else{
				setTimeout(() => {
				this.setState({ isLoading: false });
				this.buttonAnimated.setValue(0);
				}, 2300);
			}
		}.bind(this));

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

	render() {
		const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });

		return (
			<View style={styles.container}>
				<Animated.View style={{width: changeWidth}}>
					<TouchableOpacity style={styles.button}
						onPress={this._onPress}
						activeOpacity={1} >
							{this.state.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>LOGIN</Text>
							}
					</TouchableOpacity>
					<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		top: 0,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#F035E0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#F035E0',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
	},
});
