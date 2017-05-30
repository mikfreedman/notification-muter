describe('NotificationMuter.NotificationMuter', function () {
  var notificationMuter;
  var chrome;
  var items = {};

  beforeEach(function() {

    chrome = {
      browserAction: {
        setIcon: function() {
        }
      },
      contentSettings: {
        notifications: {
          set: function() {
          },
          get: function() {
          },
          clear: function() {
          }
        }
      },
      storage: {
        local: {
          get: function(key, callback) {
            callback(items);
          },
          set: function() {
          }
        }
      }
    }

    spyOn(chrome.storage.local, "set");
    spyOn(chrome.browserAction, "setIcon");
    spyOn(chrome.contentSettings.notifications, "set");
    spyOn(chrome.contentSettings.notifications, "clear");
  });

  describe("when notifications are muted", function() {
    it('sets the icon on startup', function() {
      items.notificationMuter = true
      notificationMuter = new NotificationMuter.NotificationMuter(chrome);
      expect(chrome.browserAction.setIcon).toHaveBeenCalled();
    });
  });

  describe("when notifications aren't muted", function() {
    it('doesn\'t set the icon on startup', function() {
      items.notificationMuter = false
      notificationMuter = new NotificationMuter.NotificationMuter(chrome);
      expect(chrome.browserAction.setIcon).not.toHaveBeenCalled();
    });
  });

  describe('browser action click', function() {
    it('sets the variable', function() {
      notificationMuter = new NotificationMuter.NotificationMuter(chrome);
      notificationMuter.browserActionListener({});
      expect(chrome.storage.local.set).toHaveBeenCalled();
    });
  })

  describe("when notifications are managed", function() {
    it('blocks all urls', function() {
      notificationMuter = new NotificationMuter.NotificationMuter(chrome);
      notificationMuter.storageChangedListener({notificationMuter: { newValue: true }});
      expect(chrome.contentSettings.notifications.set).toHaveBeenCalledWith({primaryPattern: "<all_urls>", setting: "block"}, jasmine.any(Function));
    });
  })

  describe("when notifications are no longer managed", function() {
    it('blocks all urls', function() {
      notificationMuter = new NotificationMuter.NotificationMuter(chrome);
      notificationMuter.storageChangedListener({notificationMuter: { newValue: false }});
      expect(chrome.contentSettings.notifications.clear).toHaveBeenCalled();
    });
  })
});

