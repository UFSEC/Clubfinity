import React, { Component } from 'react';
import { AsyncStorage, View, Platform, TouchableOpacity } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Form,
  H1,
  Item,
  Picker,
  Input,
  Textarea,
  Thumbnail,
  StyleProvider,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import getTheme from '../native-base-theme/components';
import thumbnailTheme from '../native-base-theme/components/Thumbnail';
import colors from '../util/colors';
import UserContext from '../util/UserContext';
import ClubfinityLogo from '../assets/images/ClubfinityLogo.png';
import ClubsApi from '../api/ClubsApi';
import { isValidFacebookUrl, isValidSlackUrl, isValidInstagramUrl, isValidUrl } from '../util/validation';

const clubCategories = [
  { label: 'Computer Science', value: 'Computer Science' },
  { label: 'Research', value: 'Research' },
  { label: 'Business', value: 'Business' },
  { label: 'Arts', value: 'Arts' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Health', value: 'Health' },
  { label: 'Journalism', value: 'Journalism' },
  { label: 'Liberal Arts', value: 'Liberal Arts' },
  { label: 'Cultural', value: 'Cultural' },
  { label: 'Honor Society', value: 'Honor Society' },
  { label: 'Media', value: 'Media' },
  { label: 'Professional/Career', value: 'Professional/Career' },
  { label: 'Religious/Spiritual', value: 'Religious/Spiritual' },
  { label: 'Sport Clubs', value: 'Sport Clubs' },
  { label: 'Student Government', value: 'Student Government' },
];

const positions = [
  { label: 'President', value: 'President' },
  { label: 'Vice President', value: 'Vice President' },
  { label: 'Treasurer', value: 'Treasurer' },
  { label: 'Other', value: 'Other' },
];

export default class EditClub extends Component {
  static navigationOptions = {
    title: 'Manage Club',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  static contextType = UserContext;

  constructor(props) {
    super(props);
    const errors = {
      clubName: false,
      clubDescription: false,
      thumbnailUrl: false,
      facebookLink: false,
      slackLink: false,
      instagramLink: false,
    };
    this.state = {
      clubName: '',
      clubDescription: '',
      thumbnailUrl: '',
      facebookLink: '',
      instagramLink: '',
      slackLink: '',
      processingRequest: false,
      editedClub: false,
      errors: { arePresent: false, data: errors },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const club = navigation.getParam('club', 'NO-CLUB');
    this.setState({
      clubName: club.name,
      thumbnailUrl: club.thumbnailUrl,
      clubDescription: club.description,
      facebookLink: club.facebookLink,
      slackLink: club.slackLink,
      instagramLink: club.instagramLink,
    });
  }

  onCategoryChange = (value) => {
    this.setState({
      clubCategory: value,
    });
  };

  onPositionChange = (value) => {
    this.setState({
      position: value,
    });
  };

  editClub = async () => {
    const {
      clubDescription,
      thumbnailUrl,
      facebookLink,
      instagramLink,
      slackLink,
      errors,
    } = this.state;
    
    const validRequest = this.isRequestValid();
    console.log(errors)
    console.log('test')
    if (!validRequest.valid) {
      this.setState({
        processingRequest: false,
        errors: { arePresent: true, data: validRequest.errors },
      });
      return;
    }
    this.setState({
      processingRequest: true,
      errors: { arePresent: false, data: validRequest.errors },
    });
    
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    const club = navigation.getParam('club', 'NO-CLUB');
    console.log(club)

    club.thumbnailUrl = thumbnailUrl;
    club.description = clubDescription;
    club.instagramLink = instagramLink;
    club.facebookLink = facebookLink;
    club.slackLink = slackLink;
    const editedClubResponse = await ClubsApi.updateClub(
      club._id,
      userToken,
      club,
    );
    console.log('test')
    if (editedClubResponse.successfulRequest) {
      this.setState({ editedClub: true, processingRequest: false });
      console.log('success')
    } else {
      console.log('fail')
      console.log(editedClubResponse.error);
      this.setState({ processingRequest: false });
    }
  };

  isRequestValid = () => {
    const {
      clubName,
      clubDescription,
      thumbnailUrl,
      facebookLink,
      slackLink,
      instagramLink,
      errors,
    } = this.state;
    const errorData = errors;
    errorData.clubName = clubName === '' || clubName.length < 3;
    errorData.clubDescription = clubDescription === '' || clubDescription.length > 280;
    errorData.thumbnailUrl = !!thumbnailUrl && !isValidUrl(thumbnailUrl);
    errorData.facebookLink = !!facebookLink && !isValidFacebookUrl(facebookLink);
    errorData.slackLink = !!slackLink && !isValidSlackUrl(slackLink);
    errorData.instagramLink = !!instagramLink && !isValidInstagramUrl(instagramLink);

    let validRequest = true;
    Object.keys(errorData).forEach((input) => {
      if (errorData[input] && input !== 'data' && input !== 'arePresent') {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors };
  };

  render() {
    const {
      clubName,
      thumbnailUrl,
      errors,
      processingRequest,
      editedClub,
      facebookLink,
      slackLink,
      instagramLink,
      clubDescription,
    } = this.state;
    const { navigation } = this.props;
    const club = navigation.getParam('club', 'NO-CLUB');
    if (editedClub) {
      var clubImage = "";
      if (!club.thumbnailUrl){
        clubImage = { uri: club.thumbnailUrl };
      }else{
        clubImage = ClubfinityLogo;
      }
      navigation.navigate('Club', {
        club,
        clubImage,
      });
    }
    const categories = clubCategories.map((s) => (
      <Picker.Item value={s.value} label={s.label} />
    ));
    const positionList = positions.map((s) => (
      <Picker.Item value={s.value} label={s.label} />
    ));
    return (
      <Container>
        <Content>
          <Form
            style={{
              width: '95%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '5%',
              paddingBottom: '5%',
            }}
          >
            <View style={{ paddingTop: '10%' }}>
              <StyleProvider style={getTheme(thumbnailTheme)}>
                <Thumbnail source={{ uri: thumbnailUrl }} large />
              </StyleProvider>
            </View>
            <H1 style={{ paddingBottom: '2%', paddingTop: '5%' }}>
              {clubName}
              </H1>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Input
                onChangeText={(value) => this.setState({ thumbnailUrl: value })}
                placeholderTextColor={
                  errors.arePresent && errors.data.thumbnailUrl
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                height="50%"
                placeholder={
                  errors.arePresent && errors.data.thumbnailUrl
                    ? 'Invalid website'
                    : 'Thumbnail URL'
                }
              >
                {thumbnailUrl}
                </Input>
            </Item>
            <View
              style={{
                width: '100%',
              }}
            >
              <Textarea
                rowSpan={8}
                bordered
                borderColor={
                  errors.arePresent && errors.data.clubDescription
                    ? colors.error
                    : colors.grayScale3
                }
                placeholderTextColor={
                  errors.arePresent && errors.data.clubDescription
                    ? colors.error
                    : null
                }
                placeholder={
                  errors.arePresent && errors.data.clubDescription
                    ? 'Invalid description*'
                    : 'Description*'
                }
                value={clubDescription}
                onChangeText={(value) => this.setState({ clubDescription: value })}
                style={{
                  alignSelf: 'center',
                  width: '95%',
                  paddingBottom: '5%',
                  marginLeft: '4%',
                  marginBottom: '5%',
                }}
              >
                </Textarea>
              {errors.arePresent && errors.data.clubDescription ? (
                <Text
                  style={{
                    color: colors.error,
                    fontSize: 14,
                    alignSelf: 'center',
                    width: '95%',
                    paddingBottom: '5%',
                    marginLeft: '4%',
                  }}
                >
                  Must be less than 280 characters
                </Text>
              ) : null}
            </View>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Ionicons
                name="logo-slack"
                size={27}
                style={{ marginRight: '4%' }}
              />
              <Input
                onChangeText={(value) => this.setState({ slackLink: value })}
                height="50%"
                placeholderTextColor={
                  errors.arePresent && errors.data.slackLink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder={
                  errors.arePresent && errors.data.slackLink
                    ? 'Invalid Link'
                    : 'Slack URL'
                }
              >
                {slackLink}
                </Input>
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Ionicons
                name="logo-facebook"
                size={27}
                style={{ marginRight: '4%' }}
              />
              <Input
                onChangeText={(value) => this.setState({ facebookLink: value })}
                height="50%"
                placeholderTextColor={
                  errors.arePresent && errors.data.facebookLink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder={
                  errors.arePresent && errors.data.facebookLink
                    ? 'Invalid Link'
                    : 'Facebook URL'
                }
              >
                {facebookLink}
                </Input>
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Ionicons
                name="logo-instagram"
                size={27}
                style={{ marginRight: '4%' }}
              />
              <Input
                height="50%"
                placeholderTextColor={{ color: colors.grayScale10 }}
                placeholder="Instagram Username"
              >
                {instagramLink}
                </Input>
            </Item>



          </Form>
          <Button
            style={{
              alignSelf: 'center',
              backgroundColor: colors.accent0,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1%',
              marginBottom: '5%',
            }}
            onPress={this.editClub}
          >
            <Text style={{ alignSelf: 'center' }}>
              {processingRequest ? 'Editing...' : 'Save'}
            </Text>
          </Button>
          <Button
            style={{
              alignSelf: 'center',
              backgroundColor: colors.grayScale4,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1%',
              marginBottom: '5%',
            }}
          >
            <Text style={{ alignSelf: 'center', color: 'black' }}>
              Cancel
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
