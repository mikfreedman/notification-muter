chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var elt = document.createElement("script");

    if(!!request.mute) {
      elt.innerHTML = "window._alert = window.alert;" +
        "window.mute = true;" +
          "window.alert = function ( text ) { !!window.mute ? console.log( 'tried to alert: ' + text ) : window._alert(text); return true; };"
    } else {
      elt.innerHTML = "window.mute = false";
    }

    document.head.appendChild(elt);
  });
