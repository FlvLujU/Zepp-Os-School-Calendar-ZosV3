
import { createWidget, widget, align, prop, event, getTextLayout } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push, replace } from '@zos/router'
import { offGesture } from '@zos/interaction'
import { setScrollMode, SCROLL_MODE_SWIPER } from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    setStatusBarVisible(false)
    const themes = [
      "rw", "ob", "by", "bb", "yg"
    ]
    const j = 15
    const isVertical = true
    setScrollMode({
      mode: SCROLL_MODE_SWIPER,
      options: {
        height: 450,
        count: 3,
      },
    })
    var conf = readFile("conf_keySch")



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
    var rY = 10
    let rY2 = -10
    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
    }
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450 * 4 + 100,
      color: themeBG,
      radius: 12
    })
    createWidget(widget.FILL_RECT, {
      x: (390 / 2 - 300 / 2),
      y: 20 + rY + 450 + 20,
      w: 300,
      h: 50,
      color: themeSlot,
      radius: 0
    })
    let length = 50
    createWidget(widget.STROKE_RECT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 100 - j + rY + rY2 + 450 - length,
      w: 300 + j * 2,
      h: 300 + j * 2 + length,
      radius: 25,
      line_width: j,
      color: themeSlot
    })
    createWidget(widget.TEXT, {
      x: 0,
      y: 20 + rY + 450 + 10,
      w: 390,
      h: 70,
      align_h: align.CENTER_H,
      text: "Theme:",
      text_size: 40,
      color: themePrim
    })
    var count = 0;
    count = getTheme();
    function getTheme() {

      if (String(Config.theme.bg) == "0xffffff") {
        count = 0;
      } else if (String(Config.theme.bg) == "0x333333") {
        count = 1;
      } else if (String(Config.theme.bg) == "0x6c757d") {
        count = 2;
      } else if (String(Config.theme.bg) == "0x87ceeb") {
        count = 3;
      } else if (String(Config.theme.bg) == "0xf5f5dc") {
        count = 4;
      } else if (String(Config.theme.bg) == "0xffdab9") {
        count = 5;
      }
      return count;
    }
    /*var themeV1 = createWidget(widget.FILL_RECT, {
      x: 390 / 2 - 300 / 2,
      y: 100 + rY + rY2 + 450,
      w: 300,
      h: 150,
      color: themeBG
    });
    var themeV2 = createWidget(widget.FILL_RECT, {
      x: 390 / 2 - 300 / 2,
      y: 100 + rY + rY2 + 150 + 450,
      w: 300,
      h: 150,
      color: themeUI
    });*/
    var theme = createWidget(widget.IMG, {
      x: 390 / 2 - 300 / 2,
      y: 100 + rY + rY2 + 450,
      w: 300,
      h: 300,
      src: themes[count] + ".png"
    });
    var bgColor = ["0xffffff", "0x333333", "0x6c757d", "0x87ceeb", "0xf5f5dc"]//, "0xffdab9"];
    var UIColor = ["0xee1907", "0xff4500", "0xfaf3e0", "0x4682B4", "0x556B2F"]//, "0x8A2BE2"];
    var PrimColor = ["0x000000", "0xffffff", "0x000000", "0x1C1C1C", "0x8B4513"]//, "0x5F9EA0"];
    var SecColor = ["0xffffff", "0x000000", "0x000000", "0xF8F8FF", "0xFFF8DC"]//, "0xFFD700"];
    var SlotColor = ["0xdce8da", "0x7f8a7d", "0xdce8da", "0xB0C4DE", "0xdcdcaf"]//, "0xDDA0DD"];
    var TriColor = ["0x535352", "0xffffff", "0xffffff", "0x000000", "0x000000"]//, "0x000000"]
    function readFile(filename) {
      return localStorage.getItem(filename);
    }


    function writeFile(filename, data) {
      localStorage.setItem(filename, data);
    }
    function decodeUint8Array(uint8array) {
      let decodedString = "";


      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    const { width, height } = getTextLayout("Text", {
      text_size: 50,
      text_width: 100
    });
    console.log("width: " + width)
    let h = createWidget(widget.TEXT, {
      x: 390 - 65 - width,
      y: 100 + rY + 450,
      w: 200,
      h: 100,
      text: "Text",
      text_size: 50,
      color: themePrim
    })

    let g = createWidget(widget.TEXT, {
      x: 390 / 2 - 300 / 2 + 20,
      y: 100 + rY + 210 + 450,
      w: 200,
      h: 100,
      text: "Text",
      text_size: 50,
      color: themeSec
    })
    console.log("x: " + (390 / 2 - 300 / 2 + 20))
    theme.addEventListener(event.CLICK_DOWN, (info) => {
      count++
      if (count > 4) {
        count = 0
      }
      Config.theme.bg = bgColor[count]
      Config.theme.UI = UIColor[count]
      Config.theme.primText = PrimColor[count]
      Config.theme.secText = SecColor[count]
      Config.theme.slot = SlotColor[count]
      Config.theme.triText = TriColor[count]
      Config.modify = "isModify"
      Config.numberTheme = count
      writeFile("conf_keySch", Config)
      replace({ url: 'pages/conf', param: '...' })
    })
    g.addEventListener(event.CLICK_DOWN, (info) => {
      count++
      if (count > 4) {
        count = 0
      }
      Config.theme.bg = bgColor[count]
      Config.theme.UI = UIColor[count]
      Config.theme.primText = PrimColor[count]
      Config.theme.secText = SecColor[count]
      Config.theme.slot = SlotColor[count]
      Config.theme.triText = TriColor[count]
      Config.modify = "isModify"
      Config.numberTheme = count
      writeFile("conf_keySch", Config)
      replace({ url: 'pages/conf', param: '...' })
    })
    h.addEventListener(event.CLICK_DOWN, (info) => {
      count++
      if (count > 4) {
        count = 0
      }
      Config.theme.bg = bgColor[count]
      Config.theme.UI = UIColor[count]
      Config.theme.primText = PrimColor[count]
      Config.theme.secText = SecColor[count]
      Config.theme.slot = SlotColor[count]
      Config.theme.triText = TriColor[count]
      Config.modify = "isModify"
      Config.numberTheme = count
      writeFile("conf_keySch", Config)
      replace({ url: 'pages/conf', param: '...' })
    })
    /*createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 465,
      w: 255,
      h: 70,
      text: "Auto bright:",
      text_size: 40,
      color: themePrim
    })
    const slide_switch = createWidget(widget.SLIDE_SWITCH, {
      x: (390 / 2 - 300 / 2) - j,
      y: 525,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.autoBright,
      checked_change_func: (checked) => {
        Config.autoBright = slide_switch.getProperty(prop.CHECKED)
        Config.modify = "isModify"
        writeFile("conf_keySch", Config)
      }
    })*/
    let pl = 280
    createWidget(widget.FILL_RECT, {
      x: 20,
      y: 30 + pl,
      w: 350,
      h: 110,
      radius: 10,
      color: themeSlot
    });
    createWidget(widget.TEXT, {
      x: 0,
      y: 465 - 440 + pl,
      w: 390,
      h: 70,
      text: "Auto dark:",
      align_h: align.CENTER_H,
      text_size: 40,
      color: themePrim
    })
    const slide_switch2 = createWidget(widget.SLIDE_SWITCH, {
      x: (390 / 2 - 76 / 2),
      y: 525 - 440 + pl,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.autoDark,
      checked_change_func: (checked) => {
        Config.autoDark = slide_switch2.getProperty(prop.CHECKED)
        Config.modify = "isModify"
        writeFile("conf_keySch", Config)
      }
    })
    let plus = 135
    // Sección para horario
    createWidget(widget.FILL_RECT, {
      x: 20,
      y: 160 - plus,
      w: 350,
      h: 50,
      radius: 10,
      color: themeSlot
    });
    createWidget(widget.TEXT, {
      x: 30,
      y: 170 - plus,
      w: 350,
      h: 30,
      text: "Subjects >",
      text_size: 20,
      color: themePrim
    }).addEventListener(event.CLICK_DOWN, () => {
      let key
      if (Config.profile == 1) {
        key = 'pages/setUpN'
      } else {
        key = 'pages/setUpV2N'
      }
      push({ url: key, param: '...' })
    })
    createWidget(widget.FILL_RECT, {
      x: 20,
      y: 230 - plus,
      w: 350,
      h: 50,
      radius: 10,
      color: themeSlot
    });
    createWidget(widget.TEXT, {
      x: 30,
      y: 240 - plus,
      w: 350,
      h: 30,
      text: "Schedule >",
      text_size: 20,
      color: themePrim
    }).addEventListener(event.CLICK_DOWN, () => {
      let key = 'pages/ScheduleN'
      push({ url: key, param: '...' })
    })

    // Sección para horas
    createWidget(widget.FILL_RECT, {
      x: 20,
      y: 300 - plus,
      w: 350,
      h: 50,
      radius: 10,
      color: themeSlot
    });
    createWidget(widget.TEXT, {
      x: 30,
      y: 310 - plus,
      w: 350,
      h: 30,
      text: "Times >",
      text_size: 20,
      color: themePrim
    }).addEventListener(event.CLICK_DOWN, () => {
      let key = 'pages/timesN'
      push({ url: key, param: '...' })
    })
    createWidget(widget.FILL_RECT, {
      x: 20,
      y: 370 - plus,
      w: 350,
      h: 50,
      radius: 10,
      color: themeSlot
    });
    createWidget(widget.TEXT, {
      x: 30,
      y: 380 - plus,
      w: 350,
      h: 30,
      text: "Cards >",
      text_size: 20,
      color: themePrim
    }).addEventListener(event.CLICK_DOWN, () => {
      let key = 'pages/cards'
      push({ url: key, param: '...' })
    })

    /*createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 665,
      w: 255,
      h: 70,
      text: "Daily update:",
      text_size: 40,
      color: themePrim
    })
    const slide_switch4 = createWidget(widget.SLIDE_SWITCH, {
      x: (390 / 2 - 300 / 2) - j,
      y: 725,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.dailyAppRemindMe,
      checked_change_func: (checked) => {
        Config.dailyAppRemindMe = slide_switch4.getProperty(prop.CHECKED)
        Config.modify = "isModify"
        writeFile("conf_keySch", Config)
      }
    })*/
    /*createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 765,
      w: 255,
      h: 70,
      text: "Automatic task delete:",
      text_size: 40,
      color: themePrim
    })
    const slide_switch3 = createWidget(widget.SLIDE_SWITCH, {
      x: (390 / 2 - 300 / 2) - j,
      y: 825,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.autoDelete,
      checked_change_func: (checked) => {
        Config.autoDelete = slide_switch3.getProperty(prop.CHECKED)
        Config.modify = "isModify"
        writeFile("conf_keySch", Config)
      }
    })*/
    var p = 90;

    // Sección para el botón "Restore Data"
    createWidget(widget.FILL_RECT, {
      x: 20,
      y: 825 + p,
      w: 350,
      h: 190,
      radius: 20, // Aumento del radio para bordes más redondeados
      color: themeSlot
    });

    createWidget(widget.TEXT, {
      x: 0,
      y: 835 + p,
      w: 390,
      h: 60,
      align_h: align.CENTER_H,
      text: "Restore App Data:",
      text_size: 40, // Aumento del tamaño del texto para mejor visibilidad
      color: themePrim
    });

    // Ícono de "Restore Data"
    var del = createWidget(widget.IMG, {
      x: 390 / 2 - 100 / 2,
      y: 900 + p,
      src: "delete.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      push({ url: 'pages/restore', param: '...' })
    });
    var ly = 20
    // Sección para el botón "About Me"
    createWidget(widget.FILL_RECT, {
      x: 20,
      y: 825 + p + 160 + 50 + ly,
      w: 350,
      h: 190,
      radius: 20, // Aumento del radio para bordes más redondeados
      color: themeSlot
    });

    createWidget(widget.TEXT, {
      x: 0,
      y: 835 + p + 160 + 50 + ly,
      w: 390,
      h: 60,
      align_h: align.CENTER_H,
      text: "About Me:",
      text_size: 40, // Aumento del tamaño del texto para mejor visibilidad
      color: themePrim
    });

    // Ícono de "About Me"
    createWidget(widget.IMG, {
      x: 390 / 2 - 100 / 2,
      y: 900 + 110 + 140 + 50 + ly,
      src: "aboutMe.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      push({ url: 'pages/Me', param: '...' })
    });

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