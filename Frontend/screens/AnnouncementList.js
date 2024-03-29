import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';

import AnnouncementsApi from '../api/AnnouncementsApi';
import Row from '../components/Row';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

class AnnouncementList extends Component {
  static navigationOptions = buildNavigationsOptions('Announcement List')

  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const clubId = navigation.getParam('clubId', 'NO-CLUB');
    const announcements = await AnnouncementsApi.getForClub(
      clubId,
    );
    this.setState({ announcements });
  }

  renderSectionHeader = (section) => (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
        backgroundColor: 'white',
      }}
    >
      {section.title}
    </Text>
  );

  renderEmpty = () => (
    <Text style={{ color: 'rgba(0, 0, 0, 0.50)', textAlign: 'center' }}>
      No Announcements
    </Text>
  );

  render() {
    const { navigation } = this.props;
    const { announcements } = this.state;

    const listData = [];
    if (announcements.length > 0) {
      listData.push({ title: 'Announcements', data: announcements });
    }

    return (
      <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 30 }}>
        <SectionList
          sections={listData}
          keyExtractor={(announcement) => announcement._id}
          renderItem={({ item }) => (
            <Row
              date={item.date.toFormat('MMM dd yyyy')}
              text={item.title}
              handler={() => {
                navigation.navigate('AnnouncementScr', {
                  id: item._id,
                  title: item.title,
                  description: item.description,
                });
              }}
            />
          )}
          renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    );
  }
}

export default AnnouncementList;
