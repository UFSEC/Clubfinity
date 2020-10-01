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
  static navigationOptions = {
    title: 'Create a club',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

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
    };
    this.state = {
      clubName: '',
      clubDescription: '',
      clubCategory: '',
      position: '',
      tags: 'placeholder',
      thumbnailUrl: '',
      facebookLink: '',
      processingRequest: false,
      createdClub: false,
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
    } = this.state;
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
    );
    if (createClubResponse.successfulRequest) {
      this.setState({ createdClub: true, processingRequest: false });
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
      position,
      errors,
    } = this.state;
    const errorData = errors;
    errorData.clubName = clubName === '' || clubName.length < 3;
    errorData.clubDescription = clubDescription === '' || clubDescription.length > 280;
    errorData.clubCategory = clubCategory === '' || clubCategory.length < 3;
    errorData.thumbnailUrl = !!thumbnailUrl && !this.validURL(thumbnailUrl);
    errorData.facebookLink = !!facebookLink && !this.validFacebookUrl(facebookLink);
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

  validURL = (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        + '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };

  validFacebookUrl = (str) => this.validURL(str) && str.toLowerCase().includes('facebook');

  render() {
    const {
      errors,
      processingRequest,
      createdClub,
      position,
      clubCategory,
      clubDescription,
    } = this.state;
    if (createdClub) {
      return (
        // Add routing to admin club management screen
        <Text>Successfully created club!</Text>
      );
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
            {errors.arePresent && errors.data.position ? (
              <Item
                picker
                fixedLabel
                style={{ width: '95%', marginBottom: '5%' }}
              >
                <Label style={{ color: colors.error }}>Position*</Label>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholderStyle={{ color: colors.error }}
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
            ) : (
              <Item
                picker
                fixedLabel
                style={{ width: '95%', marginBottom: '5%' }}
              >
                <Label>Position*</Label>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholderStyle={{ color: colors.grayScale10 }}
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
            )}
            {errors.arePresent && errors.data.clubCategory ? (
              <Item
                picker
                fixedLabel
                style={{ width: '95%', marginBottom: '5%' }}
              >
                <Label style={{ color: colors.error }}>Category*</Label>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholderStyle={{ color: colors.error }}
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
            ) : (
              <Item
                picker
                fixedLabel
                style={{ width: '95%', marginBottom: '5%' }}
              >
                <Label>Category*</Label>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholderStyle={{ color: colors.grayScale10 }}
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
            )}
            {errors.arePresent && errors.data.thumbnailUrl ? (
              <Item
                fixedLabel
                style={{ width: '95%', height: 45, marginBottom: '5%' }}
              >
                <Label style={{ color: colors.error }}>Thumbnail URL</Label>
                <Input
                  onChangeText={(value) => this.setState({ thumbnailUrl: value })}
                  style={{ textAlign: 'right' }}
                  placeholderTextColor={colors.error}
                  placeholder="Invalid Link"
                />
              </Item>
            ) : (
              <Item
                fixedLabel
                style={{ width: '95%', height: 45, marginBottom: '5%' }}
              >
                <Label>Thumbnail URL</Label>
                <Input
                  onChangeText={(value) => this.setState({ thumbnailUrl: value })}
                  style={{ textAlign: 'right' }}
                  placeholder=""
                />
              </Item>
            )}
            {errors.arePresent && errors.data.facebookLink ? (
              <Item
                fixedLabel
                style={{ width: '95%', height: 45, marginBottom: '5%' }}
              >
                <Label style={{ color: colors.error }}>Facebook</Label>
                <Input
                  onChangeText={(value) => this.setState({ facebookLink: value })}
                  style={{ textAlign: 'right' }}
                  placeholderTextColor={colors.error}
                  placeholder="Invalid Link"
                />
              </Item>
            ) : (
              <Item
                fixedLabel
                style={{ width: '95%', height: 45, marginBottom: '5%' }}
              >
                <Label>Facebook</Label>
                <Input
                  onChangeText={(value) => this.setState({ facebookLink: value })}
                  style={{ textAlign: 'right' }}
                  placeholder=""
                />
              </Item>
            )}

            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label>Instagram</Label>
              <Input style={{ textAlign: 'right' }} />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '10%' }}
            >
              <Label>Slack</Label>
              <Input style={{ textAlign: 'right' }} />
            </Item>
            {errors.arePresent && errors.data.clubDescription ? (
              <View
                style={{
                  width: '100%',
                }}
              >
                <Textarea
                  rowSpan={5}
                  bordered
                  borderColor={colors.error}
                  placeholderTextColor={colors.error}
                  placeholder="Invalid description*"
                  value={clubDescription}
                  onChangeText={(value) => this.setState({ clubDescription: value })}
                  style={{
                    alignSelf: 'center',
                    width: '95%',
                    paddingBottom: '5%',
                    marginLeft: '4%',
                  }}
                />
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
              </View>
            ) : (
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Description (Max 280 characters)*"
                value={clubDescription}
                onChangeText={(value) => this.setState({ clubDescription: value })}
                placeholderStyle={{ color: colors.grayScale10 }}
                style={{
                  alignSelf: 'center',
                  width: '95%',
                  paddingBottom: '5%',
                  marginLeft: '4%',
                }}
              />
            )}
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
