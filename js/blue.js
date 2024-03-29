console.log('### Start of blue-tag.min.js', performance.now());
(window.blue = {}),
  (window.blue.isMobileDetected = function() {
    return !!(
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    );
  }),
  (window.blue.isFirefox = -1 < navigator.userAgent.toLowerCase().indexOf('firefox')),
  window.console ||
    (console = {
      log: function() {}
    }),
  (function(e, t) {
    (e = e || 'docReady'), (t = t || window);
    var n = [],
      o = !1,
      i = !1;
    function r() {
      if (!o) {
        o = !0;
        for (var e = 0; e < n.length; e++) n[e].fn.call(window, n[e].ctx);
        n = [];
      }
    }
    function a() {
      ('complete' !== document.readyState && 'interactive' !== document.readyState) || r();
    }
    t[e] = function(e, t) {
      if ('function' != typeof e) throw new TypeError('callback for docReady(fn) must be a function');
      o
        ? setTimeout(function() {
            e(t);
          }, 1)
        : (n.push({
            fn: e,
            ctx: t
          }),
          'complete' === document.readyState || 'interactive' === document.readyState
            ? setTimeout(r, 1)
            : i ||
              (document.addEventListener
                ? (document.addEventListener('DOMContentLoaded', r, !1), window.addEventListener('load', r, !1))
                : (document.attachEvent('onreadystatechange', a), window.attachEvent('onload', r)),
              (i = !0)));
    };
  })('documentReady', window),
  documentReady(function() {
    var e;
    (blue_obj[instId] = new blue_obj()),
      (window.blue_v = '28102019-1222'),
      (window.bluecpy_id = generateUid()),
      !0 === isCookieEnabled() &&
        ('' != (e = getCookie('blueID')) && 'null' !== e && null !== e
          ? (window.bluecpy_id = e)
          : setCookie('blueID', window.bluecpy_id, 365));
    !0 === isSessionStorageEnabled() &&
      (null !== (e = getSessionStorage('blueID')) && 'null' !== e
        ? (window.bluecpy_id = e)
        : setSessionStorage('blueID', window.bluecpy_id));
    !0 === isLocalStorageEnabled() &&
      (null !== (e = getLocalStorage('blueID')) && 'null' !== e
        ? (window.bluecpy_id = e)
        : setLocalStorage('blueID', window.bluecpy_id));
    if (
      !(
        'bluecpy_id' in window &&
        window.bluecpy_id.length &&
        '' != window.bluecpy_id &&
        null != window.bluecpy_id &&
        'null' != window.bluecpy_id
      )
    ) {
      window.bluecpy_id = generateUid();
      try {
        setCookie('blueID', window.bluecpy_id, 365);
      } catch (e) {}
      try {
        setSessionStorage('blueID', window.bluecpy_id);
      } catch (e) {}
      try {
        setLocalStorage('blueID', window.bluecpy_id);
      } catch (e) {}
    }
    executeFlow(instId);
  }),
  (executeFlow = function(e) {
    var t = window.blue_q || [];
    for (i = 0; i < t.length; i++) loadFunction(t[i].event, t[i].value);
    var n = blue_obj[e].getAttributes(),
      o = n.campaignId.split(','),
      r = n.pageType.split(',');
    for (idxCampaignId = 0; idxCampaignId < o.length; idxCampaignId++)
      for (idxPageType = 0; idxPageType < r.length; idxPageType++) executeRequests(o[idxCampaignId], r[idxPageType]);
  });
var instId = new Date().getTime(),
  campaignId = '',
  pageType = '',
  blueProductId = '',
  transactionTotal = '',
  transactionId = '',
  p1 = '',
  p2 = '',
  p3 = '',
  fingerprint = '';
