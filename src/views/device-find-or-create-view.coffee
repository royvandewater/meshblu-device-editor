class App.DeviceFindOrCreateView extends Backbone.View
  template: JST['device-find-or-create']

  events:
    'keyup input': 'setButtonStates'

  render: =>
    @$el.html @template()
    @setButtonStates()
    @$el

  setButtonStates: =>
    {uuid,token} = @values()

    disableGet    =  !(uuid && token)
    disableCreate = !!(uuid || token)

    @$('.btn-get').prop 'disabled',    disableGet
    @$('.btn-create').prop 'disabled', disableCreate

  values: =>
    uuid:  @$('input[name=uuid]').val()
    token: @$('input[name=token]').val()
