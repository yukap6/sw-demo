if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-test/sw.js', { 'scope': '/sw-test/' }).then(
    (registration) => {
      // Register success
      var serviceWorkerState;
      if (registration.installing) {
        serviceWorkerState = registration.installing;
        console.log('Service worker\'s life cycle is installing');
      } else if (registration.waiting) {
        serviceWorkerState = registration.waiting;
        console.log('Service worker\'s life cycle is installed');
      }else if (registration.active) {
        serviceWorkerState = registration.active;
        console.log('Service worker\'s life cycle is activated');
      }
      if (serviceWorkerState) {
        console.log(serviceWorkerState.state);
        serviceWorkerState.addEventListener('statechange', function (e) {
            console.log('state changed to ', e.target.state);
        });
      }
    }
  ).catch((e) => {
    console.error('Registration failed with ' + e);
  });
}
