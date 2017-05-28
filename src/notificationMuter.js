window.NotificationMuter = window.NotificationMuter || {};

(function(NotificationMuter) {
  function notificationMuter() {
  }

  notificationMuter.prototype.listener = function(changes, namespace) {
    var notificationMuter = changes.notificationMuter;
    if (notificationMuter === undefined) {
      return;
    }

    var prefix = notificationMuter.newValue ? "no-" : "";

    var iconPaths =  {
      "16": "icons/" + prefix +"bell.png",
      "48": "icons/" + prefix +"bell.png",
      "128": "icons/" + prefix +"bell.png"
    }

    chrome.browserAction.setIcon({ path: iconPaths });

    var setting = notificationMuter.newValue ? "block" : "allow";
    chrome.contentSettings.notifications.set({
      primaryPattern: "<all_urls>",
      setting: setting
    }, function() {
      console.log("working", notificationMuter.newValue, setting);
    });
  }

  NotificationMuter.NotificationMuter = notificationMuter;
})(window.NotificationMuter);
