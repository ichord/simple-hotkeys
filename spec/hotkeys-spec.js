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
    it("could be destroyed", function() {
      hotkeys.destroy();
      expect(hotkeys._map).toEqual({});
      expect(hotkeys.el.data('simpleHotkeys')).toBe(void 0);
      return expect(hotkeys._keystack).toEqual([]);
    });
    it("normalize keyid", function() {
      var clazz;
      clazz = hotkeys.constructor;
      expect(clazz.normalize("SHIFT+A")).toBe("shift_a");
      expect(clazz.normalize("ctrl  + alt+ left")).toBe("alt_control_left");
      expect(clazz.normalize("ctrl  + alt+ escape")).toBe("alt_control_esc");
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
    it("remove an hotkey", function() {
      var handler, keydownEvent;
      hotkeys.add("ctrl + b", handler = jasmine.createSpy('handler')).remove("ctrl + b");
      hotkeys.el.trigger(keydownEvent = $.Event('keydown', {
        which: 66,
        ctrlKey: true
      }));
      return expect(handler).not.toHaveBeenCalledWith(keydownEvent);
    });
    return describe("complex combination", function() {
      it("remove", function() {
        var handler;
        handler = jasmine.createSpy('handler');
        hotkeys.add(["ctrl+h", "k+2"], handler).add(["ctrl+h", "k+6"], handler).remove(["ctrl+h", "k+6"]);
        expect(hotkeys._map).toEqual({
          "control_h": {
            "k_2": handler
          }
        });
        hotkeys.remove(["ctrl+h", "k+2"]);
        return expect(hotkeys._map["control_h"]).toBe(void 0);
      });
      it("execute", function() {
        var handler, keydownEvent;
        hotkeys.add(["ctrl + h", "1"], handler = jasmine.createSpy('handler'));
        hotkeys.el.trigger(keydownEvent = $.Event('keydown', {
          which: 72,
          ctrlKey: true
        }));
        hotkeys.el.trigger(keydownEvent = $.Event('keydown', {
          which: 49,
          ctrlKey: true
        }));
        return expect(handler).toHaveBeenCalledWith(keydownEvent);
      });
      return it("add", function() {
        var handler;
        handler = jasmine.createSpy('handler');
        hotkeys.add(["ctrl+h", "1"], handler).add(["ctrl+h", "2"], handler).add(["ctrl+h", "k+ b"], handler);
        return expect(hotkeys._map).toEqual({
          "control_h": {
            "1": handler,
            "2": handler,
            "k_b": handler
          }
        });
      });
    });
  });

}).call(this);
