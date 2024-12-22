import { Time } from '@zos/sensor'
import { createWidget, widget, align, getTextLayout } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { offGesture } from '@zos/interaction'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    var jsonBase = readFile('task_keySch')

    var decodeJSON = jsonBase

    var conf = readFile("conf_keySch")

    function readFile(filename) {
      return localStorage.getItem(filename);
    }
    setStatusBarVisible(false)
    var Config = conf
    var themeBG = Config.theme.bg
    var themeUI = Config.theme.UI
    var themePrim = Config.theme.primText
    var themeSec = Config.theme.secText
    var themeSlot = Config.theme.slot
    var autoBright = Config.autoBright
    var autoDark = Config.autoDark
    var lang;
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG,
      radius: 12
    })
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
    function decodeUint8Array(uint8array) {
      let decodedString = "";


      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    var l = 23
    var time = new Time()
    if (time.getHours() > 21 && autoDark == true) {
      var themeBG = Config.nightTheme.bg
      var themeUI = Config.nightTheme.UI
      var themePrim = Config.nightTheme.primText
      var themeSec = Config.nightTheme.secText
      var themeSlot = Config.nightTheme.slot
    }
    createWidget(widget.IMG, {
      x: 20,
      y: 20,
      src: "Me.png"
    })
    createWidget(widget.TEXT, {
      x: 115,
      y: 40,
      w: 390,
      color: themePrim,
      text_size: 30,
      text: "<= FlvLujU Apps =>"
    })
    createWidget(widget.TEXT, {
      x: 0,
      y: 110,
      w: 390,
      color: Config.theme.triText,
      align_h: align.CENTER_H,
      text_size: 20,
      text: wrapText("Programming has always been a part of my life. I started at the age of 12 (Now I´m 17 years), and since then, I’ve been learning more as a self-taught person. That’s why I encourage you to share your opinion to help improve this application. Contact me here:")
    })
    var jk = 35
    var kj = 8
    var jj = 0
    createWidget(widget.IMG, {
      x: 20 + jj, 
      y: 300 + jk,
      src: "DC.png"
    })
    createWidget(widget.TEXT, {
      x: 90 + jj,
      y: 300 + jk + kj,
      w: 390,
      color: Config.theme.triText,
      text_size: 20,
      text: "flvluju"
    })
    createWidget(widget.IMG, {
      x: 20 + jj,
      y: 360 + jk,
      src: "mail.png"
    })
    createWidget(widget.TEXT, {
      x: 90 + jj,
      y: 360 + jk + kj,
      w: 390,
      color: Config.theme.triText,
      text_size: 20,
      text: "flvluju@gmail.com"
    })
    function wrapText(text) {
      const maxWidth = 360; // Ancho máximo permitido
      const textArray = [];
      let tempText = "";
    
      for (let i = 0; i < text.length; i++) {
        tempText += text[i];
    
        // Obtén el ancho actual del texto
        const { width } = getTextLayout(tempText, {
          text_size: 20,
          text_width: maxWidth
        });
    
        // Verifica si el texto excede el ancho permitido
        if (width >= maxWidth) {
          // Encuentra el último espacio en tempText
          const lastSpaceIndex = tempText.lastIndexOf(" ");
          if (lastSpaceIndex !== -1) {
            // Corta en el último espacio para mantener las palabras juntas
            textArray.push(tempText.slice(0, lastSpaceIndex));
            tempText = tempText.slice(lastSpaceIndex + 1); // Resto de la línea
          } else {
            // Si no hay espacios, corta directamente
            textArray.push(tempText.slice(0, -1));
            tempText = text[i];
          }
        }
      }
    
      // Agrega el texto restante si existe
      if (tempText.length > 0) {
        textArray.push(tempText);
      }
    
      // Une las líneas con saltos de línea
      return textArray.join("\n");
    }
    
  },
  onDestroy() {
    offGesture()
  },
});