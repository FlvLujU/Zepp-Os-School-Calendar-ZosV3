
import { createWidget, widget, event } from '@zos/ui'
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
    

    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
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
    var rY = 20
    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
    }
    function readFile(filename) {
      return localStorage.getItem(filename);
    }
    
    var newTask = {
      "asignaturas": [
        {
          "nombre": "Maths",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        },
        {
          "nombre": "Languaje",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        },
        {
          "nombre": "English",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        },
        {
          "nombre": "Physics",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        },
        {
          "nombre": "Technology",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        },
        {
          "nombre": "ICT",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        },
        {
          "nombre": "History",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        },
        {
          "nombre": "Philosophy",
          "actividades": {
            "examenes": [],
            "tareas": [],
            "proyectos": []
          }
        }
      ],
      "fechas": [],
      "Events": [],
      "Done": []
    }
    var ConfigNew = {
      "addedSubjects": [],
      "LunNumMin": [],
      "MarNumMin": [],
      "MieNumMin": [],
      "JueNumMin": [],
      "VieNumMin": [],
      "LunNumHour": [],
      "MarNumHour": [],
      "MieNumHour": [],
      "JueNumHour": [],
      "VieNumHour": [],
      "theme": {
        "bg": "0xffffff",
        "UI": "0xee1907",
        "primText": "0x000000",
        "secText": "0xffffff",
        "slot": "0xdce8da",
        "triText": "0x535352"
      },
      "nightTheme": {
        "bg": "0x333333",
        "UI": "0xff4500",
        "primText": "0xffffff",
        "secText": "0x000000",
        "slot": "0x7f8a7d",
        "triText": "0xffffff"
      },
      "new": true,
      "numberTheme": 0,
      "autoBright": false,
      "autoDark": false,
      "languaje": 1,
      "remindMe": [],
      "remindMe1": [],
      "remindMe3": [],
      "remindMe7": [],
      "remindMe15": [],
      "remindMe30": [],
      "remindMe60": [],
      "dailyAppRemindMe": false,
      "autoDelete": false,
      "dailyLastDate": "",
      "profile": 1,
      "lastDay": "",
      "lastMonth": "",
      "lastYear": "",
      "Schedule": {
        "Lun": [],
        "Mar": [],
        "Mie": [],
        "Jue": [],
        "Vie": []
      },
      "colors": [],
      "lastMinLun": "",
      "lastHourLun": "",
      "lastMinMar": "",
      "lastHourMar": "",
      "lastMinMie": "",
      "lastHourMie": "",
      "lastMinJue": "",
      "lastHourJue": "",
      "lastMinVie": "",
      "lastHourVie": "",
      "modify": "",
      "alarMin": "",
      "alarmHour": "",
      "currentAlarm": "",
      "alarmMe": "",
      "customSubjects": [],
      "RestSubjects": [],
      "CardsOrder": [0, 1, 2, 3, 4, 5, 6, 7]
    }
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
      w: 320,
      h: 70,
      text: "Restore data:",
      text_size: 40,
      
      color: themePrim
    })    
    createWidget(widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 90,
      w: 330,
      h: 305,
      text: "This action is irreversible.\nIf you do this, you will need\nto reconfigure the app again.\nDo you wish to proceed?",
      text_size:25,
      color: themePrim
    })
    createWidget(widget.IMG, {
      x: 0,
      y: 400,
      src: "y.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      writeFile("task_keySch", newTask)
      writeFile("conf_keySch", ConfigNew)
      push({ url: 'pages/init', param: '...' })
    })
    function writeFile(filename, data) {
localStorage.setItem(filename, data);
    }
    createWidget(widget.IMG, {
      x: 195,
      y: 400,
      src: "n.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      push({ url: 'pages/init', param: '...' })
    })
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