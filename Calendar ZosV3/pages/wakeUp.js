import { Time } from '@zos/sensor'
import { createWidget, widget, prop } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { onGesture, offGesture, GESTURE_RIGHT } from '@zos/interaction'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
var alerted = false
var par
function sumTime(hoursToAdd, minutesToAdd, secondsToAdd) {
  const initialDate = new Date();
  initialDate.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
  const totalSeconds = (hoursToAdd * 3600) + (minutesToAdd * 60) + secondsToAdd;
  const finalDate = new Date(initialDate.getTime() + totalSeconds * 1000);
  const elapsedSeconds = Math.floor((finalDate - initialDate) / 1000);
  return elapsedSeconds
}
var pH = 0
var pS = 0
var pM = 0
var inTimer = false
var t
Page({
  state: {},
  build() {
    setStatusBarVisible(false)
    var jsonBase = readFile('task_keySch')

    var decodeJSON = jsonBase

    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    setStatusBarVisible(false)




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
    var autoBright = Config.autoBright
    var autoDark = Config.autoDark
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
    var time = new Time()
    const psT = time.getDay()
    function readFile(filename) {
      return localStorage.getItem(filename);
    }
    
    
    Config.lastDay = time.getDay()
    Config.lastMonth = time.getMonth()
    Config.lastYear = time.getFullYear()
    saveJson('conf_keySch', Config);
    function saveJson(filename, json) {
      writeFile(filename, json);
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
    let times = 0
    let g = timer.createTimer(0, 1300, function () {
      if (times < 7) {
        if (times == 0 || times == 2 || times == 4 || times == 6) {
          vibrate.stop()
          vibrate.scene = 9
          vibrate.start()
        } else {
          vibrate.stop()
          vibrate.scene = 27
          vibrate.start()
        }
        times++
      } else {
        vibrate.stop()
        timer.stopTimer(g)
      }
    })
    let img = createWidget(widget.IMG, {
      x: 390 / 2 - 100,
      y: 60,
      src: "anim3/StopWatch_0.png"
    })
    let b = 0
    let t = 0
    t = timer.createTimer(0, 100, function () {
      if (b < 59 && t < 5) {
        b++
      } else if (t < 5) {
        b = 0
        t++
      } else {
        timer.stopTimer(t)
      }
      img.setProperty(prop.MORE, {
        src: "anim3/" + `StopWatch_${b}` + ".png"
      })
    })
    createWidget(widget.TEXT, {
      x: 70,
      y: 290,
      w: 350,
      h: 50,
      color: 0xffffff,
      text_size: 40,
      text: "¡Temporizador terminado!"
    })
    onGesture(function (event) {
      if (event == GESTURE_RIGHT) {
        push({ url: 'pages/init', param: "..." })
       offGesture()
      }
    });
  },
  onDestroy() {
    try {
      timer.stopTimer(t)
    } catch (e) {
      console.log("error: " + e)
    }
   offGesture()

    vibrate && vibrate.stop()
  },
});