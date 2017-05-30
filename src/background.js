var notificationMuter = new Muters.NotificationMuter(chrome);
var iconListener = new Muters.IconListener(chrome);

chrome.storage.onChanged.addListener(notificationMuter.storageChangedListener);
chrome.storage.onChanged.addListener(iconListener.storageChangedListener);

chrome.browserAction.onClicked.addListener(notificationMuter.browserActionListener);
