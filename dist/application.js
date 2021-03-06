(function() {
  window.App = {};

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.DeviceEdit = (function(_super) {
    __extends(DeviceEdit, _super);

    function DeviceEdit() {
      this.parseJSON = __bind(this.parseJSON, this);
      this.setDevice = __bind(this.setDevice, this);
      this.save = __bind(this.save, this);
      this.initialize = __bind(this.initialize, this);
      return DeviceEdit.__super__.constructor.apply(this, arguments);
    }

    DeviceEdit.prototype.initialize = function() {
      this.on('change:json', this.setDevice);
      return this.setDevice();
    };

    DeviceEdit.prototype.save = function() {
      var device;
      device = new App.Device(this.get('device'));
      device.save({}, {
        success: (function(_this) {
          return function() {
            return device.fetch({
              success: function() {
                _this.set({
                  json: JSON.stringify(device.toJSON(), null, 2)
                });
                return _this.trigger('sync');
              }
            });
          };
        })(this)
      });
      return this.trigger('request');
    };

    DeviceEdit.prototype.setDevice = function() {
      var object;
      object = this.parseJSON();
      if (object != null) {
        return this.set({
          device: object
        });
      }
    };

    DeviceEdit.prototype.parseJSON = function() {
      var object;
      try {
        object = JSON.parse(this.get('json'));
        this.set({
          jsonIsInvalid: false
        });
        return object;
      } catch (_error) {
        this.set({
          jsonIsInvalid: true
        });
        this.trigger('invalid');
        return null;
      }
    };

    return DeviceEdit;

  })(Backbone.Model);

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
      this.parseDevice = __bind(this.parseDevice, this);
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
      this.on('sync', this.parseDevice);
      this.setCanCreate();
      this.setCanGet();
      return this.parseDevice();
    };

    DeviceFindOrCreate.prototype.create = function() {
      var device;
      device = new App.Device;
      this.listenToOnce(device, 'sync', (function(_this) {
        return function() {
          var deviceJSON, token, uuid;
          deviceJSON = device.toJSON();
          uuid = deviceJSON.uuid, token = deviceJSON.token;
          _this.set({
            uuid: uuid,
            token: token,
            device: deviceJSON
          });
          return _this.trigger('sync');
        };
      })(this));
      return device.save();
    };

    DeviceFindOrCreate.prototype.find = function() {
      var device, token, uuid, _ref;
      _ref = this.toJSON(), uuid = _ref.uuid, token = _ref.token;
      device = new App.Device({
        uuid: uuid,
        token: token
      });
      this.listenToOnce(device, 'sync', (function(_this) {
        return function() {
          var deviceJSON;
          deviceJSON = device.toJSON();
          uuid = deviceJSON.uuid, token = deviceJSON.token;
          _this.set({
            uuid: uuid,
            token: token,
            device: deviceJSON
          });
          return _this.trigger('sync');
        };
      })(this));
      return device.fetch();
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

    DeviceFindOrCreate.prototype.parseDevice = function() {
      var deviceJSON, json;
      if (!this.has('device')) {
        return;
      }
      deviceJSON = _.omit(this.get('device'), '_id');
      json = JSON.stringify(deviceJSON, null, 2);
      return this.deviceEdit = new App.DeviceEdit({
        json: json
      });
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
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Device = (function(_super) {
    __extends(Device, _super);

    function Device() {
      this.save = __bind(this.save, this);
      this.parse = __bind(this.parse, this);
      this.fetch = __bind(this.fetch, this);
      this.ajaxOptions = __bind(this.ajaxOptions, this);
      this.unset_id = __bind(this.unset_id, this);
      this.initialize = __bind(this.initialize, this);
      return Device.__super__.constructor.apply(this, arguments);
    }

    Device.prototype.idAttribute = 'uuid';

    Device.prototype.urlRoot = 'https://meshblu.octoblu.com/devices/';

    Device.prototype.initialize = function() {
      this.on('change:_id', this.unset_id);
      return this.unset_id();
    };

    Device.prototype.unset_id = function() {
      return this.unset('_id');
    };

    Device.prototype.ajaxOptions = function() {
      var token, uuid, _ref;
      _ref = this.toJSON(), uuid = _ref.uuid, token = _ref.token;
      return {
        headers: {
          skynet_auth_uuid: uuid,
          skynet_auth_token: token
        }
      };
    };

    Device.prototype.fetch = function(options) {
      options = _.defaults({}, options, this.ajaxOptions());
      return Device.__super__.fetch.call(this, options);
    };

    Device.prototype.parse = function(data) {
      if (_.isArray(data.devices)) {
        return _.first(data.devices);
      }
      return data;
    };

    Device.prototype.save = function(attributes, options) {
      options = _.defaults({}, options, this.ajaxOptions());
      return Device.__super__.save.call(this, attributes, options);
    };

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
      this.validateJSON = __bind(this.validateJSON, this);
      this.values = __bind(this.values, this);
      this.submit = __bind(this.submit, this);
      this.hideLoading = __bind(this.hideLoading, this);
      this.showLoading = __bind(this.showLoading, this);
      this.setValidationError = __bind(this.setValidationError, this);
      this.setValues = __bind(this.setValues, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      return DeviceEditView.__super__.constructor.apply(this, arguments);
    }

    DeviceEditView.prototype.template = JST['device-edit'];

    DeviceEditView.prototype.initialize = function() {
      this.listenTo(this.model, 'change:jsonIsInvalid', this.setValidationError);
      this.listenTo(this.model, 'change:json', this.setValues);
      this.listenTo(this.model, 'request', this.showLoading);
      return this.listenTo(this.model, 'sync', this.hideLoading);
    };

    DeviceEditView.prototype.events = {
      'submit form': 'submit',
      'keyup textarea[name=json]': 'validateJSON'
    };

    DeviceEditView.prototype.render = function() {
      this.$el.html(this.template({
        validationError: this.model.validationError
      }));
      this.setValues();
      this.setValidationError();
      this.hideLoading();
      return this.$el;
    };

    DeviceEditView.prototype.setValues = function() {
      var json;
      json = this.model.toJSON().json;
      return this.$('textarea[name=json]').val(json);
    };

    DeviceEditView.prototype.setValidationError = function() {
      var jsonIsInvalid;
      jsonIsInvalid = this.model.toJSON().jsonIsInvalid;
      this.$('.text-invalid-json').toggle(jsonIsInvalid);
      return this.$('.btn-save').prop('disabled', jsonIsInvalid);
    };

    DeviceEditView.prototype.showLoading = function() {
      return this.$('.loading-spinner').show();
    };

    DeviceEditView.prototype.hideLoading = function() {
      return this.$('.loading-spinner').hide();
    };

    DeviceEditView.prototype.submit = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      return this.model.save();
    };

    DeviceEditView.prototype.values = function() {
      return {
        json: this.$('textarea[name=json]').val()
      };
    };

    DeviceEditView.prototype.validateJSON = function() {
      var json;
      json = this.values().json;
      return this.model.set('json', json, {
        validate: true
      });
    };

    return DeviceEditView;

  })(Backbone.View);

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
      this.navigate = __bind(this.navigate, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      return DeviceFindOrCreateView.__super__.constructor.apply(this, arguments);
    }

    DeviceFindOrCreateView.prototype.template = JST['device-find-or-create'];

    DeviceFindOrCreateView.prototype.className = 'device-find-or-create';

    DeviceFindOrCreateView.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.setValues);
      this.listenTo(this.model, 'sync', this.render);
      return this.listenTo(this.model, 'sync', this.navigate);
    };

    DeviceFindOrCreateView.prototype.events = {
      'keyup input': 'updateModel',
      'click .btn-create': 'clickCreate',
      'submit form': 'submitForm'
    };

    DeviceFindOrCreateView.prototype.render = function() {
      var view;
      this.$el.html(this.template());
      this.setValues();
      if (this.model.deviceEdit) {
        view = new App.DeviceEditView({
          model: this.model.deviceEdit
        });
        this.$el.append(view.render());
      }
      return this.$el;
    };

    DeviceFindOrCreateView.prototype.navigate = function() {
      var token, uuid, _ref;
      _ref = this.model.toJSON(), uuid = _ref.uuid, token = _ref.token;
      return Backbone.history.navigate("/" + uuid + "/" + token);
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
