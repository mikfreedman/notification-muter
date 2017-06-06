console.log("inject.js: content script injected");

var elt = document.createElement("script");
elt.innerHTML = "if(!window._alert) { window._alert = window.alert; window.alert = function ( text ) { !!window.mute ? console.log( 'tried to alert: ' + text ) : window._alert(text); return true; }; }"
document.head.appendChild(elt);

var createElement = function(mute) {
  console.log("inject.js: creating element");

  var elt = document.createElement("script");
  elt.innerHTML = "window.mute = " + mute +";"
  document.head.appendChild(elt);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    createElement(!!request.mute);
  });

chrome.runtime.sendMessage({property: "mute"}, function(response) {
  createElement(response.mute);
});
