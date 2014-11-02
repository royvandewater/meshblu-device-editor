class DevicesRouter extends Backbone.Router
  routes:
    '': 'edit'

  edit: =>
    device = new App.Device
    view   = new App.DeviceEditView model: device
    $('#main').html view.render()

new DevicesRouter
