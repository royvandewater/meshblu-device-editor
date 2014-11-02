class DevicesRouter extends Backbone.Router
  routes:
    '': 'findOrCreate'
    'edit/:uuid/:token': 'edit'

  findOrCreate: =>
    device = new App.Device
    view   = new App.DeviceFindOrCreateView model: device
    $('#main').html view.render()

  edit: (uuid, token) =>
    device = new App.Device uuid: uuid, token: token
    view = new App.DeviceEditView model: device
    $('#main').html view.render()
    device.fetch()

new DevicesRouter
