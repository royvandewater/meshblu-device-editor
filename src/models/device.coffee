class App.Device extends Backbone.Model
  idAttribute: 'uuid'
  urlRoot: 'https://meshblu.octoblu.com/devices/'

  initialize: =>
    @on 'change:_id', @unset_id
    @unset_id()

  unset_id: =>
    @unset '_id'

  ajaxOptions: =>
    {uuid, token} = @toJSON()
    headers:
      skynet_auth_uuid:  uuid
      skynet_auth_token: token

  fetch: (options) =>
    options = _.defaults {}, options, @ajaxOptions()
    super options

  parse: (data) =>
    return _.first data.devices if _.isArray data.devices
    data

  save: (attributes, options) =>
    options = _.defaults {}, options, @ajaxOptions()
    super attributes, options

