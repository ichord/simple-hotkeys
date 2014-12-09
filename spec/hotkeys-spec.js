(function() {
  describe('Simple hotkeys', function() {
    var hotkeys;
    hotkeys = null;
    $('<div class="editor"></div>').appendTo('body');
    beforeEach(function() {
      return hotkeys = simple.hotkeys({
        el: '.editor'
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
      $(hotkeys.opts.el).trigger(keydownEvent = $.Event('keydown', {
        which: 66,
        ctrlKey: true
      }));
      return expect(handler).toHaveBeenCalledWith(keydownEvent);
    });
    it("remove an hotkey", function() {
      var handler, keydownEvent;
      hotkeys.add("ctrl + b", handler = jasmine.createSpy('handler')).remove("ctrl + b");
      $(hotkeys.opts.el).trigger(keydownEvent = $.Event('keydown', {
        which: 66,
        ctrlKey: true
      }));
      return expect(handler).not.toHaveBeenCalledWith(keydownEvent);
    });
    describe("complex combination", function() {
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
        $(hotkeys.opts.el).trigger(keydownEvent = $.Event('keydown', {
          which: 72,
          ctrlKey: true
        }));
        $(hotkeys.opts.el).trigger(keydownEvent = $.Event('keydown', {
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
    it("add dynamic one", function() {
      var editor, handler, keydownEvent;
      hotkeys.add("ctrl+b", handler = jasmine.createSpy('handler'));
      editor = $('<div class="editor"></div>').appendTo('body');
      editor.trigger(keydownEvent = $.Event('keydown', {
        which: 66,
        ctrlKey: true
      }));
      expect(handler).toHaveBeenCalledWith(keydownEvent);
      hotkeys.add("ctrl+h", handler = jasmine.createSpy('handler'));
      editor.trigger(keydownEvent = $.Event('keydown', {
        which: 72,
        ctrlKey: true
      }));
      return expect(handler).toHaveBeenCalledWith(keydownEvent);
    });
    return describe('#responeTo', function() {
      it("#responeTo simple combo", function() {
        var ctrlB;
        hotkeys.add("ctrl + b", function() {});
        expect(hotkeys.responeTo(ctrlB = $.Event('keydown', {
          which: 66,
          ctrlKey: true
        }))).toBe(true);
        $(hotkeys.opts.el).trigger(ctrlB);
        return expect(hotkeys.responeTo(ctrlB)).toBe(true);
      });
      return it("#responeTo sequences combo", function() {
        var ctrlB, ctrlH;
        hotkeys.add(["ctrl + h", "b"], function() {});
        expect(hotkeys.responeTo(ctrlH = $.Event('keydown', {
          which: 72,
          ctrlKey: true
        }))).toBe(true);
        $(hotkeys.opts.el).trigger(ctrlH);
        $(hotkeys.opts.el).trigger($.Event('keyup', {
          which: 72,
          ctrlKey: true
        }));
        expect(hotkeys.responeTo(ctrlB = $.Event('keydown', {
          which: 66,
          ctrlKey: true
        }))).toBe(true);
        $(hotkeys.opts.el).trigger(ctrlB);
        return expect(hotkeys.responeTo(ctrlB)).toBe(true);
      });
    });
  });

}).call(this);
