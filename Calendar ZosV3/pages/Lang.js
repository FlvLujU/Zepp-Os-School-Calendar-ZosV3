
import { createWidget, widget, prop, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { offGesture } from '@zos/interaction'
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
    const isVertical = true
    //setScrollView(true, px(450), 4, isVertical)
    var conf = readFile("conf_keySch")
    function readFile(filename) {
      return localStorage.getItem(filename);
    }
    
    
    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }

    
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
    var rY = 20
    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
    }
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
    var bgColor = ["0xffffff", "0x333333", "0x6c757d", "0x87ceeb", "0xf5f5dc", "0xffdab9"];
    var UIColor = ["0xee1907", "0xff4500", "0xfaf3e0", "0x4682B4", "0x556B2F", "0x8A2BE2"];
    var PrimColor = ["0x000000", "0xffffff", "0x000000", "0x1C1C1C", "0x8B4513", "0x5F9EA0"];
    var SecColor = ["0xffffff", "0x000000", "0x000000", "0xF8F8FF", "0xFFF8DC", "0xFFD700"];
    var SlotColor = ["0xdce8da", "0x7f8a7d", "0xdce8da", "0xB0C4DE", "0xdcdcaf", "0xDDA0DD"];
    var TriColor = ["0x535352", "0xffffff", "0xffffff", "0x000000", "0x000000", "0x000000"]
    var img;
    if (lang == 0) {
      img = "en.png";
    } else if (lang == 1) {
      img = "es.png";
    } else if (lang == 2) {
      img = "fr.png";
    }

    var p = 540 - 450;
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG
    });

    var langT = createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: -75 + p,
      w: 255,
      h: 70,
      text: "Idioma:",
      text_size: 40,
      color: themePrim
    });

    var bt_lang = createWidget(widget.IMG, {
      x: 235,
      y: -55 + p,
      src: img
    });

    // Function to update langT text based on Config language setting
    function updateLanguageText(lang) {
      const texts = ["Languaje:", "Idioma:", "भाषा:"];
      langT.setProperty(prop.MORE, { text: texts[Config.languaje] });
    }

    // Function to update language and save configuration
    function updateLanguage(lang, src) {
      bt_lang.setProperty(prop.MORE, { src });
      Config.languaje = lang;
      Config.modify = "isModify";
      writeFile("conf_keySch", Config);
      updateLanguageText();
    }

    // English Language Button
    var lang1 = createWidget(widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 25 + p,
      src: "en.png",
    }).addEventListener(event.CLICK_DOWN, () => {
      updateLanguage(0, "en.png");
    });

    // Spanish Language Button
    var lang2 = createWidget(widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 75 + p,
      src: "es.png",
    }).addEventListener(event.CLICK_DOWN, () => {
      updateLanguage(1, "es.png");
    });

    // Hindi Language Button
    var lang3 = createWidget(widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 125 + p,
      src: "fr.png",
    }).addEventListener(event.CLICK_DOWN, () => {
      updateLanguage(2, "fr.png");
    });
    var langgtext1 = createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j + 60,
      y: 25 + p,
      w: 140,
      h: 40,
      color: themePrim,
      text_size: 20,
      text: 'English'
    }).addEventListener(event.CLICK_DOWN, () => {
      updateLanguage(0, "en.png");
    })
    var langgtext2 = createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j + 60,
      y: 75 + p,
      w: 140,
      h: 40,
      color: themePrim,
      text_size: 20,
      text: 'Spanish'
    }).addEventListener(event.CLICK_DOWN, () => {
      updateLanguage(1, "es.png");
    })
    var langgtext3 = createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j + 60,
      y: 125 + p,
      w: 140,
      h: 40,
      color: themePrim,
      text_size: 20,
      text: 'भारतीय'
    }).addEventListener(event.CLICK_DOWN, () => {
      updateLanguage(2, "fr.png");
    })
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
        push({ url: 'pages/profSelect', param: '...' })
      }
    })
    // Write file function
    function writeFile(filename, data) {
localStorage.setItem(filename, data);
    }

    // Function to convert JSON to ArrayBuffer
    function jsonToArrayBuffer(json) {
      const jsonString = JSON.stringify(json);
      const buffer = new ArrayBuffer(jsonString.length);
      const uint8Array = new Uint8Array(buffer);
      for (let i = 0; i < jsonString.length; i++) {
        uint8Array[i] = jsonString.charCodeAt(i);
      }
      return buffer;
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