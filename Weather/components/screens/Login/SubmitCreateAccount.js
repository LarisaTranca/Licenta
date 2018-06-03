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
	AsyncStorage
} from 'react-native';
import api from './api.js';
// import { Actions, ActionConst } from 'react-native-router-flux';

import spinner from '../../img/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			location : ''
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			isLoading: false,
			email: '',
			password: '',
			confirmPassword: '',
		});
	}

	_onPress() {
		Keyboard.dismiss();
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

	AsyncStorage.getItem('location').then((data)=>{
		var parse = JSON.parse(data);
	    if(data){
	    var res = api.createAccount({first_name: this.props.first_name, last_name: this.props.last_name,email: this.props.email, password:this.props.password, location: parse.locality }).then(function(response){
			if(response.id[0]){
				setTimeout(() => {
				var data2 = {first_name: this.props.first_name, last_name: this.props.last_name,email: this.props.email, password:this.props.password, location:JSON.parse(data).locality, id:response.id[0]};
				this.props.navigator.navigator.onDone(data2);
				this.setState({ isLoading: false });
				this.buttonAnimated.setValue(0);
				}, 1300);
			}
			else{
				this.setState({ isLoading: false });
				this.buttonAnimated.setValue(0);
			}
	    }.bind(this));

	    }
	  });
		
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
								<Text style={styles.text}>CREATE ACCOUNT</Text>
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
