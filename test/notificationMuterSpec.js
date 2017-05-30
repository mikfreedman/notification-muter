describe('Muters.NotificationMuter', function () {
  var notificationMuter;
  var chrome;
  var items = {};

  beforeEach(function() {

    chrome = {
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
    spyOn(chrome.contentSettings.notifications, "set");
    spyOn(chrome.contentSettings.notifications, "clear");
  });

  describe('browser action click', function() {
    it('sets the variable', function() {
      notificationMuter = new Muters.NotificationMuter(chrome);
      notificationMuter.browserActionListener({});
      expect(chrome.storage.local.set).toHaveBeenCalled();
    });
  })

  describe("when notifications are managed", function() {
    it('blocks all urls', function() {
      notificationMuter = new Muters.NotificationMuter(chrome);
      notificationMuter.storageChangedListener({notificationMuter: { newValue: true }});
      expect(chrome.contentSettings.notifications.set).toHaveBeenCalledWith({primaryPattern: "<all_urls>", setting: "block"}, jasmine.any(Function));
    });
  })

  describe("when notifications are no longer managed", function() {
    it('blocks all urls', function() {
      notificationMuter = new Muters.NotificationMuter(chrome);
      notificationMuter.storageChangedListener({notificationMuter: { newValue: false }});
      expect(chrome.contentSettings.notifications.clear).toHaveBeenCalled();
    });
  })
});

