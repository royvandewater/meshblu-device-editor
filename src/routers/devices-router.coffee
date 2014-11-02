class DevicesRouter extends Backbone.Router
  routes:
    '': 'findOrCreate'
    ':uuid/:token': 'edit'

  findOrCreate: =>
    device = new App.DeviceFindOrCreate
    view   = new App.DeviceFindOrCreateView model: device
    $('#main').html view.render()

  edit: (uuid, token) =>
    console.log 'edit', uuid, token
    device = new App.DeviceFindOrCreate uuid: uuid, token: token
    device.find()
    view = new App.DeviceFindOrCreateView model: device
    $('#main').html view.render()

new DevicesRouter
