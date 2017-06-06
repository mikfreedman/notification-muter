window.Muters = window.Muters || {};

(function(ReinjectListener) {
  function reinjectListener(chrome) {
    return function() {
      console.log("background.js: reinject content scripts into all tabs");
      var manifest = chrome.app.getDetails();
      chrome.tabs.query({}, function(openTabs) {
        for (var i in openTabs) {
          if(!!openTabs[i].url) {
            var scripts = manifest.content_scripts[0].js;
            var k = 0, s = scripts.length;
            for( ; k < s; k++ ) {
              chrome.tabs.executeScript(openTabs[i].id, {
                file: scripts[k]
              });
            }
          }
        }
      });
    }
  }

  Muters.ReinjectListener = reinjectListener;
})(window.Muters);
