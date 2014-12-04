(function() {
  describe('Simple hotkeys', function() {
    var hotkeys;
    hotkeys = null;
    beforeEach(function() {
      return hotkeys = simple.hotkeys({
        el: document
      });
    });
    afterEach(function() {
      return hotkeys.destroy();
    });
    it("should inherit from SimpleModule", function() {
      return expect(hotkeys instanceof SimpleModule).toBe(true);
    });
    it("normalize keyid", function() {
      var clazz;
      clazz = hotkeys.constructor;
      expect(clazz.normalize("SHIFT+A")).toBe("shift_a");
      expect(clazz.normalize("ctrl  + alt+ left")).toBe("alt_ctrl_left");
      expect(clazz.normalize("ctrl  + alt+ escape")).toBe("alt_ctrl_esc");
      expect(clazz.normalize("Cmd+ shift+a")).toBe("meta_shift_a");
      return expect(clazz.normalize("Windows + alt+ a")).toBe("alt_meta_a");
    });
    it("add an hotkey", function() {
      var handler, keydownEvent;
      hotkeys.add("ctrl + b", handler = jasmine.createSpy('handler'));
      hotkeys.el.trigger(keydownEvent = $.Event('keydown', {
        which: 66,
        ctrlKey: true
      }));
      return expect(handler).toHaveBeenCalledWith(keydownEvent);
    });
    return it("remove an hotkey", function() {
      var handler, keydownEvent;
      hotkeys.add("ctrl + b", handler = jasmine.createSpy('handler')).remove("ctrl + b");
      hotkeys.el.trigger(keydownEvent = $.Event('keydown', {
        which: 66,
        ctrlKey: true
      }));
      return expect(handler).not.toHaveBeenCalledWith(keydownEvent);
    });
  });

}).call(this);
