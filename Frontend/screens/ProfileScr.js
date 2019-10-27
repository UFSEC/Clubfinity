import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ScrollView, FlatList } from 'react-native';
import { primary } from '../assets/styles/stylesheet';
import { Switch } from '../components/Switch';
import { FontAwesome, Octicons, Ionicons, Entypo } from '@expo/vector-icons';
import SettingScr from './SettingScr';
import Tab from '../components/Tabs'

export default class ProfileScr extends React.Component {
  
	constructor(props) {
	  super(props);
	  this.state = {
		isToggled: false,
		hideCard: false
	  }
	}
  
	// Change card style if 'Going' clicked || remove if Not going
	btnHandler = () => {
	  this.setState({
		goingChecked: !this.state.isToggled
	  });
	}

	static navigationOptions = {
		title: 'Clubfinity',
		headerStyle: { backgroundColor: '#7e947f' },
		headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
	}

	_eventHandler = () => {
		console.log('Stuff has been clicked boi');
	}

	render() {
		return (
			<ScrollView style={style.container}>
				<View style={style.profileCard}>
					<View style={style.profileCardRow}>
						<Image style={[style.profilePicture]} source={require('../assets/images/profile-icon.png')} />
						<View style={style.profileInfo}>
							<Text style={style.textHeader}>Christian Sarmiento</Text>
							<Text style={style.textSubheading}><Text style={{fontWeight: "bold"}}>Major:</Text> Computer Science</Text>
							<Text style={style.textSubheading}><Text style={{fontWeight: "bold"}}>Interest:</Text> I love to code! </Text>
							<Text style={style.textSubheading}><Text style={{fontWeight: "bold"}}>Email:</Text> cs@gmail.com</Text>
							<Text style={style.textSubheading}><Text style={{fontWeight: "bold"}}>Year:</Text> Senior</Text>
							<Button  onPress={() => {
								this.props.navigation.navigate({routeName:'Edit'})
							}}title={"Edit Profile"}></Button>
						</View>
					</View>
					{/* <View style={style.profileCardRow}>
						<View style={style.profileCardBody}>
							<Text style={style.textHeader}>Involvement</Text>
							<Text>Software Engineering Club (SEC)</Text>
							<Text>Some other club</Text>
							<Text>Yet again, some other club</Text>
						</View>
						<View style={style.profileCardBodyAdmin}>
							<Text style={style.textHeader}>Admin</Text>
							<Octicons name="check" color='#7e947f' />
							<Text>(*Hidden unless</Text>
							<Text>they're an admin)</Text>
						</View>
					</View> */}
				</View>
					<Tab tab1={ <SettingScr />}/>
       

				{/* <Text style={style.textTitle}>Preferences</Text> */}

				{/* <View style={style.settingsCard}>
					<View style={style.settingsCardRow}>
						<Text style={style.settingsCardText}>Some Setting</Text>
						<View style={style.settingsCardIcon}>
							<Switch clickHandler={this.btnHandler} size={64} />
						</View>
					</View>
					<View style={style.settingsCardRow}>
						<Text style={style.settingsCardText}>Some Setting</Text>
						<View style={style.settingsCardIcon}>
							<Switch clickHandler={this.btnHandler} size={64} />
						</View>
					</View>
					<View style={style.settingsCardRow}>
						<Text style={style.settingsCardText}>Some Setting</Text>
						<View style={style.settingsCardIcon}>
							<Switch clickHandler={this.btnHandler} size={64} />
						</View>
					</View>
					<View style={style.settingsCardRow}>
						<Text style={style.settingsCardText}>Some Setting</Text>
						<View style={style.settingsCardIcon}>
							<Switch clickHandler={this.btnHandler} size={64} />
						</View>
					</View>
					<View style={style.settingsCardRow}>
						<Text style={style.settingsCardText}>Some Setting</Text>
						<View style={style.settingsCardIcon}>
							<Switch clickHandler={this.btnHandler} size={64} />
						</View>
					</View>
					<View style={style.lastSettingsCardRow}>
						<Text style={style.settingsCardText}>Advanced Settings</Text>
						<View style={style.settingsCardIcon}>
							<Button 
								onPress={() => console.log("Link to Gio's page here!!")}
								title=">"
							/>
						</View>
					</View>
				</View> */}
			</ScrollView>
		);
	}
}

const style = StyleSheet.create({
	container: {
		padding: 10,
		// marginBottom: 20,
		// elevation: 2,
		backgroundColor: '#f5f6fa'
	},
	profileCard: {
		padding: 15,
        backgroundColor: '#ffffff',
        elevation: 2
	},
	settingsCard: {
		// paddingTop: 15,
		// paddingBottom: 15,
		// marginBottom: 20,
        backgroundColor: '#ffffff',
        elevation: 2
	},
	profileCardRow: {
    display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignContent: 'center',
		alignItems: 'center',
		paddingBottom: 10
	},
	settingsCardRow: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		// alignContent: 'center',
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
    // backgroundColor: 'pink',
    justifyContent: 'center',
		alignItems: 'center',
		flex: 6
	},
	textHeader: {
    // justifyContent: 'center',
    alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 24,
		paddingBottom: 10
  },
  textSubheading: {
	alignSelf: 'flex-start',
	marginLeft:20
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
