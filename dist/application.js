(function() {
  window.App = {};

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Device = (function(_super) {
    __extends(Device, _super);

    function Device() {
      return Device.__super__.constructor.apply(this, arguments);
    }

    return Device;

  })(Backbone.Model);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.DeviceEditView = (function(_super) {
    __extends(DeviceEditView, _super);

    function DeviceEditView() {
      this.render = __bind(this.render, this);
      return DeviceEditView.__super__.constructor.apply(this, arguments);
    }

    DeviceEditView.prototype.template = JST['device-edit'];

    DeviceEditView.prototype.render = function() {
      return this.template();
    };

    return DeviceEditView;

  })(Backbone.View);

}).call(this);

(function() {
  var DevicesRouter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DevicesRouter = (function(_super) {
    __extends(DevicesRouter, _super);

    function DevicesRouter() {
      this.edit = __bind(this.edit, this);
      return DevicesRouter.__super__.constructor.apply(this, arguments);
    }

    DevicesRouter.prototype.routes = {
      '': 'edit'
    };

    DevicesRouter.prototype.edit = function() {
      var device, view;
      device = new App.Device;
      view = new App.DeviceEditView({
        model: device
      });
      return $('#main').html(view.render());
    };

    return DevicesRouter;

  })(Backbone.Router);

  new DevicesRouter;

}).call(this);

(function() {
  $(function() {
    return Backbone.history.start({
      pushState: true
    });
  });

}).call(this);