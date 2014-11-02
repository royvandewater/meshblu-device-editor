class App.DeviceEditView extends Backbone.View
  template: JST['device-edit']

  initialize: =>
    @listenTo @model, 'change:jsonIsInvalid', @setValidationError

  events:
    'submit form': 'submit'
    'keyup textarea[name=json]': 'validateJSON'

  render: =>
    @$el.html @template validationError: @model.validationError
    @setValues()
    @setValidationError()
    @$el

  setValues: =>
    {json} = @model.toJSON()
    @$('textarea[name=json]').val json

  setValidationError: =>
    {jsonIsInvalid} = @model.toJSON()
    @$('.text-invalid-json').toggle jsonIsInvalid
    @$('.btn-save').prop 'disabled', jsonIsInvalid

  submit: ($event) =>
    $event.preventDefault()
    $event.stopPropagation()
    {json} = @values()
    @model.saveJSON json

  values: =>
    json: @$('textarea[name=json]').val()

  validateJSON: =>
    {json} = @values()
    @model.set 'json', json, validate: true
