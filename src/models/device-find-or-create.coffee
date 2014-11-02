class App.DeviceFindOrCreate extends Backbone.Model
  idAttribute: 'uuid'
  urlRoot: 'https://meshblu.octoblu.com/devices/'

  initialize: =>
    @on 'change:uuid change:token', @setCanCreate
    @on 'change:uuid change:token', @setCanGet
    @on 'sync', @parseDevice
    @setCanCreate()
    @setCanGet()
    @parseDevice()

  create: =>
    device = new App.Device
    @listenToOnce device, 'sync', =>
      deviceJSON = device.toJSON()
      {uuid,token} = deviceJSON
      @set uuid: uuid, token: token, device: deviceJSON
      @trigger 'sync'
    device.save()

  find: =>
    {uuid, token} = @toJSON()
    device = new App.Device uuid: uuid, token: token
    @listenToOnce device, 'sync', =>
      deviceJSON = device.toJSON()
      {uuid,token} = deviceJSON
      @set uuid: uuid, token: token, device: deviceJSON
      @trigger 'sync'
    device.fetch()

  parse: (results) =>
    data = results
    data = _.first data.devices if _.isArray data.devices
    {
      uuid: data.uuid
      token: data.token
      device: data
    }

  parseDevice: =>
    return unless @has 'device'
    deviceJSON = _.omit @get('device'), '_id'
    json = JSON.stringify deviceJSON, null, 2
    @deviceEdit = new App.DeviceEdit json: json

  setCanCreate: =>
    uuid  = @get 'uuid'
    token = @get 'token'
    @set canCreate: !(uuid || token)

  setCanGet: =>
    uuid  = @get 'uuid'
    token = @get 'token'
    @set canGet: !!(uuid && token)

    {uuid, token} = @toJSON()
