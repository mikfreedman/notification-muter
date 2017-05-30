window.Muters = window.Muters || {};

(function(IconListener) {
  function iconListener(chrome) {
    var browserAction = chrome.browserAction;
    var storage = chrome.storage;

    var iconPaths = function(prefix) {
      return {
        "16": "icons/" + prefix +"bell.png",
        "48": "icons/" + prefix +"bell.png",
        "128": "icons/" + prefix +"bell.png"
      }
    }

    storage.local.get("notificationMuter", function(items) {
      if(!!items.notificationMuter) {
        browserAction.setIcon({path: iconPaths("no-")});
      }
    });

    this.storageChangedListener = function(changes, namespace) {
      var notificationMuter = changes.notificationMuter;
      if (notificationMuter === undefined) {
        return;
      }

      var prefix = notificationMuter.newValue ? "no-" : "";

      browserAction.setIcon({ path: iconPaths(prefix) });
    }
  }

  Muters.IconListener = iconListener;
})(window.Muters);
