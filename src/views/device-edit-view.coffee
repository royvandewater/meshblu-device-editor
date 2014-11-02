class App.DeviceEditView extends Backbone.View
  template: JST['device-edit']

  initialize: =>
    @listenTo @model, 'invalid', @render

  events:
    'submit form': 'submit'
    'keyup textarea': 'validateJSON'

  render: =>
    @$el.html @template validationError: @model.validationError
    @setValues()
    @$el

  setValues: =>
    {device} = @model.toJSON()
    json = JSON.stringify device, null, 2
    @$('textarea[name=json]').val json

  submit: ($event) =>
    $event.preventDefault()
    $event.stopPropagation()
    {json} = @values()
    @model.saveJSON json

  values: =>
    json: @$('textarea[name=json]').val()
