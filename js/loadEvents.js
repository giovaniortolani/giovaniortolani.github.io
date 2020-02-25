(function() {
  document.addEventListener('DOMContentLoaded', event =>
    console.log('%c> Page State:', 'font-weight:bold;color:red', 'DOM loaded.')
  );

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
      console.log('%c> Page State:', 'font-weight:bold color:red', 'readystate interactive.');
    }
  });

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
      console.log('%c> Page State:', 'font-weight:bold;color:red', 'readystate complete.');
    }
  });

  window.addEventListener('load', event =>
    console.log('%c> Page State:', 'font-weight:bold;color:red', 'Window loaded.')
  );
})();
