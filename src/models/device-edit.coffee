class App.DeviceEdit extends Backbone.Model
  initialize: =>
    @on 'change:json', @setDevice
    @setDevice()

  save: =>
    device = new App.Device @get('device')

    device.save {}, success: =>
      device.fetch success: =>
        @set json: JSON.stringify(device.toJSON(), null, 2)
        @trigger 'sync'
    @trigger 'request'

  setDevice: =>
    object = @parseJSON()
    if object?
      @set device: object

  parseJSON: =>
    try
      object = JSON.parse @get('json')
      @set jsonIsInvalid: false
      return object
    catch
      @set jsonIsInvalid: true
      @trigger 'invalid'
      return null
