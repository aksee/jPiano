jPiano
======

Keyboard Piano jQuery Plugin


Simple Use

```
$("body").jPiano({
    preferFlash: false,
    soundsDir: "sounds/",
    debug: true,
    defaultPressCallback: test,
    keySounds: {
      "a": ["C.wav", "#key_01"],
      "w": ["CS.wav", "#key_02"],
      "s": ["D.wav", "#key_03"],
      "e": ["DS.wav", "#key_04"],
      "d": ["E.wav", "#key_05"],
      "f": ["F.wav", "#key_06"],
      "t": ["FS.wav", "#key_07"],
      "g": ["G.wav", "#key_08"],
      "y": ["GS.wav", "#key_09"],
      "h": ["A.wav", "#key_10"],
      "u": ["AS.wav", "#key_11"],
      "j": ["B.wav", "#key_12"],
      "k": ["2C.wav", "#key_13"],
      "o": ["2CS.wav", "#key_14"],
      "l": ["2D.wav", "#key_15"]
    }
});
```