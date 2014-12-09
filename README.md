simple-hotkeys
=============

### Options

* el - jQuery selector / jQuery Object / Node;

If you want to bind hotkeys to dynamic adding element, please pass a selector as `el`.  
If the `el` is null or doesn't exist, `document` element would be used by default.

### Api

* add(shortcut, callback(e)) - add a hotkey.
* remove(shortcut) - remove a hotkey
* destroy() - off events and clean up.

The `shortcut` could be an array or a string.  
Pleas read the following `Usage` section to figure out how to use them.

### Usage

```javascript
hotkeys = simple.hotkeys();
hotkeys.add("ctrl + b", function(e){
    console.log("ctrl + b pressed");
}).add(["ctrl + h", "1"], function(e){
    console.log("Headline 1!");
}).add(["ctrl + h", "a + b + c + d + f"], function(e){
    console.log("Cool!");
});
```
