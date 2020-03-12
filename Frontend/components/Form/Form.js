import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Form extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<KeyboardAwareScrollView
				extraScrollHeight={100}
				enableOnAndroid={true}
				contentContainerStyle={Platform.OS === "ios" && styles.contentContainer}>
				<View style={Platform.OS === "ios" ? styles.iOScontainer : styles.androidContainer}>
					{this.props.children}
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const bgColor = "#FFF";
const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	iOScontainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: bgColor,
		paddingHorizontal: '5%',
	},
	androidContainer: {
		flex: 1,
		display: 'flex',
		padding: 20,
		justifyContent: 'center',
		marginTop: StatusBar.currentHeight,
		backgroundColor: bgColor,

	}
})