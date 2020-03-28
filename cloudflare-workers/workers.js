// Global variables
const trackingDomain = 'gepeto.ga';

// Helper functions

/**
 * Grabs the cookie with name from the headers
 * @param {string} cookieString of the Request/Response
 * @param {string} name of the cookie to grab
 */
function getCookie(cookieString, name) {
  let result = null;
  if (cookieString) {
    const cookies = cookieString.split(';');
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      if (cookieName === name) {
        const cookieVal = cookie.split('=')[1];
        result = cookieVal;
      }
    });
  }
  return result;
}

/**
 * XPTO
 * @param {Error} err Lorem Ipsum
 * @param {Response} response Lorem Ipsum
 */
function handleExceptions(err, response) {
  const stack = JSON.stringify(err.stack) || err;
  // Copy the response and initialize body to the stack trace
  response = new Response(stack, response);
  // Shove our rewritten URL into a header to find out what it was.
  response.headers.set('X-Debug-stack', stack);
  response.headers.set('X-Debug-err', err);
}

// prettier-ignore
var checkLinker = function (t) { var n, e, i = function (t, n) { for (var e = new Date, i = window.navigator, r = i.plugins || [], a = [t, i.userAgent, e.getTimezoneOffset(), e.getYear(), e.getDate(), e.getHours(), e.getMinutes() + n], s = 0; s < r.length; ++s)a.push(r[s].description); return o(a.join(".")) }, r = function (t, n) { var e = new Date, i = window.navigator, r = e.getHours() + Math.floor((e.getMinutes() + n) / 60); return o([t, i.userAgent, i.language || "", e.getTimezoneOffset(), e.getYear(), e.getDate() + Math.floor(r / 24), (24 + r) % 24, (60 + e.getMinutes() + n) % 60].join(".")) }, o = function (t) { var n, e = 1; if (t) for (e = 0, n = t.length - 1; 0 <= n; n--) { var i = t.charCodeAt(n); e = 0 != (i = 266338304 & (e = (e << 6 & 268435455) + i + (i << 14))) ? e ^ i >> 21 : e } return e.toString() }; if ("string" == typeof t && t.length) { if (!/_ga=/.test(t)) return "Invalid linker format in string argument!"; e = t.split("&").filter(function (t) { return "_ga" === t.split("=")[0] }).shift() } else e = (n = /[?&]_ga=/.test(window.location.search) ? "search" : /[#&]_ga=/.test(window.location.hash) ? "hash" : void 0) && window.location[n].substring(1).split("&").filter(function (t) { return "_ga" === t.split("=")[0] }).shift(); if (void 0 === e || !e.length) return "Invalid linker format in URL!"; var a, s, g, u, f = e.indexOf("."); return f > -1 && (e.substring(0, f), s = (a = e.substring(f + 1)).indexOf("."), g = a.substring(0, s), u = a.substring(s + 1)), void 0 !== u ? g === i(u = u.split("-").join(""), 0) || g === i(u, -1) || g === i(u, -2) || g === r(u, 0) || g === r(u, -1) || g === r(u, -2) : void 0 };

// O Service Worker faz o hijack de qualquer requisição que vêm da página
// e devolve uma resposta customizada (usando .respondWith()).
// Precisa fazer novamente a requisição, a fim de que receba a resposta
// do servidor original (do site hospedado).
addEventListener('fetch', event => {
  // Qualquer erro não tratado fazer com que o worker faça a requisição para a Origin "original"
  event.passThroughOnException();
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    // Faz a requisição para a Origin 'original'
    let response = await fetch(request);

    // Se não é recurso do domínio do site, deixa passar.
    // if (!request.url.match(new RegExp('^https?:\/\/' + trackingDomain, 'i'))) {
    //   return response;
    // }

    if (!response.ok) {
      let body = await response.text();
      throw new Error(
        // ensures is string that can be a header
        `Bad response at origin. Status: ${response.status} Body: ${body.trim().substring(0, 10)}`
      );
    }

    try {
      response = addHeaders(response);
    } catch (err) {
      handleExceptions(err, response);
    }

    try {
      response = handleGACookie(request, response);
    } catch (err) {
      handleExceptions(err, response);
    }

    return response;
  } catch (err) {
    handleExceptions(err, response);
  }
}

function addHeaders(response) {
  const securityHeaders = {
    //'Content-Security-Policy': 'upgrade-insecure-requests',
    //'Strict-Transport-Security': 'max-age=1000',
    //'X-Xss-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN'
    //'X-Content-Type-Options': 'nosniff',
    //'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
  const sanitiseHeaders = {
    server: 'Bruneca Bobo',
    pomarola: 'Sem iframe'
  };
  const removeHeaders = [
    //'Public-Key-Pins',
    //'X-Powered-By',
    //'X-AspNet-Version',
  ];

  // Copia os headers da resposta para poder modificá-los
  let newHdrs = new Headers(response.headers);

  // Caso não seja conteúdo HTML, deixa passar
  if (newHdrs.has('Content-Type') && !newHdrs.get('Content-Type').includes('text/html')) {
    return response;
  }

  Object.keys(securityHeaders).map(function(name) {
    newHdrs.set(name, securityHeaders[name]);
  });
  Object.keys(sanitiseHeaders).map(function(name) {
    newHdrs.set(name, sanitiseHeaders[name]);
  });
  removeHeaders.forEach(function(name) {
    newHdrs.delete(name);
  });

  // Cria uma nova resposta com os headers modificados
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHdrs
  });
}

function handleGACookie(request, response) {
  const gaCookieName = '_ga';

  // Copia o request para poder modificar os cookies (poderia ter copiado só os headers aqui)
  response = new Response(response.body, response);

  // Tratar linker param aqui
  /*
  if (url.includes('_ga')) {
    gaCookieValue = '';
  }
  */

  const cookies = request.headers.get('Cookie');
  let gaCookieValue = getCookie(cookies, gaCookieName);
  if (!gaCookieValue) {
    gaCookieValue = `${[
      'GA1',
      trackingDomain.split('.').length,
      crypto.getRandomValues(new Uint32Array(1))[0] & 2147483647,
      Math.round(new Date().getTime() / 1e3)
    ].join('.')}`;
  }

  // Define o valor do cookie _ga na resposta
  response.headers.set(
    'Set-Cookie',
    `${gaCookieName}=${gaCookieValue}; Domain=.${trackingDomain}; Max-Age=63072000; path=/; SameSite=None; Secure`
  );

  response.headers.set('X-Debug-Cookies-Header', `DEBUG: Cookies=${cookies}, _ga${gaCookieValue}`);

  return response;
}
