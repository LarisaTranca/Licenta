import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	Image,
	View,
	ImageBackground
} from 'react-native';
import bgSrc from '../../img/wallpaper.png';

export default class Wallpaper extends React.Component {
	render() {
		return (
			<ImageBackground style={styles.picture} source={bgSrc}>
				{this.props.children}
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
		opacity: 0.77
	},
});
