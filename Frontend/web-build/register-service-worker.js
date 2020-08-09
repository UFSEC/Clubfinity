/* eslint-env browser */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/expo-service-worker.js', { scope: '/' })
      .then((info) => {
        console.info('Registered service-worker', info);
      })
      .catch((error) => {
        console.info('Failed to register service-worker', error);
      });
  });
}
