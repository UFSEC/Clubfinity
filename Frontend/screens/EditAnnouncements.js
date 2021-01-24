import React, { Component } from 'react';
import {
  AsyncStorage, Text, StyleSheet, StatusBar,
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import colors from '../util/colors';
import AnnouncementsApi from '../api/AnnouncementsApi';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: STATUS_BAR_HEIGHT,
    flex: 1,
    display: 'flex',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  formStyle: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingTop: '5%',
    marginBottom: '5%',
  },
  headerLeft: {
    marginLeft: 10,
  },
  headerRight: {
    marginRight: 10,
  },
  headerLeftText: {
    color: '#ecf0f1',
  },
  headerRightText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  SaveButtonStyle: {
    width: '92%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ecf0f1',
    fontSize: 18,
  },
});

/* Update for later: announcement should be passed in as navigation parameter */
const baseClubParameters = {
  _id: '5ffefe807bf5a75b18edb39f',
  title: 'CodeForChange date will be changing!',
  description:
  'The CodeForChange will be changing due to conflicts with a few other events going on at the same time.'
  + 'Make sure to check out the schedule for updates about the new date.',
  date: '2020-10-01T04:00:00.000Z',
  club: '99cb91bdc3464f14678934ca',
};

export default class EditAnnouncements extends Component {
  // Update for later: navigate back to previous screen when pressed
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Edit Announcement',
    headerRight: (
      <Button
        onPress={() => { navigation.navigate('Club'); }}
        style={styles.headerRight}
        transparent
      >
        <Text style={styles.headerRightText}>Done</Text>
      </Button>
    ),
    headerLeft: () => (
      <Button
        onPress={() => { navigation.navigate('Club'); }}
        style={styles.headerLeft}
        transparent
      >
        <Text style={styles.headerLeftText}>Cancel</Text>
      </Button>
    ),
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', size: 6 },
    headerTintColor: 'white',
  })

  constructor(props) {
    super(props);
    const defaultError = {
      title: false,
      description: false,
    };
    this.state = {
      title: '',
      description: '',
      processingRequest: { status: false, message: '' },
      errors: { arePresent: false, data: defaultError },
    };
  }

    editAnnouncement = async () => {
      const validRequest = this.isRequestValid();
      if (!validRequest.valid) {
        this.setState({
          processingRequest: { status: false, message: '' },
          errors: { arePresent: true, data: validRequest.errors },
        });
        return;
      }
      this.setState({
        processingRequest: { status: true, message: 'Updating...' },
        errors: { arePresent: false, data: validRequest.errors },
      });
      const bearerToken = await AsyncStorage.getItem('userToken');
      const {
        title, description,
      } = this.state;
      baseClubParameters.description = description;
      baseClubParameters.title = title;
      const updateAnnouncementResponse = await AnnouncementsApi.update(
        bearerToken,
        baseClubParameters._id,
        baseClubParameters,
      );
      if (updateAnnouncementResponse.error) {
        alert('Unable to update user');
        console.log(updateAnnouncementResponse.error);
        return;
      }
      this.setState({
        processingRequest: { status: true, message: 'Saved!' },
      });
    }

    isRequestValid = () => {
      const { title, description } = this.state;
      const errorData = { title: false, description: false };
      errorData.title = title === '';
      errorData.description = description === '';
      const validRequest = !(errorData.title || errorData.description);
      return { valid: validRequest, errors: errorData };
    }

    render() {
      const { errors, processingRequest } = this.state;
      return (
        <Container>
          <Content>
            <Form
              style={styles.formStyle}
            >
              <Item style={{
                marginBottom: '8%',
              }}
              >
                <Label
                  style={{
                    color:
                      errors.arePresent && errors.data.title
                        ? colors.error
                        : colors.grayScale10,
                  }}
                >
                  Edit Title
                </Label>
                <Input
                  onChangeText={(value) => this.setState({ title: value })}
                  style={{ textAlign: 'right' }}
                  placeholderTextColor={colors.error}
                  placeholder={
                  errors.arePresent && errors.data.title
                    ? 'No Title Given'
                    : ''
                }
                />
              </Item>
              <Item>
                <Label style={{
                  color:
                    errors.arePresent && errors.data.description
                      ? colors.error
                      : colors.grayScale10,
                }}
                >
                  Edit Description
                </Label>
                <Input
                  onChangeText={(value) => this.setState({ description: value })}
                  style={{ textAlign: 'right' }}
                  placeholderTextColor={colors.error}
                  placeholder={
                  errors.arePresent && errors.data.description
                    ? 'No Description Given'
                    : ''
                }
                />
              </Item>
            </Form>
            <Button
              onPress={() => this.editAnnouncement()}
              style={styles.SaveButtonStyle}
              block
              info
            >
              <Text style={styles.buttonText}>
                {processingRequest.status
                  ? processingRequest.message
                  : 'Save'}
              </Text>
            </Button>
          </Content>
        </Container>

      );
    }
}
