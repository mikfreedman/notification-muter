var notificationMuter = new Muters.NotificationMuter(chrome);
var popupMuter = new Muters.PopupMuter(chrome);
var alertMuter = new Muters.AlertMuter(chrome);
var iconListener = new Muters.IconListener(chrome);

chrome.storage.onChanged.addListener(notificationMuter.storageChangedListener);
chrome.storage.onChanged.addListener(popupMuter.storageChangedListener);
chrome.storage.onChanged.addListener(iconListener.storageChangedListener);
chrome.storage.onChanged.addListener(alertMuter.storageChangedListener);

chrome.browserAction.onClicked.addListener(new Muters.ClickListener(chrome));
