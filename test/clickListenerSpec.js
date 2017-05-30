describe('Muters.ClickListener', function () {
  var clickListener;
  var chrome;
  var items = {};

  beforeEach(function() {
    chrome = {
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
  });

  describe('browser action click', function() {
    it('sets the variable', function() {
      clickListener = new Muters.ClickListener(chrome)();
      expect(chrome.storage.local.set).toHaveBeenCalled();
    });
  })
});

