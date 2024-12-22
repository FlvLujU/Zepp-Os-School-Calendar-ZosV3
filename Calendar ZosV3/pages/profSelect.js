
import { createWidget, widget, prop, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { getProfile } from '@zos/user'
import { onGesture, offGesture, GESTURE_RIGHT} from '@zos/interaction'
import { exit } from '@zos/router'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    setStatusBarVisible(false)
    const themes = [
      "rw", "ob", "by", "bb", "yg", "pc"
    ]
    const j = 8
    var conf = readFile("conf_keySch")

console.log("HH " +JSON.stringify(conf))

    var Config = conf
    var themeBG = Config.theme.bg
    var themeUI = Config.theme.UI
    var themePrim = Config.theme.primText
    var themeSec = Config.theme.secText
    var themeSlot = Config.theme.slot
    var autoBright;
    autoBright = Config.autoBright
    var autoDark;
    autoDark = Config.autoDark
    var lang;
    lang = Config.languaje
    var remindMe = []
    for (let i = 0; i < Config.remindMe.length - 1; i++) {
      remindMe.push(Config.remindMe[i])
    }
    var dailyAppRemindMe;
    dailyAppRemindMe = Config.dailyAppRemindMe
    var profile;
    profile = Config.profile
    var LUN = Config.Schedule.Lun
    var MAR = Config.Schedule.Mar
    var MIE = Config.Schedule.Mie
    var JUE = Config.Schedule.Jue
    var VIE = Config.Schedule.Vie
    var subjectsUser;
    subjectsUser = Config.addedSubjects
    var customColors;
    customColors = Config.colors
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG,
      radius: 12
    })
    createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 20,
      w: 255,
      h: 70,
      text: "Profile:",
      text_size: 40,
      color: themePrim
    })
    const v = 110
    const p = 7
    const { nickName } = getProfile()
    const isAdmin = nickName
    var b1 = createWidget(widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 0 - p + v,
      w: 57,
      h: 57,
      src: "select.png"
    })
    var b2 = createWidget(widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 57 + 40 - p + v,
      w: 57,
      h: 57,
      src: "unselect.png"
    })
    if (isAdmin == "flvluju") {
      var b3 = createWidget(widget.IMG, {
        x: (390 / 2 - 300 / 2) - j,
        y: 57 + 40 + 57 + 40 - p + v,
        w: 57,
        h: 57,
        src: "unselect.png"
      })
    }
    var selected = 1
    b1.addEventListener(event.CLICK_DOWN, (info) => {
      b1.setProperty(prop.MORE, {
        src: "select.png"
      })
      b2.setProperty(prop.MORE, {
        src: "unselect.png"
      })
      selected = 1
      b3.setProperty(prop.MORE, {
        src: "unselect.png"
      })
    })
    b2.addEventListener(event.CLICK_DOWN, (info) => {
      b1.setProperty(prop.MORE, {
        src: "unselect.png"
      })
      b2.setProperty(prop.MORE, {
        src: "select.png"
      })
      selected = 2
      b3.setProperty(prop.MORE, {
        src: "unselect.png"
      })
    })
    if (isAdmin == "flvluju") {
      b3.addEventListener(event.CLICK_DOWN, (info) => {
        b1.setProperty(prop.MORE, {
          src: "unselect.png"
        })
        b2.setProperty(prop.MORE, {
          src: "unselect.png"
        })
        selected = 3
        b3.setProperty(prop.MORE, {
          src: "select.png"
        })
      })
    }
    var yR = 110
    const b = 10
    createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - b + 75,
      y: yR,
      w: 222,
      h: 70,
      text: "School",
      text_size: 30,
      color: themePrim
    })
    createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - b + 75,
      y: 57 + 40 + yR,
      w: 222,
      h: 70,
      text: "University",
      text_size: 30,
      color: themePrim
    })
    if (isAdmin == "flvluju") {
      createWidget(widget.TEXT, {
        x: (390 / 2 - 300 / 2) - b + 75,
        y: 57 + 40 + 57 + 40 + yR,
        w: 160,
        h: 70,
        text: "Trabajando",
        text_size: 30,
        color: themePrim
      })
    }
    onGesture(function (event) {
      if (event == GESTURE_RIGHT) {
       offGesture()
        exit()
      }
    });
    createWidget(widget.BUTTON, {
      x: 0,
      y: 400,
      w: 390,
      h: 50,
      radius: 7,
      normal_color: themeUI,
      press_color: themeUI,
      color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
      text: 'Next',
      click_func: () => {
        if (selected == 2) {
          Config.profile = 1
          Config.modify = "isModify"
          writeFile("conf_keySch", Config)
          push({ url: 'pages/setUp', param: '...' })
        } else if (selected == 1) {
          Config.profile = 2
          Config.modify = "isModify"
          writeFile("conf_keySch", Config)
          push({ url: 'pages/setUpV2', param: '...' })
        } else if (selected == 3) {
          Config.profile = 3
          Config.modify = "isModify"
          writeFile("conf_keySch", Config)
          push({ url: 'pages/setUpV3', param: '...' })
        }
      }
    })
    function readFile(filename) {
      console.log("R: " + localStorage.getItem(filename))
      return localStorage.getItem(filename);
    }
    
    
    function decodeUint8Array(uint8array) {
      let decodedString = "";


      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    function writeFile(filename, data) {
localStorage.setItem(filename, data);
    }
    function jsonToArrayBuffer(json) {
      const jsonString = JSON.stringify(json);
      const buffer = new ArrayBuffer(jsonString.length);
      const uint8Array = new Uint8Array(buffer);
      for (let i = 0; i < jsonString.length; i++) {
        uint8Array[i] = jsonString.charCodeAt(i);
      }
      return buffer;
    }
  },
  onDestroy() {
   offGesture()
  },
});