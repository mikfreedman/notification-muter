describe('NotificationMuter.NotificationMuter', function () {
  var notificationMuter;

  beforeEach(function() {
    notificationMuter = new NotificationMuter.NotificationMuter();
  });

  it('runs', function() {
    var changes = {};
    notificationMuter.listener(changes, "local");
  });
});

