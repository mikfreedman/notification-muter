window.Muters = window.Muters || {};

(function(AlertMuter) {
  function alertMuter(chrome) {
    var tabs = chrome.tabs;
    var storage = chrome.storage;

    var sendMessageToContentScript = function(mute) {
      tabs.query({}, function(openTabs) {
        for (var i=0; i<openTabs.length; ++i) {
          tabs.sendMessage(openTabs[i].id, { mute: mute });
        }
      });
    }

    storage.local.get("notificationMuter", function(items) {
      if(!!items.notificationMuter) {
        sendMessageToContentScript(true);
      }
    });

    this.storageChangedListener = function(changes, namespace) {
      var notificationMuter = changes.notificationMuter;
      if (notificationMuter === undefined) {
        return;
      }

      sendMessageToContentScript(notificationMuter.newValue);

      if(notificationMuter.newValue) {
        console.log("alerts converted to console log messages");
      } else {
        console.log("alerts switched back to actual alerts");
      }
    }
  }

  Muters.AlertMuter = alertMuter;
})(window.Muters);
