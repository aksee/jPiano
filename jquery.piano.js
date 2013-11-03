/* The MIT License (MIT)

Copyright (c) 2013 Ali Sait TEKE

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    jPiano: function(options) {
      var buttonMouseDownHandle, buttonMouseUpHandle, errorsNum, fadeInSound, fadeOutSound, idPrefix, init, keyDownHandle, keyUpHandle, loadedSound, moseMoveTimerStart, moseMoveTimerStop, mouseMove, mouseMoveTimeOut, mouseOutHandle, mouseOverHandle, settings, timeOuts, totalSound;
      settings = {
        keys: new Array(),
        keySounds: new Array(),
        preferFlash: true,
        soundsDir: "/",
        debug: false,
        onready: null,
        hoverClass: "hover",
        soundManagerDebug: false,
        volume: 50,
        startvolume: 50,
        defaultPressCallback: null
      };
      settings = $.extend(settings, options);
      errorsNum = 0;
      totalSound = 0;
      loadedSound = 0;
      idPrefix = "jPiano_";
      mouseMove = false;
      mouseMoveTimeOut = null;
      timeOuts = {};
      if (options.soundsDir == null) {
        if (debug) {
          if (typeof console !== "undefined" && console !== null) {
            console.log("Sound Directory not defined!");
          }
        }
      }
      if (typeof soundManager === "undefined" || soundManager === null) {
        if (debug) {
          if (typeof console !== "undefined" && console !== null) {
            console.error("SoundManager 2 not found! Please include SoundManager.js in body tag from http://www.schillmania.com/projects/soundmanager2");
          }
        }
        errorsNum++;
        return false;
      }
      if (options.keySounds == null) {
        if (debug) {
          if (typeof console !== "undefined" && console !== null) {
            console.error("jPiano is not initialize. Help for www.alisait.com/jPiano/docs");
          }
        }
        errorsNum++;
        return false;
      }
      soundManager.setup({
        url: "swf/",
        preferFlash: settings.preferFlash,
        debugMode: settings.soundManagerDebug,
        idPrefix: idPrefix,
        onready: function() {
          var key, sound, sounds, _results;
          sounds = options.keySounds;
          for (key in sounds) {
            sound = sounds[key];
            totalSound++;
          }
          _results = [];
          for (key in sounds) {
            sound = sounds[key];
            sound = sound[0];
            _results.push(soundManager.createSound({
              id: idPrefix + key.toUpperCase(),
              url: settings.soundsDir + sound,
              autoLoad: true,
              autoPlay: false,
              multiShot: false,
              onload: function() {
                loadedSound++;
                if (totalSound === loadedSound) {
                  return init();
                }
              }
            }));
          }
          return _results;
        }
      });
      keyDownHandle = function(e) {
        var button, key, playable, s;
        key = String.fromCharCode(e.which);
        if (settings.keySounds[key.toLowerCase()] != null) {
          s = soundManager.getSoundById("jPiano_" + key);
          s.setVolume(settings.startvolume);
          playable = true;
          clearTimeout(timeOuts["jPiano_" + key]);
          if (settings.keySounds[key.toLowerCase()][1] != null) {
            button = settings.keySounds[key.toLowerCase()][1];
            if (typeof button === "string") {
              if ($(button).is("." + settings.hoverClass)) {
                playable = false;
              }
              $(button).addClass(settings.hoverClass);
            } else if (typeof button === "function") {
              button();
            }
            if ((settings.keySounds[key.toLowerCase()][2] != null) && typeof settings.keySounds[key.toLowerCase()][2] === "function") {
              settings.keySounds[key.toLowerCase()][2]();
            }
          }
          if (playable) {
            if (settings.defaultPressCallback != null) {
              settings.defaultPressCallback(key);
            }
            return s.play();
          }
        }
      };
      keyUpHandle = function(e) {
        var button, key;
        if (e) {
          e.preventDefault();
        }
        key = String.fromCharCode(e.which);
        if (settings.keySounds[key.toLowerCase()] != null) {
          fadeOutSound("jPiano_" + key, -8);
          if (settings.keySounds[key.toLowerCase()][1] != null) {
            button = settings.keySounds[key.toLowerCase()][1];
            if (typeof button === "string") {
              return $(button).removeClass(settings.hoverClass);
            }
          }
        }
      };
      buttonMouseDownHandle = function(e) {
        var button, key, s;
        if (e) {
          e.preventDefault();
        }
        mouseMove = true;
        key = $(this).attr("key_id");
        if ((settings.keySounds[key.toLowerCase()] != null) && settings.keySounds[key.toLowerCase()][1]) {
          s = soundManager.getSoundById("jPiano_" + key.toUpperCase());
          s.setVolume(settings.startvolume);
          s.play();
          if (settings.defaultPressCallback != null) {
            settings.defaultPressCallback(key);
          }
          button = settings.keySounds[key.toLowerCase()][1];
          return $(button).addClass(settings.hoverClass);
        }
      };
      buttonMouseUpHandle = function(e) {
        var button, key;
        if (e) {
          e.preventDefault();
        }
        mouseMove = false;
        key = $(this).attr("key_id");
        if (settings.keySounds[key.toLowerCase()] != null) {
          if (settings.keySounds[key.toLowerCase()][1]) {
            button = settings.keySounds[key.toLowerCase()][1];
            return $(button).removeClass(settings.hoverClass);
          }
        }
      };
      moseMoveTimerStart = function() {
        return mouseMoveTimeOut = setTimeout(function() {
          return mouseMove = false;
        }, 200);
      };
      moseMoveTimerStop = function() {
        return clearTimeout(mouseMoveTimeOut);
      };
      mouseOverHandle = function() {
        var button, key, s;
        if (mouseMove) {
          moseMoveTimerStop();
          key = $(this).attr("key_id");
          if ((settings.keySounds[key.toLowerCase()] != null) && (settings.keySounds[key.toLowerCase()][1] != null)) {
            s = soundManager.getSoundById("jPiano_" + key.toUpperCase());
            s.setVolume(settings.startvolume);
            s.play();
            settings.defaultPressCallback(key);
            button = settings.keySounds[key.toLowerCase()][1];
            return $(button).addClass(settings.hoverClass);
          }
        }
      };
      mouseOutHandle = function() {
        var button, key;
        if (mouseMove) {
          moseMoveTimerStart();
          key = $(this).attr("key_id");
          if ((settings.keySounds[key.toLowerCase()] != null) && (settings.keySounds[key.toLowerCase()][1] != null)) {
            button = settings.keySounds[key.toLowerCase()][1];
            return $(button).removeClass(settings.hoverClass);
          }
        }
      };
      fadeOutSound = function(soundID, amount) {
        var s, vol;
        s = soundManager.getSoundById(soundID);
        vol = s.volume;
        if (vol === 0) {
          return false;
        }
        s.setVolume(Math.max(0, vol + amount));
        return timeOuts[soundID] = setTimeout(function() {
          return fadeOutSound(soundID, amount);
        }, 50);
      };
      fadeInSound = function(soundID, amount) {
        var s, vol;
        s = soundManager.getSoundById(soundID);
        vol = s.volume;
        if (vol >= settings.volume) {
          return false;
        }
        s.setVolume(Math.max(0, vol + amount));
        return timeOuts[soundID] = setTimeout(function() {
          return fadeInSound(soundID, amount);
        }, 50);
      };
      init = function() {
        var button, key, sound, sounds;
        $(this).removeClass("loading");
        $(this).addClass("loaded");
        $(document).bind("keydown", keyDownHandle);
        $(document).bind("keyup", keyUpHandle);
        sounds = options.keySounds;
        for (key in sounds) {
          sound = sounds[key];
          button = sound[1];
          if (typeof button === "string") {
            $(button).bind("mousedown", buttonMouseDownHandle);
            $(button).bind("mouseup", buttonMouseUpHandle);
            $(button).bind("mouseover", mouseOverHandle);
            $(button).bind("mouseout", mouseOutHandle);
            $(button).attr("key_id", key);
            $(button).removeClass(settings.hoverClass);
          }
        }
        if (settings.onready != null) {
          return settings.onready();
        }
      };
      return this.each(function() {
        return $(this).addClass("jPiano loading");
      });
    }
  });

}).call(this);
