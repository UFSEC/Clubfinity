import React, { Component } from 'react';
import { Text, StyleSheet, StatusBar } from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
} from 'native-base';

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
      const { navigation } = this.props;
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
              <Item>
                <Input placeholder="Edit Title" />
              </Item>
              <Item>
                <Input placeholder="Edit Description" />
              </Item>
            </Form>
            <Button
              onPress={() => navigation.navigate('AdminDashboard')}
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
