export default {
  name: 'Clubfinity',
  description: 'Platform for Gator Club events.',
  slug: 'Clubfinity',
  privacy: 'public',
  platforms: [
    'ios',
    'android',
  ],
  version: '1.0.5',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    '**/*',
  ],
  android: {
    package: 'com.ufsec.clubfinity',
    googleServicesFile: './google-services.json',
    useNextNotificationsApi: true,
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.pablof300.Clubfinity',
  },
};
