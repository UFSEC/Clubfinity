import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { CreateEvent } from '../components/CreateEvent';
import { FontAwesome } from '@expo/vector-icons';
import Preferences from './Preferences';
import SettingScr from './SettingScr';
import ProfileInfoScr from './ProfileInfoScr';
import ClubsFollowScr from './ClubsFollowScr'
import Tab from '../components/Tabs'
// Add User API

export default class ProfileScr extends React.Component {

	static navigationOptions = {
		title: 'Profile',
		headerStyle: { backgroundColor: '#7e947f' },
		headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
	}

	constructor(props) {
		super(props);
		this.state = {
			admin: false
		}
	}

	signOut = async () => {
		await AsyncStorage.removeItem('userToken');
		this.props.navigation.navigate('Auth');
	}


	render() {
		const userProfilePicture = {
			ProfilePic: require('../assets/images/profile-icon.png')
		}
		return (
			<ScrollView style={style.container}>
				<View style={style.Card}>
					<View style={style.profileCardRow}>
						<Image style={[style.profilePicture]} source={userProfilePicture.ProfilePic} />
						<View style={style.profileInfo}>
							<Text adjustsFontSizeToFit numberOfLines={2} style={style.textHeader}>Christian Sarmiento</Text>
							<FontAwesome.Button name="edit" color="#2980b9" backgroundColor="#fff" style={{ alignSelf: 'center' }} onPress={() => {
								this.props.navigation.navigate({ routeName: 'Edit' })
							}}>
								<Text style={{ color: "#2980b9", paddingRight: 5 }}>Edit Profile</Text>
							</FontAwesome.Button>

							<FontAwesome.Button name="sign-out" color="#F40" backgroundColor="#fff" style={{ alignSelf: 'center' }} onPress={this.signOut}>
							<Text style={{ color: "#F40", paddingRight: 5 }}>Logout</Text>
							</FontAwesome.Button>
						</View>
					</View>
					<ProfileInfoScr/>
				</View>
				<Tab tab1={<Preferences/>} tab2={<ClubsFollowScr />}  />
			</ScrollView>
		);
	}
}

const style = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: '#f5f6fa'
	},
	Card: {
		padding: 15,
		backgroundColor: '#ffffff',
		marginBottom: 10,
		elevation: 2,
		
	},
	ButCard: {
		padding: 15,
		backgroundColor: '#ffffff',
		marginBottom: 10,
		elevation: 2,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	settingsCard: {
		backgroundColor: '#ffffff',
		elevation: 2
	},
	profileCardRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 10
	},
	settingsCardRow: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1
	},
	lastSettingsCardRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profilePicture: {
		width: 150,
		height: 125,
		resizeMode: 'contain',
		alignItems: 'center',
		flex: 4
	},
	profileInfo: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 6
	},
	textHeader: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 24,
		paddingBottom: 10
	},
	textSubheading: {
		alignSelf: 'flex-start',
		marginLeft: 20
	},
	textTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 24,
		paddingTop: 10
	},
	profileCardBody: {
		alignContent: 'flex-start',
		alignItems: 'center',
		flex: 6
	},
	profileCardBodyAdmin: {
		borderWidth: 1,
		borderColor: 'grey',
		alignItems: 'center',
		flex: 4
	},
	settingsCardText: {
		flexDirection: 'row',
		fontSize: 18,
		paddingHorizontal: 10,
		flex: 8
	},
	settingsCardIcon: {
		flexDirection: 'row',
		flex: 2
	}
});
