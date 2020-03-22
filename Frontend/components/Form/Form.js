import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const {height, width } = Dimensions.get('window');

export default class Form extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const isModal = this.props.isModal;
		if(isModal) {
		return (
			<View
				style={Platform.OS === 'ios' ?  styles.contentContainerModal : styles.androidContentContainerModal}>
				{Platform.OS === 'ios' ? <SafeAreaView style={this.props.isCentered? styles.iOScontainerCentered : styles.iOScontainer}>
					{this.props.children}
				</SafeAreaView> :  <View style={this.props.isCentered? styles.androidContainerCentered : styles.androidContainer}>
					{this.props.children}
				</View>}
			</View>
		);
		}
		else {
			return(
			<KeyboardAwareScrollView
				extraScrollHeight={100}
				enableOnAndroid={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={Platform.OS === 'ios' ? styles.contentContainer : styles.androidContentContainer}>
				{Platform.OS === 'ios' ? <SafeAreaView style={this.props.isCentered? styles.iOScontainerCentered : styles.iOScontainer}>
					{this.props.children}
				</SafeAreaView> :  <View style={this.props.isCentered? styles.androidContainerCentered : styles.androidContainer}>
					{this.props.children}
				</View>}
			</KeyboardAwareScrollView>
			);
		}
	}
}

const bgColor = "#FFF";
const styles = StyleSheet.create({
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		backgroundColor: bgColor,
	},
	contentContainerModal: {
		flexGrow: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
        marginVertical: height * 0.25,
        marginHorizontal: width * 0.05,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        borderWidth: 4,
        padding: 15,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 200
	},
	androidContentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		backgroundColor: bgColor,
	},
	androidContentContainerModal: {
		width: width * .90,
		height: height * .7,
		justifyContent: 'center',
		backgroundColor: '#fff',
        marginVertical: Dimensions.get('window').height * 0.15,
        marginHorizontal: Dimensions.get('window').width * 0.05,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        borderWidth: 4,
        padding: 15,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 200
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
		flexDirection: 'column',
		padding: 20,
		backgroundColor: bgColor,

	},
	androidContainerCentered: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: bgColor,
	}
})