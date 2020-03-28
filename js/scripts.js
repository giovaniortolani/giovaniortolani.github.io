(function() {
  document.addEventListener('DOMContentLoaded', event => {
    console.log('%c> Page State:', 'font-weight:bold;color:red', 'DOM loaded.');
  });

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
      console.log('%c> Page State:', 'font-weight:bold color:red', 'readystate interactive.');
    }

    if (event.target.readyState === 'complete') {
      console.log('%c> Page State:', 'font-weight:bold;color:red', 'readystate complete.');
    }
  });

  window.addEventListener('load', event => {
    console.log('%c> Page State:', 'font-weight:bold;color:red', 'Window loaded.');
  });
})();

(function() {
  window.pushToDataLayer = function(event, eventParams) {
    if (!eventParams.eventCallback) eventParams.eventCallback = () => {};
    if (!eventParams.eventTimeout) eventParams.eventCallback = 4000;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ...eventParams
    });
  };

  window.callGoogleWebApp = async function() {
    const endpoint = 'https://script.google.com/macros/s/AKfycbwLu-Elv5pC10ehajglL7gq6rkB8asH_LWkBmUFUtYGI2yA9csR/exec';

    const div = document.querySelector('#googleWebApp');
    div.textContent = 'Calling Google Web App...';
    let data;
    const response = await fetch(endpoint);
    if (!response.ok) {
      data = 'Error fetching Google Web App.';
      pushToDataLayer('googleWebApp', { status: 'Error' });
    } else {
      try {
        data = await response.text();
        pushToDataLayer('googleWebApp', { status: 'OK', data });
      } catch (err) {
        data = err.message;
        pushToDataLayer('googleWebApp', { status: 'Error', data });
      }
    }
    div.textContent = data;
  };
})();
