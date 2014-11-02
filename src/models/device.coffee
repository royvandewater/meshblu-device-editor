class App.Device extends Backbone.Model
  idAttribute: 'uuid'
  urlRoot: 'https://meshblu.octoblu.com/devices/'

  save: (attributes, options) =>
    {uuid, token} = @toJSON()

    ajaxOptions =
      headers:
        skynet_auth_uuid:  uuid
        skynet_auth_token: token

    options = _.defaults {}, options, ajaxOptions
    super attributes, options

