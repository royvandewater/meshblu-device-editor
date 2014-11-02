class App.DeviceEdit extends Backbone.Model
  initialize: =>
    @on 'change:json', @setDevice
    @setDevice()

  parseJSON: =>
    JSON

  setDevice: =>
    @set device: JSON.parse(@get('json'))
