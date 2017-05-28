var notificationMuter = new NotificationMuter.NotificationMuter();
chrome.storage.onChanged.addListener(notificationMuter.listener);

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.local.get("notificationMuter", function(items) {
    chrome.storage.local.set({"notificationMuter": !items.notificationMuter});
  });
});
