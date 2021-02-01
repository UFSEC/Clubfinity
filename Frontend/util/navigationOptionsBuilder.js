import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colors from './colors';

const HEADER_TINT_COLOR = 'white';
const LETTER_SPACING = 2;
const ICON_SIZE = 30;
const ICON_COLOR = 'white';

// Header types
const NONE = 'NONE';
const ICON = 'icon';

const buildNavigationsOptions = (title, headerRight = NONE) => {
  const navigationOptions = {
    title,
    headerStyle: { backgroundColor: colors.primary0 },
    headerTitleStyle: { color: colors.grayScale1, letterSpacing: LETTER_SPACING },
    headerTintColor: HEADER_TINT_COLOR,
  };
  if (headerRight !== NONE) {
    const {
      type, iconName, navigateTo, navigation,
    } = headerRight;
    if (type === ICON) {
      navigationOptions.headerRight = (
        <HeaderIconComponent
          iconName={iconName}
          navigateTo={navigateTo}
          navigation={navigation}
        />
      );
    }
  }
  return navigationOptions;
};

const HeaderIconComponent = (props) => {
  const { iconName, navigateTo, navigation } = props;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
        style={{
          paddingTop: '2%',
          paddingRight: '2%',
          alignSelf: 'flex-end',
        }}
      >
        <Ionicons name={iconName} size={ICON_SIZE} color={ICON_COLOR} />
      </TouchableOpacity>
    </View>
  );
};

HeaderIconComponent.propTypes = {
  iconName: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired,
};

export default buildNavigationsOptions;
