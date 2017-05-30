describe('Muters.IconListener', function () {
  var iconListener;
  var chrome;
  var items = {};

  beforeEach(function() {
    chrome = {
      browserAction: {
        setIcon: function() {
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

    spyOn(chrome.browserAction, "setIcon");
  });

  describe("when notifications are muted", function() {
    it('sets the icon on startup', function() {
      items.notificationMuter = true
      iconListener = new Muters.IconListener(chrome);
      expect(chrome.browserAction.setIcon).toHaveBeenCalled();
    });
  });

  describe("when notifications aren't muted", function() {
    it('doesn\'t set the icon on startup', function() {
      items.notificationMuter = false
      iconListener = new Muters.IconListener(chrome);
      expect(chrome.browserAction.setIcon).not.toHaveBeenCalled();
    });
  });
});

