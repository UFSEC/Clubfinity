import React, { Component } from 'react';
import { Text, StyleSheet, StatusBar, EventSubscriptionVendor } from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
} from 'native-base';
import colors from "../util/colors"

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
    marginBottom: '5%'
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
export default class EditAnnouncements extends Component {
    

    constructor(props){
      super(props);
      const defaultError = {
        title: false,
        description: false
      }
      this.state = {
        title: '',
        description: '',
        errors: {arePresent: false, data: defaultError}
      }
    }

    editAnnouncement = async () => {
      const validRequest = this.isRequestValid();
      if (!validRequest.valid) {
        await this.setState({
          errors: { arePresent: true, data: validRequest.errors },
        });
        return;
      }
    }

    isRequestValid = () => {
      const {title,description} = this.state;
      const errorData = {title: false,description: false}
      errorData.title = title === ''
      errorData.description = description === '';
      const validRequest = !(errorData.title || errorData.description)
      return {valid: validRequest,errors:errorData}
    }



    static navigationOptions = ({ navigation }) => ({
      headerTitle: 'Edit Announcement',
      headerRight: (
        <Button onPress={() => navigation.navigate('AdminDashboard')} style={styles.headerRight} transparent>
          <Text style={styles.headerRightText}>Done</Text>
        </Button>
      ),
      headerLeft: () => (
        <Button onPress={() => navigation.navigate('AdminDashboard')} style={styles.headerLeft} transparent>
          <Text style={styles.headerLeftText}>Cancel</Text>
        </Button>
      ),
      headerStyle: { backgroundColor: '#7e947f' },
      headerTitleStyle: { color: '#ecf0f1', size: 6 },
      headerTintColor: 'white',
    })

    render() {
      const {errors} =this.state
      return (
        <Container>
          <Content>
            <Form
              style={styles.formStyle}
            >
              <Item style = {{
                marginBottom: '8%'
              }}>
                <Input 
                onChangeText = {(value) => this.setState({title: value})}
                placeholderTextColor = {
                  errors.arePresent && errors.data.title
                  ? colors.error
                  : colors.grayScale10
                }
                placeholder= {
                  errors.arePresent && errors.data.title
                  ? 'No Title Given'
                  : 'Edit Title'
                } />
              </Item>
              <Item>
                <Input 
                onChangeText = {(value) => this.setState({ description: value})}
                placeholderTextColor = {
                    errors.arePresent && errors.data.description 
                    ? colors.error
                    : colors.grayScale10
                }
                placeholder= {
                  errors.arePresent && errors.data.description 
                  ? 'No Description Given'
                  : 'Edit Description'
                } />
              </Item>
            </Form>
            <Button
              onPress={() => this.editAnnouncement()}
              style={styles.SaveButtonStyle}
              block
              info
            >
              <Text style={styles.buttonText}>Save</Text>
            </Button>
          </Content>
        </Container>

      );
    }
}
