window.Muters = window.Muters || {};

(function(ClickListener) {
  function clickListener(chrome) {
    var storage = chrome.storage;

    return function(tab) {
      storage.local.get("notificationMuter", function(items) {
        storage.local.set({"notificationMuter": !items.notificationMuter});
      });
    }
  }

  Muters.ClickListener = clickListener;
})(window.Muters);
