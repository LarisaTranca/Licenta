import React, { Component, PropTypes } from 'react';
import Logo from '../../Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

export default class LoginScreen extends Component {
	constructor(props){
		super(props);
		console.log(props);
	}
	render() {
		return (
			<Wallpaper>
				<Logo />
				<Form navigator={this.props}/>
				<SignupSection navigator={this.props}/>
			</Wallpaper>
		);
	}
}
