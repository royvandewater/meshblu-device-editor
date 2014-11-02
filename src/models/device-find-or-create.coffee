class App.DeviceFindOrCreate extends Backbone.Model
  initialize: =>
    @on 'change:uuid change:token', @setCanCreate
    @on 'change:uuid change:token', @setCanGet
    @setCanCreate()
    @setCanGet()

  create: =>
    console.log 'create'

  find: =>
    console.log 'find'

  setCanCreate: =>
    uuid  = @get 'uuid'
    token = @get 'token'
    @set canCreate: !(uuid || token)

  setCanGet: =>
    uuid  = @get 'uuid'
    token = @get 'token'
    @set canGet: !!(uuid && token)
