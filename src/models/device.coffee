class App.Device extends Backbone.Model
  saveJSON: (json) =>
    jqueryOptions = {
      headers:
        skynet_auth_uuid:  @get('uuid')
        skynet_auth_token: @get('token')
    }

    try
      @model.save JSON.parse(json), jqueryOptions
    catch
      @invalidJson = {json: 'invalid json'}
      @trigger 'invalid'

