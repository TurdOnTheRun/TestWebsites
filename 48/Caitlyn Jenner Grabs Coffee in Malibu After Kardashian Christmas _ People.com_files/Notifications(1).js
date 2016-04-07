/**
 * Notification
 */
(function () {
    this.Notification = function (type, data, target) {
        this.type = type;
        this.data = data;
        this.target = target;
    };
    Notification.prototype.constructor = Notification;
    Notification.prototype.getType = function () {
        return this.type;
    };
    Notification.prototype.getData = function () {
        return this.data;
    };
    Notification.prototype.getTarget = function () {
        return this.target;
    };
})();

/**
 * Notifier
 */
(function () {
    this.Notifier = function () {
        this.observers = [];
    };
    Notifier.prototype.constructor = Notifier;
    Notifier.prototype.addObserver = function (value) {
        var check = false;
        var i = 0;
        for (i = 0; i < this.observers.length; i++) {
            if (this.observers[i] === value) {
                check = true;
            }
        }
        if (check === false) {
            this.observers.push(value);
        }
    };
    Notifier.prototype.removeObserver = function (value) {
        var i = 0;
        for (i = 0; i < this.observers.length; i++) {
            if (this.observers[i] === value) {
                this.observers.splice(i, 1);
                break;
            }
        }
    };
    Notifier.prototype.removeAllObservers = function () {
        this.observers = [];
    };
    Notifier.prototype.sendNotification = function (type, data, originator) {
        var notification = new Notification(type, data, originator);
        var i = 0;
        for (i = 0; i < this.observers.length; i++) {
            if (this.observers[i] !== originator) {
                this.observers[i].receiveNotification(notification);
            }
        }
    };
    Notifier.prototype.sendNotificationSelf = function (type, data, originator) {
        var notification = new Notification(type, data, originator);
        var i = 0;
        for (i = 0; i < this.observers.length; i++) {
            if (this.observers[i] == originator) {
                this.observers[i].receiveNotification(notification);
                break;
            }
        }
    };
    Notifier.prototype.getObservers = function () {
        return this.observers;
    };
})();