import React, { Component, PropTypes } from 'react';
import Logo from '../../Logo';
import Form from './AccountForm';
import Wallpaper from './Wallpaper';
import SubmitCreateAccount from './SubmitCreateAccount';
import SignupSection from './SignupSection';
import AccountForm from './AccountForm';
import SecondScreen from './SecondScreen';

export default class createAccount extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<Wallpaper>
				<Logo />
				<AccountForm navigator={this.props} />
			</Wallpaper>
		);
	}
}
