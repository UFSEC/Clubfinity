import { StyleSheet } from 'react-native';

// Primary Style Guide for entire application
export const primary = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F7',
  },
  bodyText: {
    color: '#636e72',
    fontSize: 13,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '100',
    margin: 10,
    alignSelf: 'center',
    color: '#636e72',
  },
});

export const club = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  description: {
    fontSize: 15,
    fontWeight: '200',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export const smCard = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6fa',
    padding: 0,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 0,
    marginBottom: 10,
    borderColor: '#f5f6fa',
    borderRadius: 10,
    borderWidth: 4,
    elevation: 2,
    height: 190,
    width: 155,
  },
});

// Style definition for card components
export const card = StyleSheet.create({
  title: {
    color: '#2980b9',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 5,
  },
  clubname: {
    color: '#2980b9',
  },

  location: {
    color: 'teal',
    fontWeight: '700',
    margin: 5,
  },
  container: {
    backgroundColor: '#f5f6fa',
    padding: 15,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#f5f6fa',
    borderRadius: 5,
    borderWidth: 4,
    elevation: 2,
  },
  goingMarked: {
    backgroundColor: '#f5f6fa',
    padding: 15,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#55efc4',
    borderRadius: 5,
    borderWidth: 4,
    elevation: 3,
  },

  bodyText: {
    color: primary.bodyText.color,
    fontSize: primary.bodyText.fontSize,
    marginLeft: 4,
  },
  agendaText: {
    color: '#636e72',
    fontSize: 13,
    alignSelf: 'flex-end',
  },
  banner: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
  bannerIcon: {
    resizeMode: 'center',
    borderRadius: 25,
    marginRight: 10,
    height: 50,
    width: 50,
  },
  body: {
    flex: 5,
  },
});

export const post = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f6fa',
    padding: 0,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f5f6fa',
    borderRadius: 3,
    elevation: 2,
    height: 60,
  },
});

export const emptyEventList = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
    color: '#636e72',
  },
});
