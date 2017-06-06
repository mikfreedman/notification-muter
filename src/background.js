var notificationMuter = new Muters.NotificationMuter(chrome);
var popupMuter = new Muters.PopupMuter(chrome);
var alertMuter = new Muters.AlertMuter(chrome);
var iconListener = new Muters.IconListener(chrome);

chrome.storage.onChanged.addListener(notificationMuter.storageChangedListener);
chrome.storage.onChanged.addListener(popupMuter.storageChangedListener);
chrome.storage.onChanged.addListener(iconListener.storageChangedListener);
chrome.storage.onChanged.addListener(alertMuter.storageChangedListener);

chrome.browserAction.onClicked.addListener(new Muters.ClickListener(chrome));


chrome.runtime.onInstalled.addListener(new Muters.ReinjectListener(chrome));

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.property == "mute") {
      chrome.storage.local.get("notificationMuter", function(items) {
        sendResponse({ mute: !!items.notificationMuter});
      });
    } else {
      sendResponse({ mute: false });
    }
    return true;
  });

