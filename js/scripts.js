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
    if (!eventParams.eventTimeout) eventParams.eventTimeout = 4000;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ...eventParams
    });
  };

  window.callGoogleWebApp = async function() {
    const event = 'googleWebApp';
    const queryString = 'action=quotes&cacheexpiration=' + Math.ceil(5 + Math.random() * 15); // 5 a 20 segundos
    const url = `https://script.google.com/macros/s/AKfycbwLu-Elv5pC10ehajglL7gq6rkB8asH_LWkBmUFUtYGI2yA9csR/exec?${queryString}`;
    const div = document.querySelector('#googleWebApp');
    div.textContent = 'Calling Google Web App...';

    let data;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        data = 'Error fetching Google Web App.';
        pushToDataLayer(event, { status: 'Error' });
      } else {
        try {
          data = await response.json();
          pushToDataLayer(event, { status: 'OK', ...data });
        } catch (err) {
          data = err.message;
          pushToDataLayer(event, { status: 'Error', ...data });
        }
      }
    } catch (e) {
      data = 'Google Web App request failed.';
      pushToDataLayer(event, { status: 'Error', ...data });
    }
    this.textContent += ' - *';
    div.textContent = data.text;
  };
})();
