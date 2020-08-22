// @flow

export default () => {
  const thumbnailTheme = {
    '.square': {
      borderRadius: 0,
      '.small': {
        width: 126,
        height: 126,
        borderRadius: 0,
      },
      '.large': {
        width: 150,
        height: 150,
        borderRadius: 0,
      },
    },
    '.small': {
      width: 126,
      height: 126,
      borderRadius: 63,
      '.square': {
        borderRadius: 0,
      },
    },
    '.large': {
      width: 150,
      height: 150,
      borderRadius: 75,
      '.square': {
        borderRadius: 0,
      },
    },
    width: 126,
    height: 126,
    borderRadius: 63,
  };

  return thumbnailTheme;
};
