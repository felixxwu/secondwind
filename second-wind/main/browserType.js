 // Opera 8.0+
 var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

 // Firefox 1.0+
 var isFirefox = typeof InstallTrigger !== 'undefined';

 // Safari 3.0+ "[object HTMLElementConstructor]" 
 var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

 // Chrome 1+
 var isChrome = !!window.chrome && !!window.chrome.webstore;

 if (!(isChrome || isFirefox || isOpera)) {
     alert("Warning: your browser might not be optimised for this game. We support Chrome, Firefox, Safari, and Opera. If you are not using one of these browsers, parts of the game might not work.");
 }