import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const {height, width } = Dimensions.get('window');

export default class Form extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<KeyboardAwareScrollView
				extraScrollHeight={100}
				enableOnAndroid={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={Platform.OS === 'ios' ? styles.contentContainer : styles.androidContentContainer}>
				<View style={Platform.OS === "ios" ? this.props.isCentered? styles.iOScontainerCentered : styles.iOScontainer : this.props.isCentered ? styles.androidContainerCentered : styles.androidContainer}>
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
		justifyContent: 'center',
		width: width,
		height: height,
		backgroundColor: 'red',
	},
	androidContentContainer: {
		flex: 0,
		justifyContent: 'center',
		backgroundColor: bgColor,
	},
	iOScontainerCentered: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: bgColor,
		paddingHorizontal: '5%',
		justifyContent: 'center',
	},
	iOScontainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: bgColor,
		paddingHorizontal: '5%',
	},
	androidContainer: {
		flex: 1,
		display: 'flex',
		padding: 20,
		backgroundColor: bgColor,

	},
	androidContainerCentered: {
		flex: 1,
		width: width,
		height: height,
		justifyContent: 'center',
		backgroundColor: bgColor,
	}
})