class App.DeviceFindOrCreateView extends Backbone.View
  template: JST['device-find-or-create']
  className: 'device-find-or-create'

  initialize: =>
    @listenTo @model, 'change', @setValues
    @listenTo @model, 'sync',   @render
    @listenTo @model, 'sync',   @navigate

  events:
    'keyup input':       'updateModel'
    'click .btn-create': 'clickCreate'
    'submit form':       'submitForm'

  render: =>
    @$el.html @template()
    @setValues()
    if @model.deviceEdit
      view = new App.DeviceEditView model: @model.deviceEdit
      @$el.append view.render()
    @$el

  navigate: =>
    {uuid, token} = @model.toJSON()
    Backbone.history.navigate "/#{uuid}/#{token}"

  setValues: =>
    values = @model.toJSON()

    @$('input[name=uuid]').val  values.uuid
    @$('input[name=token]').val values.token

    @$('.btn-create').prop 'disabled', !values.canCreate
    @$('.btn-get').prop 'disabled',    !values.canGet

  clickCreate: ($event) =>
    $event.preventDefault()
    $event.stopPropagation()

    @model.create()

  submitForm: ($event) =>
    $event.preventDefault()
    $event.stopPropagation()

    @model.find()

  updateModel: =>
    @model.set @values()

  values: =>
    uuid:  @$('input[name=uuid]').val()
    token: @$('input[name=token]').val()
