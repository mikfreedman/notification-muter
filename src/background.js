var notificationMuter = new NotificationMuter.NotificationMuter(chrome);

chrome.storage.onChanged.addListener(notificationMuter.storageChangedListener);

chrome.browserAction.onClicked.addListener(notificationMuter.browserActionListener);
