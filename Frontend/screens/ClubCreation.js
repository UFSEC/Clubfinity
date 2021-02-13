import React, { Component } from 'react';
import { AsyncStorage, View, Platform } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Input,
  Textarea,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import ClubsApi from '../api/ClubsApi';
import colors from '../util/colors';
import {
  isValidFacebookUrl, isValidUrl, isValidInstagramUrl, isValidSlackUrl,
} from '../util/validation';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

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

export default class ClubCreation extends Component {
  static navigationOptions = buildNavigationsOptions('Create a club')

  constructor(props) {
    super(props);
    const errors = {
      clubName: false,
      clubDescription: false,
      clubCategory: false,
      position: false,
      tags: false,
      thumbnailUrl: false,
      facebookLink: false,
      instagramLink: false,
      slackLink: false,
    };
    this.state = {
      clubName: '',
      clubDescription: '',
      clubCategory: '',
      position: '',
      tags: 'placeholder',
      thumbnailUrl: '',
      facebookLink: '',
      instagramLink: '',
      slackLink: '',
      processingRequest: false,
      errors: { arePresent: false, data: errors },
    };
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

  createClub = async () => {
    const {
      clubName,
      clubCategory,
      clubDescription,
      tags,
      thumbnailUrl,
      facebookLink,
      instagramLink,
      slackLink,
    } = this.state;

    const { navigation } = this.props;

    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        errors: { arePresent: true, data: validRequest.errors },
      });
      return;
    }
    this.setState({
      processingRequest: true,
      errors: { arePresent: false, data: validRequest.errors },
    });
    const userToken = await AsyncStorage.getItem('userToken');
    const createClubResponse = await ClubsApi.createClub(
      userToken,
      clubName,
      clubCategory,
      clubDescription,
      tags,
      thumbnailUrl,
      facebookLink,
      instagramLink,
      slackLink,
    );
    if (createClubResponse.successfulRequest) {
      this.setState({ processingRequest: false });

      // Navigate to the club screen of the created club, and when back is clicked go directly to settings page
      navigation.replace('ClubScr', { club: createClubResponse.data });
    } else {
      console.log(createClubResponse.error);
      this.setState({ processingRequest: false });
    }
  };

  isRequestValid = () => {
    const {
      clubName,
      clubCategory,
      clubDescription,
      tags,
      thumbnailUrl,
      facebookLink,
      instagramLink,
      slackLink,
      position,
      errors,
    } = this.state;
    const errorData = errors;
    errorData.clubName = clubName === '' || clubName.length < 3;
    errorData.clubDescription = clubDescription === '' || clubDescription.length > 280;
    errorData.clubCategory = clubCategory === '' || clubCategory.length < 3;
    errorData.thumbnailUrl = !!thumbnailUrl && !isValidUrl(thumbnailUrl);
    errorData.facebookLink = !!facebookLink && !isValidFacebookUrl(facebookLink);
    errorData.instagramLink = !!instagramLink && !isValidInstagramUrl(instagramLink);
    errorData.slackLink = !!slackLink && !isValidSlackUrl(slackLink);
    errorData.position = position === '';
    errorData.tags = tags === '';

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
      errors,
      processingRequest,
      position,
      clubCategory,
      clubDescription,
    } = this.state;
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
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.clubName
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Club Name*
              </Label>
              <Input
                onChangeText={(value) => this.setState({ clubName: value })}
                style={{ textAlign: 'right' }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.clubName
                    ? 'Invalid club name'
                    : ''
                }
              />
            </Item>
            <Item
              picker
              fixedLabel
              style={{ width: '95%', marginBottom: '5%' }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.position
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Position*
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholderStyle={
                  errors.arePresent && errors.data.position
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder="Select position"
                selectedValue={position}
                onValueChange={(value) => this.onPositionChange(value)}
              >
                {positionList}
              </Picker>
              {Platform.OS === 'ios' ? (
                <Ionicons
                  name="md-arrow-dropdown"
                  size={20}
                  style={{ paddingTop: '1%' }}
                />
              ) : null}
            </Item>
            <Item
              picker
              fixedLabel
              style={{ width: '95%', marginBottom: '5%' }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.clubCategory
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Category*
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholderStyle={
                  errors.arePresent && errors.data.clubCategory
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder="Select club category"
                selectedValue={clubCategory}
                onValueChange={(value) => this.onCategoryChange(value)}
              >
                {categories}
              </Picker>
              {Platform.OS === 'ios' ? (
                <Ionicons
                  name="md-arrow-dropdown"
                  size={20}
                  style={{ paddingTop: '1%' }}
                />
              ) : null}
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.thumbnailUrl
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Thumbnail URL
              </Label>
              <Input
                onChangeText={(value) => this.setState({ thumbnailUrl: value })}
                style={{ textAlign: 'right' }}
                placeholderTextColor={
                  errors.arePresent && errors.data.position
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder={
                  errors.arePresent && errors.data.thumbnailUrl
                    ? 'Invalid Link'
                    : 'Thumbnail URL'
                }
              />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.facebookLink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Facebook
              </Label>
              <Input
                onChangeText={(value) => this.setState({ facebookLink: value })}
                style={{ textAlign: 'right' }}
                placeholderTextColor={
                  errors.arePresent && errors.data.facebookLink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder={
                  errors.arePresent && errors.data.thumbnailUrl
                    ? 'Invalid Link'
                    : 'Facebook URL'
                }
              />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.instagramLink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Instagram
              </Label>
              <Input
                onChangeText={(value) => this.setState({ instagramLink: value })}
                style={{ textAlign: 'right' }}
                placeholderTextColor={
                  errors.arePresent && errors.data.instagramLink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder={
                  errors.arePresent && errors.data.instagramUrl
                    ? 'Invalid Link'
                    : 'Instagram URL'
                }
              />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.slackink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Slack
              </Label>
              <Input
                onChangeText={(value) => this.setState({ slackLink: value })}
                style={{ textAlign: 'right' }}
                placeholderTextColor={
                  errors.arePresent && errors.data.slackLink
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder={
                  errors.arePresent && errors.data.slackUrl
                    ? 'Invalid Link'
                    : 'Slack URL'
                }
              />
            </Item>

            <View
              style={{
                width: '100%',
              }}
            >
              <Textarea
                rowSpan={5}
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
                }}
              />
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
            onPress={this.createClub}
          >
            <Text style={{ alignSelf: 'center' }}>
              {processingRequest ? 'Creating...' : 'Create Club'}
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
