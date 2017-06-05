window.Muters = window.Muters || {};

(function(NotificationMuter) {
  function notificationMuter(chrome) {
    var contentSettings = chrome.contentSettings;
    var storage = chrome.storage;

    this.storageChangedListener = function(changes, namespace) {
      var notificationMuter = changes.notificationMuter;
      if (notificationMuter === undefined) {
        return;
      }

      var prefix = notificationMuter.newValue ? "no-" : "";

      if(notificationMuter.newValue) {
        contentSettings.notifications.set({
          primaryPattern: "<all_urls>",
          setting: "block"
        }, function() {
          console.log("notifications managed by extension and blocked for all urls");
        });

      } else {
        contentSettings.notifications.clear({}, function() {
          console.log("notifications no longer managed by extension");
        });
      }
    }
  }

  Muters.NotificationMuter = notificationMuter;
})(window.Muters);
