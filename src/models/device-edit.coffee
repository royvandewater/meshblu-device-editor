class App.DeviceEdit extends Backbone.Model
  initialize: =>
    @on 'change:json', @setDevice
    @setDevice()

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
