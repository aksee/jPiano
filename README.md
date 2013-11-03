jPiano
======

Keyboard Piano jQuery Plugin


## requirement
`Sound Manager 2` http://www.schillmania.com/projects/soundmanager2/

## How to use

```javascript
$("#piano").jPiano({
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



## License

(The MIT License)

Copyright (c) 2013 Ali Sait TEKE &lt;alisaitt@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.