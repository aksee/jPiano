$ = jQuery
$.fn.extend
  jPiano: (options) ->
    settings =
      keys: new Array()
      keySounds: new Array()
      preferFlash: true
      soundsDir: "/"
      debug: false
      onready: null
      hoverClass: "hover"
      soundManagerDebug: false
      volume: 50
      startvolume: 50
      defaultPressCallback: null
    settings = $.extend settings, options
    errorsNum = 0
    totalSound = 0
    loadedSound = 0
    idPrefix = "jPiano_"
    mouseMove = false
    mouseMoveTimeOut = null
    timeOuts = {}

    # Sound Directory Check
    if !options.soundsDir?
      console?.log "Sound Directory not defined!" if debug

    #Sound Manager 2 Check
    if !soundManager?
      console?.error "SoundManager 2 not found! Please include SoundManager.js in body tag from http://www.schillmania.com/projects/soundmanager2" if debug
      errorsNum++
      return false

    # Key Sounds Check
    if !options.keySounds?
      console?.error "jPiano is not initialize. Help for www.alisait.com/jPiano/docs" if debug
      errorsNum++
      return false

    # Sound Manager 2 Setup
    soundManager.setup
      url: "swf/"
      preferFlash:settings.preferFlash
      debugMode: settings.soundManagerDebug
      idPrefix: idPrefix
      onready: ()->
        sounds = options.keySounds
        for key, sound of sounds
          totalSound++
        for key, sound of sounds
          sound = sound[0]
          soundManager.createSound
            id: idPrefix+key.toUpperCase()
            url: settings.soundsDir+sound
            autoLoad: true
            autoPlay: false
            multiShot: false
            onload: ()->
              loadedSound++
              if totalSound==loadedSound
                init()
    keyDownHandle = (e)->
      key = String.fromCharCode e.which
      if settings.keySounds[key.toLowerCase()]?
        s = soundManager.getSoundById "jPiano_"+key
        s.setVolume settings.startvolume
        playable = true
        clearTimeout timeOuts["jPiano_"+key]
        if settings.keySounds[key.toLowerCase()][1]?
          button = settings.keySounds[key.toLowerCase()][1]
          if typeof button == "string"
            if ($(button).is "."+settings.hoverClass)
              playable = false
            $(button).addClass settings.hoverClass

          else if typeof button == "function"
            button()
          if settings.keySounds[key.toLowerCase()][2]? && typeof settings.keySounds[key.toLowerCase()][2] == "function"
            settings.keySounds[key.toLowerCase()][2]()
        if playable
          if settings.defaultPressCallback?
            settings.defaultPressCallback(key)
          s.play()

    keyUpHandle = (e)->
      e.preventDefault() if e
      key = String.fromCharCode e.which
      if settings.keySounds[key.toLowerCase()]?
        fadeOutSound "jPiano_"+key, -8
        if settings.keySounds[key.toLowerCase()][1]?
          button = settings.keySounds[key.toLowerCase()][1]
          if typeof button == "string"
            $(button).removeClass settings.hoverClass

    buttonMouseDownHandle = (e)->
      e.preventDefault() if e
      mouseMove = true
      key = $(this).attr "key_id"
      if settings.keySounds[key.toLowerCase()]? && settings.keySounds[key.toLowerCase()][1]
        s = soundManager.getSoundById "jPiano_"+key.toUpperCase()
        s.setVolume settings.startvolume
        s.play()
        settings.defaultPressCallback(key) if settings.defaultPressCallback?
        button = settings.keySounds[key.toLowerCase()][1]
        $(button).addClass settings.hoverClass

    buttonMouseUpHandle = (e)->
      e.preventDefault() if e
      mouseMove = false
      key = $(this).attr "key_id"
      if settings.keySounds[key.toLowerCase()]?
        #fadeOutSound "jPiano_"+key.toLowerCase(), -25
        if settings.keySounds[key.toLowerCase()][1]
          button = settings.keySounds[key.toLowerCase()][1]
          $(button).removeClass settings.hoverClass

    moseMoveTimerStart = ()->
      mouseMoveTimeOut = setTimeout ()->
        mouseMove = false
      ,200
    moseMoveTimerStop = ()->
      clearTimeout mouseMoveTimeOut

    mouseOverHandle = ()->
      if mouseMove
        moseMoveTimerStop()
        key = $(this).attr "key_id"
        if settings.keySounds[key.toLowerCase()]? && settings.keySounds[key.toLowerCase()][1]?
          s = soundManager.getSoundById "jPiano_"+key.toUpperCase()
          s.setVolume settings.startvolume
          s.play()
          settings.defaultPressCallback(key)
          button = settings.keySounds[key.toLowerCase()][1]
          $(button).addClass settings.hoverClass
    mouseOutHandle = ()->
      if mouseMove
        moseMoveTimerStart()
        key = $(this).attr "key_id"
        if settings.keySounds[key.toLowerCase()]? && settings.keySounds[key.toLowerCase()][1]?
          button = settings.keySounds[key.toLowerCase()][1]
          $(button).removeClass settings.hoverClass


    fadeOutSound = (soundID,amount)->
      s = soundManager.getSoundById(soundID);
      vol = s.volume;
      return false if vol == 0
      s.setVolume(Math.max(0,vol+amount));
      timeOuts[soundID] = setTimeout ()->
        fadeOutSound soundID,amount
      ,50
    fadeInSound = (soundID,amount)->
      s = soundManager.getSoundById(soundID);
      vol = s.volume;
      return false if vol >= settings.volume
      s.setVolume(Math.max(0,vol+amount));
      timeOuts[soundID] = setTimeout ()->
        fadeInSound soundID,amount
      ,50
    init = ()->
      $(this).removeClass "loading"
      $(this).addClass "loaded"
      $(document).bind "keydown", keyDownHandle
      $(document).bind "keyup", keyUpHandle

      sounds = options.keySounds

      for key, sound of sounds
        button = sound[1]
        if typeof button == "string"
          $(button).bind "mousedown", buttonMouseDownHandle
          $(button).bind "mouseup", buttonMouseUpHandle
          $(button).bind "mouseover", mouseOverHandle
          $(button).bind "mouseout", mouseOutHandle
          $(button).attr "key_id", key
          $(button).removeClass settings.hoverClass

      settings.onready() if settings.onready?
    return @each ()->
      $(this).addClass "jPiano loading"