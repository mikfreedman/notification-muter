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
});

