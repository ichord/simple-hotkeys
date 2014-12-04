(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-hotkeys', ["jquery",
      "simple-module"], function ($, SimpleModule) {
      return (root.returnExportsGlobal = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['hotkeys'] = factory(jQuery,
      SimpleModule);
  }
}(this, function ($, SimpleModule) {

var Hotkeys, hotkeys,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Hotkeys = (function(_super) {
  __extends(Hotkeys, _super);

  function Hotkeys() {
    return Hotkeys.__super__.constructor.apply(this, arguments);
  }

  Hotkeys.keyNameMap = {
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Esc",
    32: "Spacebar",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    45: "Insert",
    46: "Del",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "Multiply",
    107: "Add",
    109: "Subtract",
    110: "Decimal",
    111: "Divide",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    124: "F13",
    125: "F14",
    126: "F15",
    127: "F16",
    128: "F17",
    129: "F18",
    130: "F19",
    131: "F20",
    132: "F21",
    133: "F22",
    134: "F23",
    135: "F24",
    59: ";",
    61: "=",
    186: ";",
    187: "=",
    188: ",",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
  };

  Hotkeys.aliases = {
    "escape": "esc",
    "delete": "del",
    "return": "enter",
    "ctrl": "control",
    "space": "spacebar",
    "ins": "insert"
  };

  Hotkeys.metaKeyAliases = ["cmd", "command", "wins", "windows"];

  Hotkeys.normalize = function(keyid) {
    var alias, keyname, keys, _i, _len, _ref;
    keys = keyid.toLowerCase().replace(/\s+/gi, "").split("+");
    keyname = keys.pop();
    _ref = this.metaKeyAliases;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      alias = _ref[_i];
      keys[keys.indexOf(alias)] = "meta";
    }
    keys.sort().push(this.aliases[keyname] || keyname);
    return keys.join("_");
  };

  Hotkeys.prototype.opts = {
    el: null
  };

  Hotkeys.prototype.handlers = {};

  Hotkeys.prototype._init = function() {
    this.el = $(this.opts.el);
    if (this.el.length < 1) {
      throw Error('simple hotkeys: el option is required');
    }
    return this.el.on("keydown.simple-hotkeys", (function(_this) {
      return function(e) {
        var keyid, keyname, modifiers, _ref;
        if (!(keyname = _this.constructor.keyNameMap[e.which])) {
          return;
        }
        modifiers = "";
        if (e.altKey) {
          modifiers += "alt_";
        }
        if (e.ctrlKey) {
          modifiers += "ctrl_";
        }
        if (e.metaKey) {
          modifiers += "meta_";
        }
        if (e.shiftKey) {
          modifiers += "shift_";
        }
        keyid = modifiers + keyname.toLowerCase();
        return (_ref = _this.handlers[keyid]) != null ? _ref.call(_this, e) : void 0;
      };
    })(this)).data("simpleHotkeys", this);
  };

  Hotkeys.prototype.add = function(keyid, handler) {
    this.handlers[this.constructor.normalize(keyid)] = handler;
    return this;
  };

  Hotkeys.prototype.remove = function(keyid) {
    delete this.handlers[this.constructor.normalize(keyid)];
    return this;
  };

  Hotkeys.prototype.destroy = function() {
    return this.el.off('.simple-hotkeys').removeData('simpleHotkeys');
  };

  return Hotkeys;

})(SimpleModule);

hotkeys = function(opts) {
  return new Hotkeys(opts);
};


return hotkeys;


}));