function setLocalStorage(e, t) {
  try {
    return localStorage.setItem(e, t), !0;
  } catch (e) {
    return !1;
  }
}
function getLocalStorage(e) {
  try {
    return localStorage.getItem(e);
  } catch (e) {
    return '';
  }
}
function setSessionStorage(e, t) {
  try {
    return window.sessionStorage.setItem(e, t), !0;
  } catch (e) {
    return !1;
  }
}
function getSessionStorage(e) {
  try {
    return window.sessionStorage.getItem(e);
  } catch (e) {
    return '';
  }
}
function setCookie(e, t, n) {
  var o = new Date();
  o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
  var i = 'expires=' + o.toUTCString();
  document.cookie = e + '=' + t + ';' + i + ';path=/';
}
function getCookie(t) {
  var e = t + '=';
  try {
    for (var n = decodeURIComponent(document.cookie).split(';'), o = 0; o < n.length; o++) {
      for (var i = n[o]; ' ' == i.charAt(0); ) i = i.substring(1);
      if (0 == i.indexOf(e)) return i.substring(e.length, i.length);
    }
    return '';
  } catch (e) {
    return getLocalStorage(t);
  }
}
function generateUid() {
  var n = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(e) {
    var t = (n + 16 * Math.random()) % 16 | 0;
    return (n = Math.floor(n / 16)), ('x' == e ? t : (3 & t) | 8).toString(16);
  });
}
(loadFunction = function(exec, val) {
  eval('blue_obj[' + instId + '].' + exec + "('" + val + "')");
}),
  (executeRequests = function(e, t) {
    var n = blue_obj[instId].mountSourcePixel(e, t),
      o = createImgElement(n),
      i = blue_obj[instId].mountSource(e, t),
      r = createIframeElement(i),
      a = blue_obj[instId].getSslWidget(e, t),
      u = createScriptElement(a);
    createDivElement(function(e) {
      document.getElementById(e).appendChild(u),
        document.getElementById(e).appendChild(o),
        document.getElementById(e).appendChild(r);
    });
  }),
  (blue_obj = function() {}),
  (blue_obj.prototype.getSrc = function() {
    return ('https:' == document.location.protocol ? 'https://' : 'http://') + 'event.getblue.io/p/';
  }),
  (blue_obj.prototype.getSrcPixel = function() {
    return ('https:' == document.location.protocol ? 'https://' : 'http://') + 'event.getblue.io/t/';
  }),
  (blue_obj.prototype.mountSource = function(e, t) {
    var n = blue_obj[instId].getAttributes(),
      o = 1e13 * (Math.random() + '');
    return (
      n.source +
      '?cId=' +
      e +
      '&tName=' +
      t +
      '&pId=' +
      n.blueProductId +
      '&revenue=' +
      n.transactionTotal +
      '&orderId=' +
      n.transactionId +
      '&p1=' +
      n.p1 +
      '&p2=' +
      n.p2 +
      '&p3=' +
      n.p3 +
      '&fp=' +
      n.fingerprint +
      '&blueID=' +
      window.bluecpy_id +
      '&v=' +
      window.blue_v +
      '&nocache=' +
      o
    );
  }),
  (blue_obj.prototype.getSslWidget = function(e, t) {
    var n = blue_obj[instId].getAttributes(),
      o = 1e13 * (Math.random() + ''),
      i = 0;
    return (
      top !== self && (i = 1),
      'https://sslwidget.getblue.io/event/?cId=' +
        e +
        '&tName=' +
        t +
        '&pId=' +
        n.blueProductId +
        '&revenue=' +
        n.transactionTotal +
        '&orderId=' +
        n.transactionId +
        '&p1=&p2=e%3Dvp&p3=e%3Ddis&adce=1&dtycbr=87954&fp=' +
        n.fingerprint +
        '&blueID=' +
        window.bluecpy_id +
        '&v=' +
        window.blue_v +
        '&if=' +
        i +
        '&nocache=' +
        o
    );
  }),
  (blue_obj.prototype.mountSourcePixel = function(e, t) {
    var n = blue_obj[instId].getAttributes(),
      o = 1e13 * (Math.random() + '');
    return (
      n.sourcePixel +
      '?cId=' +
      e +
      '&tName=' +
      t +
      '&pId=' +
      n.blueProductId +
      '&revenue=' +
      n.transactionTotal +
      '&orderId=' +
      n.transactionId +
      '&p1=' +
      n.p1 +
      '&p2=' +
      n.p2 +
      '&p3=' +
      n.p3 +
      '&fp=' +
      n.fingerprint +
      '&blueID=' +
      window.bluecpy_id +
      '&v=' +
      window.blue_v +
      '&nocache=' +
      o
    );
  }),
  (blue_obj.prototype.setFingerprint = function(e) {
    this.fingerprint = e;
  }),
  (blue_obj.prototype.setCampaignId = function(e) {
    this.campaignId = e;
  }),
  (blue_obj.prototype.setPageType = function(e) {
    this.pageType = e;
  }),
  (blue_obj.prototype.setProductId = function(e) {
    this.blueProductId = e;
  }),
  (blue_obj.prototype.setTransactionTotal = function(e) {
    this.transactionTotal = e;
  }),
  (blue_obj.prototype.setTransactionId = function(e) {
    this.transactionId = e;
  }),
  (blue_obj.prototype.setP1 = function(e) {
    this.p1 = e;
  }),
  (blue_obj.prototype.setP2 = function(e) {
    this.p2 = e;
  }),
  (blue_obj.prototype.setP3 = function(e) {
    this.p3 = e;
  }),
  (blue_obj.prototype.getAttributes = function() {
    var e = {};
    return (
      (e.campaignId = this.campaignId || ''),
      (e.pageType = this.pageType || ''),
      (e.blueProductId = this.blueProductId || ''),
      (e.transactionTotal = this.transactionTotal || ''),
      (e.transactionId = this.transactionId || ''),
      (e.p1 = this.p1 || ''),
      (e.p2 = this.p2 || ''),
      (e.p3 = this.p3 || ''),
      (e.fingerprint = this.fingerprint || ''),
      (e.source = blue_obj[instId].getSrc()),
      (e.sourcePixel = blue_obj[instId].getSrcPixel()),
      e
    );
  }),
  (createDivElement = function(e) {
    var t = 'blue-tags-div';
    if (!document.getElementById(t)) {
      var n = document.createElement('div');
      n.setAttribute('id', t), n.setAttribute('style', 'display:none;'), document.body.appendChild(n);
    }
    e(t);
  }),
  (createIframeElement = function(e) {
    var t = document.createElement('iframe');
    return (
      (t.src = e),
      (t.width = 1),
      (t.height = 1),
      (t.frameBorder = 0),
      t.setAttribute('style', 'border-width:0px; margin:0px;'),
      t
    );
  }),
  (createScriptElement = function(e) {
    var t = document.createElement('script');
    return t.setAttribute('async', 'true'), t.setAttribute('type', 'text/javascript'), t.setAttribute('src', e), t;
  }),
  (createImgElement = function(e) {
    var t = document.createElement('img');
    return (
      (t.src = e), (t.width = 1), (t.height = 1), t.setAttribute('style', 'border-width:0px; margin:0px; width:1px;'), t
    );
  }),
  (isSessionStorageEnabled = function() {
    return !!window.sessionStorage;
  }),
  (isLocalStorageEnabled = function() {
    var e = 'test';
    try {
      return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
    } catch (e) {
      return !1;
    }
  }),
  (isCookieEnabled = function() {
    var e = navigator.cookieEnabled;
    return e || ((document.cookie = 'testcookie'), (e = -1 != document.cookie.indexOf('testcookie'))), !!e;
  });
console.log('### End of blue-tag.min.js', performance.now());
