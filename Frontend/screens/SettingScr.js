import React from 'react';
import {
  StyleSheet, Text, View, Switch,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginBottom: 15,
    paddingBottom: 20,
    marginTop: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  title: {
    flexDirection: 'row',
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '800',
    color: '#2980b9',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: '500',
  },
  option: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default class SettingScr extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      profileViewSwitch: false,
      clubViewSwitch: true,
      freeSpotSwitch: true,
      soundSwitch: true,
      notCenterSwitch: true,
      badgeIconSwitch: true,
      bannerSwitch: true,
      lockScreenSwitch: true,
    };
  }

  render() {
    const {
      profileViewSwitch,
      clubViewSwitch,
      freeSpotSwitch,
      soundSwitch,
      notCenterSwitch,
      badgeIconSwitch,
      bannerSwitch,
      lockScreenSwitch,
    } = this.state;

    return (
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Privacy Settings</Text>
        </View>
        <View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>
              Allow students to view my profile
            </Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={profileViewSwitch}
              onValueChange={(value) => this.setState({ profileViewSwitch: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>
              Allow club members to view my profile
            </Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={clubViewSwitch}
              onValueChange={(value) => this.setState({ clubViewSwitch: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>Show only Free Spots</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={freeSpotSwitch}
              onValueChange={(value) => this.setState({ freeSpotSwitch: value })}
            />
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notification Settings</Text>
        </View>
        <View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>Sounds</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={soundSwitch}
              onValueChange={(value) => this.setState({ soundSwitch: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>Notification Center</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={notCenterSwitch}
              onValueChange={(value) => this.setState({ notCenterSwitch: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>Badge Icons</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={badgeIconSwitch}
              onValueChange={(value) => this.setState({ badgeIconSwitch: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>Banners</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={bannerSwitch}
              onValueChange={(value) => this.setState({ bannerSwitch: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>Lock Screen</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={lockScreenSwitch}
              onValueChange={(value) => this.setState({ lockScreenSwitch: value })}
            />
          </View>
        </View>
      </View>
    );
  }
}
