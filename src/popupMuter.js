window.Muters = window.Muters || {};

(function(PopupMuter) {
  function popupMuter(chrome) {
    var contentSettings = chrome.contentSettings;

    this.storageChangedListener = function(changes, namespace) {
      var notificationMuter = changes.notificationMuter;
      if (notificationMuter === undefined) {
        return;
      }

      if(notificationMuter.newValue) {
        contentSettings.popups.set({
          primaryPattern: "<all_urls>",
          setting: "block"
        }, function() {
          console.log("popups managed by extension and blocked for all urls");
        });

      } else {
        contentSettings.popups.clear({}, function() {
          console.log("popups no longer managed by extension");
        });
      }
    }
  }

  Muters.PopupMuter = popupMuter;
})(window.Muters);
