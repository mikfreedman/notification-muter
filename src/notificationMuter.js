window.NotificationMuter = window.NotificationMuter || {};

(function(NotificationMuter) {
  function notificationMuter(chrome) {
    var browserAction = chrome.browserAction;
    var contentSettings = chrome.contentSettings;
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

    this.browserActionListener = function(tab) {
      storage.local.get("notificationMuter", function(items) {
        storage.local.set({"notificationMuter": !items.notificationMuter});
      });
    }

    this.storageChangedListener = function(changes, namespace) {
      var notificationMuter = changes.notificationMuter;
      if (notificationMuter === undefined) {
        return;
      }

      var prefix = notificationMuter.newValue ? "no-" : "";

      browserAction.setIcon({ path: iconPaths(prefix) });

      var setting = notificationMuter.newValue ? "block" : "allow";
      contentSettings.notifications.set({
        primaryPattern: "<all_urls>",
        setting: setting
      }, function() {
        console.log("working", notificationMuter.newValue, setting);
      });
    }
  }

  NotificationMuter.NotificationMuter = notificationMuter;
})(window.NotificationMuter);
