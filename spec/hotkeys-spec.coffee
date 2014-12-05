
describe 'Simple hotkeys', ->

  hotkeys = null

  beforeEach ->
    hotkeys = simple.hotkeys el: document

  afterEach ->
    hotkeys.destroy()

  it "should inherit from SimpleModule", ->
    expect(hotkeys instanceof SimpleModule).toBe(true)

  it "could be destroyed", ->
    hotkeys.destroy()
    expect hotkeys._map
      .toEqual {}
    expect hotkeys.el.data 'simpleHotkeys'
      .toBe undefined
    expect hotkeys._keystack
      .toEqual []

  it "normalize keyid", ->
    clazz = hotkeys.constructor
    expect clazz.normalize "SHIFT+A"
      .toBe "shift_a"
    expect clazz.normalize "ctrl  + alt+ left"
      .toBe "alt_ctrl_left"
    expect clazz.normalize "ctrl  + alt+ escape"
      .toBe "alt_ctrl_esc"
    expect clazz.normalize "Cmd+ shift+a"
      .toBe "meta_shift_a"
    expect clazz.normalize "Windows + alt+ a"
      .toBe "alt_meta_a"

  it "add an hotkey", ->
    hotkeys.add "ctrl + b", handler = jasmine.createSpy 'handler'
    hotkeys.el.trigger keydownEvent = $.Event 'keydown', which: 66, ctrlKey: true
    expect handler
      .toHaveBeenCalledWith keydownEvent

  it "remove an hotkey", ->
    hotkeys
      .add "ctrl + b", handler = jasmine.createSpy 'handler'
      .remove "ctrl + b"
    hotkeys.el.trigger keydownEvent = $.Event 'keydown', which: 66, ctrlKey: true
    expect handler
      .not.toHaveBeenCalledWith keydownEvent

  describe "complex combination", ->
    it "remove", ->
      handler = jasmine.createSpy 'handler'
      hotkeys
        .add ["ctrl+h", "k+2"], handler
        .add ["ctrl+h", "k+6"], handler
        .remove ["ctrl+h", "k+6"]
      expect hotkeys._map
        .toEqual "ctrl_h": {"k_2": handler}
      hotkeys.remove ["ctrl+h", "k+2"]
      expect hotkeys._map["ctrl_h"]
        .toBe undefined
    it "execute", ->
      hotkeys.add ["ctrl + h", "1"], handler = jasmine.createSpy 'handler'
      hotkeys.el.trigger keydownEvent = $.Event 'keydown', which: 72, ctrlKey: true
      hotkeys.el.trigger keydownEvent = $.Event 'keydown', which: 49, ctrlKey: true
      expect handler
        .toHaveBeenCalledWith keydownEvent 
    it "add", ->
      handler = jasmine.createSpy 'handler'
      hotkeys
        .add ["ctrl+h", "1"], handler
        .add ["ctrl+h", "2"], handler
        .add ["ctrl+h", "k+ b"], handler
      expect hotkeys._map
        .toEqual "ctrl_h": {"1": handler, "2": handler, "k_b": handler}
