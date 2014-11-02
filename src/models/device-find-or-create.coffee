class App.DeviceFindOrCreate extends Backbone.Model
  idAttribute: 'uuid'
  urlRoot: 'https://meshblu.octoblu.com/devices/'

  initialize: =>
    @on 'change:uuid change:token', @setCanCreate
    @on 'change:uuid change:token', @setCanGet
    @setCanCreate()
    @setCanGet()

  create: =>
    @save({})

  find: =>
    {uuid, token} = @toJSON()

    @fetch
      headers:
        skynet_auth_uuid:  uuid
        skynet_auth_token: token

  parse: (results) =>
    data = results
    data = _.first data.devices if _.isArray data.devices
    {
      uuid: data.uuid
      token: data.token
      device: data
    }

  setCanCreate: =>
    uuid  = @get 'uuid'
    token = @get 'token'
    @set canCreate: !(uuid || token)

  setCanGet: =>
    uuid  = @get 'uuid'
    token = @get 'token'
    @set canGet: !!(uuid && token)

    {uuid, token} = @toJSON()
