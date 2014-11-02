class App.DeviceFindOrCreateView extends Backbone.View
  template: JST['device-find-or-create']

  initialize: =>
    @listenTo @model, 'change', @setValues

  events:
    'keyup input':       'updateModel'
    'click .btn-create': 'clickCreate'
    'submit form':       'submitForm'

  render: =>
    @$el.html @template()
    @setValues()
    @$el

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
