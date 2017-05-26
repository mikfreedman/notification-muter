chrome.storage.onChanged.addListener(function(changes, namespace) {
  var shushToggle = changes.shushToggle;
  if (shushToggle === undefined) {
    return;
  }

  var prefix = shushToggle.newValue ? "no-" : "";

  var iconPaths =  {
    "16": "icons/" + prefix +"bell.png",
    "48": "icons/" + prefix +"bell.png",
    "128": "icons/" + prefix +"bell.png"
  }

  chrome.browserAction.setIcon({ path: iconPaths });

  var setting = shushToggle.newValue ? "block" : "allow";
  chrome.contentSettings.notifications.set({
    primaryPattern: "<all_urls>",
    setting: setting
  }, function() {
    console.log("working", shushToggle.newValue, setting);
  });
});


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.local.get("shushToggle", function(items) {
    chrome.storage.local.set({"shushToggle": !items.shushToggle});
  });
});
