(function() {
  window.App = {};

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.DeviceFindOrCreate = (function(_super) {
    __extends(DeviceFindOrCreate, _super);

    function DeviceFindOrCreate() {
      this.setCanGet = __bind(this.setCanGet, this);
      this.setCanCreate = __bind(this.setCanCreate, this);
      this.parse = __bind(this.parse, this);
      this.find = __bind(this.find, this);
      this.create = __bind(this.create, this);
      this.initialize = __bind(this.initialize, this);
      return DeviceFindOrCreate.__super__.constructor.apply(this, arguments);
    }

    DeviceFindOrCreate.prototype.idAttribute = 'uuid';

    DeviceFindOrCreate.prototype.urlRoot = 'https://meshblu.octoblu.com/devices/';

    DeviceFindOrCreate.prototype.initialize = function() {
      this.on('change:uuid change:token', this.setCanCreate);
      this.on('change:uuid change:token', this.setCanGet);
      this.setCanCreate();
      return this.setCanGet();
    };

    DeviceFindOrCreate.prototype.create = function() {
      return this.save({});
    };

    DeviceFindOrCreate.prototype.find = function() {
      var token, uuid, _ref;
      _ref = this.toJSON(), uuid = _ref.uuid, token = _ref.token;
      return this.fetch({
        headers: {
          skynet_auth_uuid: uuid,
          skynet_auth_token: token
        }
      });
    };

    DeviceFindOrCreate.prototype.parse = function(results) {
      var data;
      data = results;
      if (_.isArray(data.devices)) {
        data = _.first(data.devices);
      }
      return {
        uuid: data.uuid,
        token: data.token,
        device: data
      };
    };

    DeviceFindOrCreate.prototype.setCanCreate = function() {
      var token, uuid;
      uuid = this.get('uuid');
      token = this.get('token');
      return this.set({
        canCreate: !(uuid || token)
      });
    };

    DeviceFindOrCreate.prototype.setCanGet = function() {
      var token, uuid, _ref;
      uuid = this.get('uuid');
      token = this.get('token');
      this.set({
        canGet: !!(uuid && token)
      });
      return _ref = this.toJSON(), uuid = _ref.uuid, token = _ref.token, _ref;
    };

    return DeviceFindOrCreate;

  })(Backbone.Model);

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

  App.DeviceFindOrCreateView = (function(_super) {
    __extends(DeviceFindOrCreateView, _super);

    function DeviceFindOrCreateView() {
      this.values = __bind(this.values, this);
      this.updateModel = __bind(this.updateModel, this);
      this.submitForm = __bind(this.submitForm, this);
      this.clickCreate = __bind(this.clickCreate, this);
      this.setValues = __bind(this.setValues, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      return DeviceFindOrCreateView.__super__.constructor.apply(this, arguments);
    }

    DeviceFindOrCreateView.prototype.template = JST['device-find-or-create'];

    DeviceFindOrCreateView.prototype.className = 'device-find-or-create';

    DeviceFindOrCreateView.prototype.initialize = function() {
      return this.listenTo(this.model, 'change', this.setValues);
    };

    DeviceFindOrCreateView.prototype.events = {
      'keyup input': 'updateModel',
      'click .btn-create': 'clickCreate',
      'submit form': 'submitForm'
    };

    DeviceFindOrCreateView.prototype.render = function() {
      this.$el.html(this.template());
      this.setValues();
      return this.$el;
    };

    DeviceFindOrCreateView.prototype.setValues = function() {
      var values;
      values = this.model.toJSON();
      this.$('input[name=uuid]').val(values.uuid);
      this.$('input[name=token]').val(values.token);
      this.$('.btn-create').prop('disabled', !values.canCreate);
      return this.$('.btn-get').prop('disabled', !values.canGet);
    };

    DeviceFindOrCreateView.prototype.clickCreate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      return this.model.create();
    };

    DeviceFindOrCreateView.prototype.submitForm = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      return this.model.find();
    };

    DeviceFindOrCreateView.prototype.updateModel = function() {
      return this.model.set(this.values());
    };

    DeviceFindOrCreateView.prototype.values = function() {
      return {
        uuid: this.$('input[name=uuid]').val(),
        token: this.$('input[name=token]').val()
      };
    };

    return DeviceFindOrCreateView;

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
      this.findOrCreate = __bind(this.findOrCreate, this);
      return DevicesRouter.__super__.constructor.apply(this, arguments);
    }

    DevicesRouter.prototype.routes = {
      '': 'findOrCreate',
      ':uuid/:token': 'edit'
    };

    DevicesRouter.prototype.findOrCreate = function() {
      var device, view;
      device = new App.DeviceFindOrCreate;
      view = new App.DeviceFindOrCreateView({
        model: device
      });
      return $('#main').html(view.render());
    };

    DevicesRouter.prototype.edit = function(uuid, token) {
      var device, view;
      console.log('edit', uuid, token);
      device = new App.DeviceFindOrCreate({
        uuid: uuid,
        token: token
      });
      device.find();
      view = new App.DeviceFindOrCreateView({
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
      pushState: false
    });
  });

}).call(this);
