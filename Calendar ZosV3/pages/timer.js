import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { Vibrator, VIBRATOR_SCENE_DURATION_LONG, VIBRATOR_SCENE_STRONG_REMINDER } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setAutoBrightness } from '@zos/display'
import { openSync, writeFileSync, closeSync, readFileSync, openAssetsSync, statAssetsSync, readSync, O_RDONLY, O_CREAT, O_RDWR, O_TRUNC, statSync } from '@zos/fs'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { getProfile } from '@zos/user'
import { onGesture, offGesture, GESTURE_UP, GESTURE_DOWN, GESTURE_RIGHT, GESTURE_LEFT } from '@zos/interaction'
import { exit } from '@zos/router'
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL, SCROLL_MODE_SWIPER} from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
var time = new Time()
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
    var k = 0
    var g = 0
    var b = 0
    var f = -25
    var hf = 90
    var q = 0
    var t = 0
    var s = 75
    var modifyO = false
    var modifyT = false
    var modifyTr = false
    var modifyF = false
    var modifyFi = false
    let rect = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 70,
      color: themeUI
    });
    let txt = createWidget(widget.TEXT, {
      x: 20,
      y: 10,
      w: 385,
      h: 70,
      text: "    Temporizador:",
      text_size: 33,
      color: themeSec
    })
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    let one = createWidget(widget.TEXT, {
      x: 52,
      y: 50,
      w: 130,
      h: 120,
      color: 0xffffff,
      text_size: s,
      text: String(arr[k])
    })
    one.addEventListener(event.CLICK_DOWN, (info) => {
      one.setProperty(prop.MORE, {
        color: 0x3b83bd
      })
      two.setProperty(prop.MORE, {
        color: 0xffffff
      })
      three.setProperty(prop.MORE, {
        color: 0xffffff
      })
      if (modifyO) {
        k++
        if (k > 23) {
          k = 0
        }
        let xSet
        if (k > 9) {
          xSet = 5
        } else {
          xSet = 52
        }
        one.setProperty(prop.MORE, {
          x: xSet,
          text: String(arr[k])
        })
      }
      modifyO = true
      modifyT = false
      modifyTr = false
      modifyF = false
      modifyFi = false
    })
    let dots1 = createWidget(widget.TEXT, {
      x: 90 + 15 + 5 + 5 + 5 + 3 + f,
      y: 50,
      w: 60,
      h: 120,
      color: 0xffffff,
      text_size: s,
      text: ":"
    })
    let dots2 = createWidget(widget.TEXT, {
      x: 90 + 15 + 5 + 5 + 5 + 3 + hf + 12,
      y: 50,
      w: 60,
      h: 120,
      color: 0xffffff,
      text_size: s,
      text: ":"
    })
    var arr2 = [0, 1, 2, 3, 4, 5]
    let two = createWidget(widget.TEXT, {
      x: 170 - 10 - 40 + 15 + 5 + 5 + 5 + f,
      y: 50,
      w: 60,
      h: 120,
      color: 0xffffff,
      text_size: s,
      text: String(arr2[b])
    })
    two.addEventListener(event.CLICK_DOWN, (info) => {
      one.setProperty(prop.MORE, {
        color: 0xffffff
      })
      two.setProperty(prop.MORE, {
        color: 0x3b83bd
      })
      three.setProperty(prop.MORE, {
        color: 0xffffff
      })
      if (modifyT) {
        b++
        if (b > 5) {
          b = 0
        }
        two.setProperty(prop.MORE, {
          text: String(arr2[b])
        })
      }
      modifyO = false
      modifyT = true
      modifyTr = false
      modifyF = false
      modifyFi = false
    })
    var arr3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let three = createWidget(widget.TEXT, {
      x: 260 - 15 - 10 - 10 - 40 + 10 + f,
      y: 50,
      w: 60,
      h: 120,
      text_size: s,
      color: 0xffffff,
      text: String(arr3[g])
    })
    three.addEventListener(event.CLICK_DOWN, (info) => {
      one.setProperty(prop.MORE, {
        color: 0xffffff
      })
      two.setProperty(prop.MORE, {
        color: 0xffffff
      })
      three.setProperty(prop.MORE, {
        color: 0x3b83bd
      })
      if (modifyTr) {
        g++
        if (g > 9) {
          g = 0
        }
        three.setProperty(prop.MORE, {
          text: String(arr3[g])
        })
      }
      modifyO = false
      modifyT = false
      modifyTr = true
      modifyF = false
      modifyFi = false
    })
    var arr4 = [0, 1, 2, 3, 4, 5]
    let four = createWidget(widget.TEXT, {
      x: 170 - 10 - 40 + 15 + 5 + 5 + 5 + hf + 20,
      y: 50,
      w: 60,
      h: 120,
      color: 0xffffff,
      text_size: s,
      text: String(arr4[b])
    })
    four.addEventListener(event.CLICK_DOWN, (info) => {
      one.setProperty(prop.MORE, {
        color: 0xffffff
      })
      two.setProperty(prop.MORE, {
        color: 0xffffff
      })
      three.setProperty(prop.MORE, {
        color: 0xffffff
      })
      four.setProperty(prop.MORE, {
        color: 0x3b83bd
      })
      five.setProperty(prop.MORE, {
        color: 0xffffff
      })
      if (modifyF) {
        q++
        if (q > 5) {
          q = 0
        }
        four.setProperty(prop.MORE, {
          text: String(arr4[q])
        })
      }
      modifyO = false
      modifyT = true
      modifyTr = false
      modifyF = true
      modifyFi = false
    })
    var arr5 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let five = createWidget(widget.TEXT, {
      x: 260 - 15 - 10 - 10 - 40 + 15 + 5 + 5 + 5 + hf,
      y: 50,
      w: 60,
      h: 120,
      text_size: s,
      color: 0xffffff,
      text: String(arr5[t])
    })
    five.addEventListener(event.CLICK_DOWN, (info) => {
      one.setProperty(prop.MORE, {
        color: 0xffffff
      })
      two.setProperty(prop.MORE, {
        color: 0xffffff
      })
      three.setProperty(prop.MORE, {
        color: 0xffffff
      })
      four.setProperty(prop.MORE, {
        color: 0xffffff
      })
      five.setProperty(prop.MORE, {
        color: 0x3b83bd
      })
      if (modifyFi) {
        t++
        if (t > 9) {
          t = 0
        }
        five.setProperty(prop.MORE, {
          text: String(arr5[t])
        })
      }
      modifyO = false
      modifyT = false
      modifyTr = false
      modifyF = false
      modifyFi = true
    })
    let text = createWidget(widget.TEXT, {
      x: 115,
      y: 150,
      w: 250,
      h: 60,
      text_size: 35,
      color: 0xffffff,
      text: ""
    })
    let wh = 380
    let arcX = 390 / 2 - wh / 2
    let arcY = 450 / 2 - wh / 2
    let arcBg = createWidget(widget.ARC, {
      x: arcX,
      y: arcY,
      w: wh,
      h: wh,
      start_angle: 0,
      end_angle: 360,
      color: 0x0886d3,
      line_width: 15
    })
    let arc = createWidget(widget.ARC, {
      x: arcX,
      y: arcY,
      w: wh,
      h: wh,
      start_angle: -90,
      end_angle: -90,
      color: 0xADD8E6,
      line_width: 15
    })
    var alarm
    var timing = false
    var timed = false
    var play = createWidget(widget.IMG, {
      x: 390 / 2 - 50,
      y: 230,
      src: "play.png"
    })
    var stop = createWidget(widget.IMG, {
      x: 390 / 2 - 50 - 75,
      y: 230,
      src: "stop.png"
    })
    var cH = 0
    var cM = 0
    var cS = 0
    stop.setProperty(prop.VISIBLE, false)
    text.setProperty(prop.VISIBLE, false)
    arc.setProperty(prop.VISIBLE, false)
    arcBg.setProperty(prop.VISIBLE, false)
    var alarmID
    onGesture(function (event) {
      if (event == GESTURE_RIGHT) {
       offGesture()
        if (timing == true && cS >= 0 && cM >= 0 && cH >= 0) {
          push({
            url: 'pages/index',
            param: JSON.stringify({
              can: true,
              timeCur: calc(cH, cM, cS)
            })
          })
        }
      }
    });
    stop.addEventListener(event.CLICK_DOWN, (info) => {
      timing = false
      inTimer = timing
      timed = false
      play.setProperty(prop.MORE, {
        src: "play.png",
        x: 390 / 2 - 50
      })
      hmSetting.setBrightScreenCancel()
      timer.stopTimer(j)
      one.setProperty(prop.VISIBLE, true)
      two.setProperty(prop.VISIBLE, true)
      three.setProperty(prop.VISIBLE, true)
      four.setProperty(prop.VISIBLE, true)
      five.setProperty(prop.VISIBLE, true)
      dots1.setProperty(prop.VISIBLE, true)
      dots2.setProperty(prop.VISIBLE, true)
      txt.setProperty(prop.VISIBLE, true)
      rect.setProperty(prop.VISIBLE, true)
      stop.setProperty(prop.VISIBLE, false)
      text.setProperty(prop.VISIBLE, false)
      arc.setProperty(prop.VISIBLE, false)
      arcBg.setProperty(prop.VISIBLE, false)
    })
    let j
    let up
    play.addEventListener(event.CLICK_DOWN, (info) => {
      if (timing == false) {
        /*hmApp.registerKeyEvent(function (key, action) {
          console.log('receive key code:' + code + ' action:' + action)
          let msg = ''
          let ret = false
          switch (key) {
            case hmApp.key.BACK:
              msg = 'back.'
              break
            case hmApp.key.HOME:
              msg = 'home.'
              ret = true 
              break
          }
        
          switch (action) {
            case hmApp.action.CLICK:
              showToast({
                text: "Pause or stop timer to exit this page, you will see an alert when timer ends"
              })
          }
        
          console.log('receive key:' + msg)
          return ret
        })*/
        one.setProperty(prop.VISIBLE, false)
        two.setProperty(prop.VISIBLE, false)
        three.setProperty(prop.VISIBLE, false)
        four.setProperty(prop.VISIBLE, false)
        five.setProperty(prop.VISIBLE, false)
        dots1.setProperty(prop.VISIBLE, false)
        dots2.setProperty(prop.VISIBLE, false)
        txt.setProperty(prop.VISIBLE, false)
        rect.setProperty(prop.VISIBLE, false)
        text.setProperty(prop.VISIBLE, true)
        arc.setProperty(prop.VISIBLE, true)
        arcBg.setProperty(prop.VISIBLE, true)
        timing = true
        inTimer = timing
        play.setProperty(prop.MORE, {
          src: "pause.png",
          x: 390 / 2 - 50 + 75
        })
        stop.setProperty(prop.VISIBLE, true)
        let textTemp = `${arr[k]} : ${arr2[b]}${arr3[g]} : ${arr4[q]}${arr5[t]}`
        let h = arr[k]
        let m = Number(String(arr2[b]) + String(arr3[g]))
        let s = Number(String(arr4[q]) + String(arr5[t]))
        let hInit = arr[k]
        let mInit = Number(String(arr2[b]) + String(arr3[g]))
        let sInit = Number(String(arr4[q]) + String(arr5[t]))
        if (timed == false) {
          text.setProperty(prop.MORE, {
            text: textTemp
          })
          hmSetting.setBrightScreen(sumTime(h, m, s))
        }
        if (timed == false) {
          j = timer.createTimer(1000, 1000, function () {
            if (timing == true) {
              s--
              if (s < 0) {
                s = 59
                m--
                if (m < 0) {
                  m = 59
                  h--
                }
              }
              let strM = m
              if (String(m).length < 2) {
                strM = "0" + String(m)
              }
              let strS = s
              if (String(s).length < 2) {
                strS = "0" + String(s)
              }
              pH = h
              pM = m
              pS = s
              cH = h
              cM = m
              cS = s
              if (h <= 0 && m <= 0 && s <= 0) {
                push({ url: 'pages/wakeUp', param: "..." })
              }
              if (h >= 0 && m >= 0 && s >= 0) {
                text.setProperty(prop.MORE, {
                  text: `${h} : ${strM} : ${strS}`
                })
                let seconds = calc(h, m, s)
                let total = calc(hInit, mInit, sInit)
                let perc = percentaje(seconds, total)
                let I = 360 - Math.round(perc);
                console.log("perc: " + I)
                console.log("percC: " + Math.round(perc))
                arc.setProperty(prop.MORE, {
                  end_angle: I - 90
                })
              }
              timed = true
            }
          })
        }
      } else {
        one.setProperty(prop.VISIBLE, false)
        two.setProperty(prop.VISIBLE, false)
        three.setProperty(prop.VISIBLE, false)
        four.setProperty(prop.VISIBLE, false)
        five.setProperty(prop.VISIBLE, false)
        dots1.setProperty(prop.VISIBLE, false)
        dots2.setProperty(prop.VISIBLE, false)
        txt.setProperty(prop.VISIBLE, false)
        rect.setProperty(prop.VISIBLE, false)
        text.setProperty(prop.VISIBLE, true)
        arc.setProperty(prop.VISIBLE, true)
        arcBg.setProperty(prop.VISIBLE, true)
        hmApp.unregisterKeyEvent();
        timing = false
        timed = true
        inTimer = timing
        play.setProperty(prop.MORE, {
          src: "play.png",
          x: 390 / 2 - 50 + 75
        })
        try {
          time.stopTimer(j)
        } catch (e) {
          console.log("error:" + e)
        }
      }
    })
    function calc(horas, minutos, sec) {
      const segundosDeHoras = horas * 3600;
      const segundosDeMinutos = minutos * 60;
      const totalSegundos = segundosDeHoras + segundosDeMinutos + sec;
      return totalSegundos;
    }
    function sumTime(initialHour, initialMinutes, initialSeconds, hoursToAdd, minutesToAdd, secondsToAdd) {
      const initialDate = new Date();
      initialDate.setHours(initialHour, initialMinutes, initialSeconds, 0);

      const totalSeconds = (hoursToAdd * 3600) + (minutesToAdd * 60) + secondsToAdd;
      const finalDate = new Date(initialDate.getTime() + totalSeconds * 1000);

      const elapsedSeconds = Math.floor((finalDate - initialDate) / 1000);

      return elapsedSeconds
    }
    function percentaje(segundosActuales, tiempoTotal) {
      const porcentaje = (segundosActuales / tiempoTotal) * 360;
      return porcentaje;
    }
  },
  onDestroy() {
   offGesture()

    vibrate && vibrate.stop()
  },
});