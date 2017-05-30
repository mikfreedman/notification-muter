describe('Muters.PopupMuter', function () {
  var popupMuter;
  var chrome;
  var items = {};

  beforeEach(function() {

    chrome = {
      contentSettings: {
        popups: {
          set: function() {
          },
          get: function() {
          },
          clear: function() {
          }
        }
      }
    }

    spyOn(chrome.contentSettings.popups, "set");
    spyOn(chrome.contentSettings.popups, "clear");
  });

  describe("when popups are managed", function() {
    it('blocks all urls', function() {
      popupMuter = new Muters.PopupMuter(chrome);
      popupMuter.storageChangedListener({notificationMuter: { newValue: true }});
      expect(chrome.contentSettings.popups.set).toHaveBeenCalledWith({primaryPattern: "<all_urls>", setting: "block"}, jasmine.any(Function));
    });
  })

  describe("when popups are no longer managed", function() {
    it('blocks all urls', function() {
      popupMuter = new Muters.PopupMuter(chrome);
      popupMuter.storageChangedListener({notificationMuter: { newValue: false }});
      expect(chrome.contentSettings.popups.clear).toHaveBeenCalled();
    });
  })
});

