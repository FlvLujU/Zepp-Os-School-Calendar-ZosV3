import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, event} from '@zos/ui'
import { Vibrator} from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { replace } from '@zos/router'
import { offGesture } from '@zos/interaction'
import { setScrollLock, scrollTo} from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
var alerted = false
var par
Page({
  state: {},
  build() {
    setStatusBarVisible(false)
    let b = 0
    let v = 0
    let z = 0
    let d = 0
    let xC = 390 / 2 - 50
    let initS1 = 10
    let initS2 = 10
    let initS3 = 10
    let initS4 = 10
    let initS5 = 10
    let rectX = 380
    let rectW = 0
    let rectX2 = 390
    let rectW2 = 0
    let l = 40
    let q = 145
    let n = 10
    let o = 5
    let e = 5
    let nY = 120
    let rY = 230
    let rY2 = 110
    let rH2 = 0
    let wO = 0
    var maked = false
    const m = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ]
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



    var Data = decodeJSON
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
    let rect2 = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG,
    })
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 40,
      color: themeUI,
      radius: 0
    })
    createWidget(widget.TEXT, {
      x: 40,
      y: 0,
      w: 390,
      h: 45,
      color: themeSec,
      text_size: 30,
      text: "Events:"
    })
    //console.log("Data: " + Data)
    let datesDisplay = []
    for (let i = 0; i < Data.Events.length; i++) {
      datesDisplay.push(Data.Events[i])
    }
    let datesSrc = []
    for (let i = 0; i < Data.Done.length; i++) {
      datesSrc.push(Data.Done[i] + ".png")
    }
    console.log("datesDisp: " + datesDisplay)
    var string = 1
    let eventNum = 0
    var maxY = 0
    write()
    function write() {

      if (datesDisplay.length > 0) {
        /*let refresh = createWidget(widget.IMG, {
          x: 390 - 105,
          y: 5,
          src: "refresh.png"
        }).addEventListener(event.CLICK_DOWN, (info) => {
          push({ url: 'pages/init', param: '...' })
        })*/
        let p = 0

        for (let i = 0; i < datesDisplay.length + 1; i++) {
          let yCur = 60
          if (i < datesDisplay.length) {
            let txt = datesDisplay[i]
            let delImg = createWidget(widget.IMG, {
              x: 300,
              y: (yCur + 5) + 90 * i,
              w: 65,
              h: 65,
              src: "del.png"
            })
            let Rect = createWidget(widget.FILL_RECT, {
              x: 20,
              y: yCur + 90 * i,
              w: 350,
              h: 75,
              radius: 11,
              color: 0xdce8da,
            })
            let img = createWidget(widget.IMG, {
              x: 24,
              y: (yCur + 5) + 90 * i,
              src: datesSrc[i]
            })
            img.addEventListener(event.CLICK_DOWN, (info) => {
              if (Data.Done[i] == "undone") {
                Data.Done[i] = "done"
                datesSrc[i] = "done.png"
              } else {
                Data.Done[i] = "undone"
                datesSrc[i] = "undone.png"
              }
              saveJson('task_keySch', Data);
              img.setProperty(prop.MORE, {
                src: datesSrc[i]
              })
            })
            var curW = 250
            let Txt = createWidget(widget.TEXT, {
              x: 100,
              y: countNewlines(txt) == 3 ? yCur + 90 * i : countNewlines(txt) == 2 ? yCur + 90 * i + 12 : yCur + 90 * i + 22,
              w: curW,
              h: 80,
              color: 0x000000,
              text: txt,
              text_size: 18
            })
            eventNum++
            function countNewlines(text) {
              // Usa una expresión regular para contar cuántos saltos de línea hay
              const newlineCount = (text.match(/\n/g) || []).length;
              return newlineCount + 1;
            }
            let Selector = createWidget(widget.IMG, {
              x: 20,
              y: yCur + 90 * i,
              w: 350,
              h: 75,
              src: ".png"
            })
            let fImg = createWidget(widget.IMG, {
              x: 24,
              y: (yCur + 5) + 90 * i,
              w: 64,
              h: 64,
              src: ".png"
            })
            fImg.addEventListener(event.CLICK_DOWN, (info) => {
              if (Data.Done[i] == "undone") {
                Data.Done[i] = "done"
                datesSrc[i] = "done.png"
              } else {
                Data.Done[i] = "undone"
                datesSrc[i] = "undone.png"
              }
              saveJson('task_keySch', Data);
              img.setProperty(prop.MORE, {
                src: datesSrc[i]
              })
            })
            let fImgDel = createWidget(widget.IMG, {
              x: 300,
              y: (yCur + 5) + 90 * i,
              w: 64,
              h: 64,
              src: ".png"
            })
            fImgDel.addEventListener(event.CLICK_DOWN, (info) => {
              if (info.x > posEnd) {
                Data.Done.splice(i, 1);
                Data.Events.splice(i, 1);
                saveJson('task_keySch', Data);
                replace({ url: 'pages/Events', param: '...' })
              }
            })
            let x = 20
            let x2 = 24
            let x3 = 100
            let posEnd = 20 + 350
            let startX = null; // Variable para almacenar la posición inicial del dedo

            Selector.addEventListener(event.MOVE, function (info) {
              // Si es el primer movimiento, establecemos la posición inicial del dedo
              if (startX === null) {
                startX = info.x;
              }

              // Calcular la distancia deslizada en dirección opuesta (invertimos deltaX)
              let deltaX = startX - info.x; // Invertimos la dirección del deslizamiento
              if (deltaX > 85) deltaX = 85; // Limitamos el deslizamiento a un máximo de 85 píxeles
              if (deltaX < 0) deltaX = 0;   // No permitir deslizamiento negativo

              // Ajustar las posiciones de cada widget con el desplazamiento invertido
              let posX = x - deltaX;
              let posX2 = x2 - deltaX;
              let posX3 = x3 - deltaX;
              posEnd = x - deltaX + 350

              // Actualizar la posición de los elementos según el deslizamiento calculado
              Rect.setProperty(prop.X, posX);
              img.setProperty(prop.X, posX2);
              fImg.setProperty(prop.X, posX2);
              Txt.setProperty(prop.X, posX3);
            });

            // Cuando el evento de movimiento termina, reiniciamos la posición inicial
            Selector.addEventListener(event.CLICK_UP, function () {
              startX = null; // Restablecer la posición inicial del dedo
            });

          } else {
            maxY = yCur + 90 * i
            let add = createWidget(widget.IMG, {
              x: 390 / 2 - 76 / 2,
              y: maxY,
              src: "add.png"
            }).addEventListener(event.CLICK_DOWN, (info) => {
              scrollTo({
                y: 0
              })
              setScrollLock({
                lock: true,
              })
              GROUP_NUMERIC.setProperty(prop.VISIBLE, false)
              KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
              GROUP_SYMBOLS.setProperty(prop.VISIBLE, false)
              GROUP_ALPHABET.setProperty(prop.VISIBLE, true)
              GROUP_LETTERS.setProperty(prop.VISIBLE, true)
              GROUP_EVENTS.setProperty(prop.VISIBLE, true)
              KEY_DEL.setProperty(prop.VISIBLE, true)
              KEY_SPACE.setProperty(prop.VISIBLE, true)
            })
          }
        }
      } else {
        let maskMonth = createWidget(widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 390,
          h: 450,
          color: themeBG
        });
        createWidget(widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 390,
          h: 45,
          color: themeUI,
          radius: 0
        })
        createWidget(widget.TEXT, {
          x: 40,
          y: 0,
          w: 390,
          h: 40,
          color: themeSec,
          text_size: 30,
          text: "Events:"
        })
        createWidget(widget.TEXT, {
          x: 0,
          y: 0,
          w: 390,
          h: 450,
          color: themePrim,
          text_size: 22,
          align_h: align.CENTER_H,
          align_v: align.CENTER_V,
          text: "No events.\n\nAdd one here."
        });
        let add = createWidget(widget.IMG, {
          x: 390 / 2 - 76 / 2,
          y: 300 + 35,
          src: "add.png"
        }).addEventListener(event.CLICK_DOWN, (info) => {
          GROUP_NUMERIC.setProperty(prop.VISIBLE, false)
          KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
          GROUP_SYMBOLS.setProperty(prop.VISIBLE, false)
          GROUP_ALPHABET.setProperty(prop.VISIBLE, true)
          GROUP_LETTERS.setProperty(prop.VISIBLE, true)
          GROUP_EVENTS.setProperty(prop.VISIBLE, true)
          KEY_DEL.setProperty(prop.VISIBLE, true)
          KEY_SPACE.setProperty(prop.VISIBLE, true)
        })
      }
    }
    console.log("event: " + eventNum)
    if(eventNum > 3){
      rect2.setProperty(prop.MORE, {
        x: 0,
        y: 0,
        w: 390,
        h: maxY + 75 + 15
      })
    }
    //KeyBoard
    var text_value = ''
    var start_y = 125
    let start_yInput = 25
    var isKeyPressed = false
    var isKeyCapPressed = false
    var isKeyNumericPressed = false
    const GROUP_EVENTS = createWidget(widget.GROUP)
    const GROUP_LETTERS = createWidget(widget.GROUP)
    const GROUP_ALPHABET = createWidget(widget.GROUP)
    const GROUP_NUMERIC = createWidget(widget.GROUP)
    const GROUP_SYMBOLS = createWidget(widget.GROUP)
    const bg = GROUP_EVENTS.createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      radius: 5,
      color: 0x000000
    })
    const stroke = GROUP_EVENTS.createWidget(widget.STROKE_RECT, {
      x: 1,
      y: start_yInput,
      w: 385,
      h: 107,
      radius: 5,
      color: 0xffffff
    })

    const text_input = GROUP_EVENTS.createWidget(widget.TEXT, {
      x: 3,
      y: start_yInput - 2,
      w: 375,
      h: 105,
      align_h: align.CENTER_H,
      text_size: 24,
      color: 0xffffff
    })

    //Create groups

    const KEY_ABC = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "abc",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showABCButtons()
        }
      }
    })

    const KEY_DEF = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "def",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showDEFButtons()
        }
      }
    })

    const KEY_GHI = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: 'ghi',
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showGHIButtons()
        }
      }
    })

    const KEY_JKL = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "jkl",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showJKLButtons()
        }
      }
    })

    const KEY_MN = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "mnñ",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showMNButtons()
        }
      }
    })

    const KEY_OPQ = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "opq",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showOPQButtons()
        }
      }
    })

    const KEY_RST = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "rst",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showRSTButtons()
        }
      }
    })

    const KEY_UVW = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "uvw",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showUVWButtons()
        }
      }
    })

    const KEY_XYZ = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "xyz",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showXYZButtons()
        }
      }
    })

    const KEY_CAP = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "CAP",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyCapPressed) {
          KEY_CAP.setProperty(prop.MORE, {
            normal_color: 0x333333,
            press_color: 0x0986D4,
            x: 293,
            y: start_y + 50,
            w: 95,
            h: 55,
            text: "CAP",
            text_size: 20,
          })
          isKeyCapPressed = false;
          setKeysLowerCase(start_y);
        } else {
          KEY_CAP.setProperty(prop.MORE, {
            normal_color: 0x0986D4,
            press_color: 0x333333,
            x: 293,
            y: start_y + 50,
            w: 95,
            h: 55,
            text: "CAP",
            text_size: 20
          })
          isKeyCapPressed = true;
          setKeysUpperCase(start_y);
        }
      }
    })

    const KEY_NUMBER = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "123",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        showNumericsButon(start_y);
      }
    })

    const KEY_ALPHABEICT = createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "ABC",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        hideNumericsButon(start_y);
        hideSymbolsButon(start_y);
      }
    })

    const KEY_SYMBOL = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "!@#",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        showSymbolsButon(start_y);
      }
    })

    const KEY_SPACE = createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 221,
      w: 289,
      h: 55,
      text: "SPACE",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter(' ', text_input);
      }
    })

    const KEY_DEL = createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 221,
      w: 95,
      h: 55,
      text: "DEL",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0xAD3C23,
      click_func: () => {
        removeCharacter(text_input);
      }
    })

    const KEY_A = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "a",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideABCButtons();
        addCharacter('a', text_input);
      }
    })

    const KEY_B = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "b",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideABCButtons();
        addCharacter('b', text_input);
      }
    })

    const KEY_C = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "c",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideABCButtons();
        addCharacter('c', text_input);
      }
    })

    const KEY_D = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "d",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideDEFButtons()
        addCharacter('d', text_input);
      }
    })

    const KEY_E = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "e",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideDEFButtons()
        addCharacter('e', text_input);
      }
    })

    const KEY_F = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "f",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideDEFButtons()
        addCharacter('f', text_input);
      }
    })

    const KEY_G = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "g",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideGHIButtons();
        addCharacter('g', text_input);
      }
    })

    const KEY_H = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "h",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideGHIButtons();
        addCharacter('h', text_input);
      }
    })

    const KEY_I = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "i",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideGHIButtons();
        addCharacter('i', text_input);
      }
    })

    const KEY_J = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "j",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideJKLButtons()
        addCharacter('j', text_input);
      }
    })

    const KEY_K = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "k",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideJKLButtons()
        addCharacter('k', text_input);
      }
    })

    const KEY_L = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "l",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideJKLButtons()
        addCharacter('l', text_input);
      }
    })

    const KEY_M = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "m",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideMNButtons()
        addCharacter('m', text_input);
      }
    })

    const KEY_N = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "n",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideMNButtons()
        addCharacter('n', text_input);
      }
    })

    const KEY_ENE = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "ñ",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideMNButtons()
        addCharacter('ñ', text_input);
      }
    })

    const KEY_O = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "o",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideOPQButtons();
        addCharacter('o', text_input);
      }
    })

    const KEY_P = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "p",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideOPQButtons();
        addCharacter('p', text_input);
      }
    })

    const KEY_Q = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "q",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideOPQButtons();
        addCharacter('q', text_input);
      }
    })

    const KEY_R = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "r",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideRSTButtons();
        addCharacter('r', text_input);
      }
    })

    const KEY_S = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "s",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideRSTButtons();
        addCharacter('s', text_input);
      }
    })

    const KEY_T = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "t",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideRSTButtons();
        addCharacter('t', text_input);
      }
    })

    const KEY_U = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "u",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideUVWButtons()
        addCharacter('u', text_input);
      }
    })

    const KEY_V = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "v",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideUVWButtons()
        addCharacter('v', text_input);
      }
    })

    const KEY_W = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "w",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideUVWButtons()
        addCharacter('w', text_input);
      }
    })

    const KEY_X = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "x",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideXYZButtons();
        addCharacter('x', text_input);
      }
    })

    const KEY_Y = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "y",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideXYZButtons();
        addCharacter('y', text_input);
      }
    })

    const KEY_Z = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "z",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideXYZButtons();
        addCharacter('z', text_input);
      }
    })

    //Numeric keys 

    const KEY_ONE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "1",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('1', text_input);
      }
    })

    const KEY_TWO = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "2",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('2', text_input);
      }
    })

    const KEY_THREE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: '3',
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('3', text_input);
      }
    })

    const KEY_FOUR = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "4",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('4', text_input);
      }
    })

    const KEY_FIVE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "5",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('5', text_input);
      }
    })

    const KEY_SIX = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "6",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('6', text_input);
      }
    })

    const KEY_SEVEN = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "7",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('7', text_input);
      }
    })

    const KEY_EIGHT = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "8",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('8', text_input);
      }
    })

    const KEY_NINE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "9",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('9', text_input);
      }
    })

    const KEY_ZERO = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "0",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('0', text_input);
      }
    })

    //Symbols keys 

    const KEY_EXCLAMATION = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "!",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('!', text_input);
      }
    })

    const KEY_AT = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "@",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('@', text_input);
      }
    })

    const KEY_NUMBER_SIGN = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: '#',
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('#', text_input);
      }
    })

    const KEY_MONEY = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "$",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('$', text_input);
      }
    })

    const KEY_PERCENT = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "%",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('%', text_input);
      }
    })

    const KEY_QUESTION = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "?",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('?', text_input);
      }
    })

    const KEY_AMPERSAND = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "&",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('&', text_input);
      }
    })

    const KEY_OPEN_PARENTHESIS = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "(",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('(', text_input);
      }
    })

    const KEY_CLOSE_PARENTHESIS = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: ")",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter(')', text_input);
      }
    })

    const KEY_SLASH = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "/",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('/', text_input);
      }
    })
    const yB = GROUP_EVENTS.createWidget(widget.IMG, {
      x: 0,
      y: 400,
      src: "y.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      if (text_value.length > 0) {
        Data.Events.push(text_value)
        Data.Done.push("undone")
        writeFile("task_keySch", Data)
        replace({ url: `pages/Events`, param: '...' })
      } else {
        showToast({
          content: "You must write unless one character."
        })
      }
    })
    const nB = GROUP_EVENTS.createWidget(widget.IMG, {
      x: 195,
      y: 400,
      src: "n.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      setScrollLock({
        lock: false,
      })
      GROUP_NUMERIC.setProperty(prop.VISIBLE, false)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
      GROUP_SYMBOLS.setProperty(prop.VISIBLE, false)
      GROUP_ALPHABET.setProperty(prop.VISIBLE, false)
      GROUP_LETTERS.setProperty(prop.VISIBLE, false)
      GROUP_EVENTS.setProperty(prop.VISIBLE, false)
      KEY_DEL.setProperty(prop.VISIBLE, false)
      KEY_SPACE.setProperty(prop.VISIBLE, false)
    })

    //hide all the groups that contains the individual letter and numeric keys
    hideAllLettersButtons()
    GROUP_NUMERIC.setProperty(prop.VISIBLE, false)
    KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
    GROUP_SYMBOLS.setProperty(prop.VISIBLE, false)
    GROUP_ALPHABET.setProperty(prop.VISIBLE, false)
    GROUP_LETTERS.setProperty(prop.VISIBLE, false)
    GROUP_EVENTS.setProperty(prop.VISIBLE, false)
    KEY_DEL.setProperty(prop.VISIBLE, false)
    KEY_SPACE.setProperty(prop.VISIBLE, false)
    function hideABCButtons() {
      KEY_A.setProperty(prop.VISIBLE, false)
      KEY_B.setProperty(prop.VISIBLE, false)
      KEY_C.setProperty(prop.VISIBLE, false)
    }

    function showABCButtons() {
      KEY_A.setProperty(prop.VISIBLE, true)
      KEY_B.setProperty(prop.VISIBLE, true)
      KEY_C.setProperty(prop.VISIBLE, true)
    }

    function hideABCButtons() {
      KEY_A.setProperty(prop.VISIBLE, false)
      KEY_B.setProperty(prop.VISIBLE, false)
      KEY_C.setProperty(prop.VISIBLE, false)
    }

    function showDEFButtons() {
      KEY_D.setProperty(prop.VISIBLE, true)
      KEY_E.setProperty(prop.VISIBLE, true)
      KEY_F.setProperty(prop.VISIBLE, true)
    }

    function hideDEFButtons() {
      KEY_D.setProperty(prop.VISIBLE, false)
      KEY_E.setProperty(prop.VISIBLE, false)
      KEY_F.setProperty(prop.VISIBLE, false)
    }

    function showGHIButtons() {
      KEY_G.setProperty(prop.VISIBLE, true)
      KEY_H.setProperty(prop.VISIBLE, true)
      KEY_I.setProperty(prop.VISIBLE, true)
    }

    function hideGHIButtons() {
      KEY_G.setProperty(prop.VISIBLE, false)
      KEY_H.setProperty(prop.VISIBLE, false)
      KEY_I.setProperty(prop.VISIBLE, false)
    }

    function showJKLButtons() {
      KEY_J.setProperty(prop.VISIBLE, true)
      KEY_K.setProperty(prop.VISIBLE, true)
      KEY_L.setProperty(prop.VISIBLE, true)
    }

    function hideJKLButtons() {
      KEY_J.setProperty(prop.VISIBLE, false)
      KEY_K.setProperty(prop.VISIBLE, false)
      KEY_L.setProperty(prop.VISIBLE, false)
    }

    function showMNButtons() {
      KEY_M.setProperty(prop.VISIBLE, true)
      KEY_N.setProperty(prop.VISIBLE, true)
      KEY_ENE.setProperty(prop.VISIBLE, true)
    }

    function hideMNButtons() {
      KEY_M.setProperty(prop.VISIBLE, false)
      KEY_N.setProperty(prop.VISIBLE, false)
      KEY_ENE.setProperty(prop.VISIBLE, false)
    }

    function showOPQButtons() {
      KEY_O.setProperty(prop.VISIBLE, true)
      KEY_P.setProperty(prop.VISIBLE, true)
      KEY_Q.setProperty(prop.VISIBLE, true)
    }

    function hideOPQButtons() {
      KEY_O.setProperty(prop.VISIBLE, false)
      KEY_P.setProperty(prop.VISIBLE, false)
      KEY_Q.setProperty(prop.VISIBLE, false)
    }

    function showRSTButtons() {
      KEY_R.setProperty(prop.VISIBLE, true)
      KEY_S.setProperty(prop.VISIBLE, true)
      KEY_T.setProperty(prop.VISIBLE, true)
    }

    function hideRSTButtons() {
      KEY_R.setProperty(prop.VISIBLE, false)
      KEY_S.setProperty(prop.VISIBLE, false)
      KEY_T.setProperty(prop.VISIBLE, false)
    }

    function showUVWButtons() {
      KEY_U.setProperty(prop.VISIBLE, true)
      KEY_V.setProperty(prop.VISIBLE, true)
      KEY_W.setProperty(prop.VISIBLE, true)
    }

    function hideUVWButtons() {
      KEY_U.setProperty(prop.VISIBLE, false)
      KEY_V.setProperty(prop.VISIBLE, false)
      KEY_W.setProperty(prop.VISIBLE, false)
    }

    function showXYZButtons() {
      KEY_X.setProperty(prop.VISIBLE, true)
      KEY_Y.setProperty(prop.VISIBLE, true)
      KEY_Z.setProperty(prop.VISIBLE, true)
    }

    function hideXYZButtons() {
      KEY_X.setProperty(prop.VISIBLE, false)
      KEY_Y.setProperty(prop.VISIBLE, false)
      KEY_Z.setProperty(prop.VISIBLE, false)
    }

    function hideAllLettersButtons() {
      hideABCButtons()
      hideDEFButtons()
      hideGHIButtons()
      hideJKLButtons()
      hideMNButtons()
      hideOPQButtons()
      hideRSTButtons()
      hideUVWButtons()
      hideXYZButtons()
    }

    function setKeysUpperCase(_start_y) {

      KEY_ABC.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "ABC",
        text_size: 20
      })

      KEY_DEF.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "DEF",
        text_size: 20,
      })

      KEY_GHI.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: 'GHI',
        text_size: 20,
      })

      KEY_JKL.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "JKL",
        text_size: 20
      })

      KEY_MN.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "MNÑ",
        text_size: 20,
      })

      KEY_OPQ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: 'OPQ',
        text_size: 20,
      })

      KEY_RST.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "RST",
        text_size: 20
      })

      KEY_UVW.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "UVW",
        text_size: 20,
      })

      KEY_XYZ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: 'XYZ',
        text_size: 20,
      })

      KEY_A.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "A",
        text_size: 20,
      })

      KEY_B.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "B",
        text_size: 20,
      })

      KEY_C.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "C",
        text_size: 20,
      })

      KEY_D.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "D",
        text_size: 20,
      })

      KEY_E.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "E",
        text_size: 20,
      })

      KEY_F.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "F",
        text_size: 20,
      })

      KEY_G.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "G",
        text_size: 20,
      })

      KEY_H.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "H",
        text_size: 20,
      })

      KEY_I.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "I",
        text_size: 20,
      })

      KEY_J.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "J",
        text_size: 20,
      })

      KEY_K.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "K",
        text_size: 20,
      })

      KEY_L.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "L",
        text_size: 20,
      })

      KEY_M.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "M",
        text_size: 20,
      })

      KEY_N.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "N",
        text_size: 20,
      })

      KEY_ENE.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "Ñ",
        text_size: 20,
      })

      KEY_O.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "O",
        text_size: 20,
      })

      KEY_P.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "P",
        text_size: 20,
      })

      KEY_Q.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "Q",
        text_size: 20,
      })

      KEY_R.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "R",
        text_size: 20,
      })

      KEY_S.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "S",
        text_size: 20,
      })

      KEY_T.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "T",
        text_size: 20,
      })

      KEY_U.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "U",
        text_size: 20,
      })

      KEY_V.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "V",
        text_size: 20,
      })

      KEY_W.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "W",
        text_size: 20,
      })

      KEY_X.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "X",
        text_size: 20,
      })

      KEY_Y.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "Y",
        text_size: 20,
      })

      KEY_Z.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "Z",
        text_size: 20,
      })
    }

    function setKeysLowerCase(_start_y) {

      KEY_ABC.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "abc",
        text_size: 20,
      })

      KEY_DEF.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "def",
        text_size: 20,
      })

      KEY_GHI.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: 'ghi',
        text_size: 20,
      })

      KEY_JKL.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "jkl",
        text_size: 20,
      })

      KEY_MN.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "mnñ",
        text_size: 20,
      })

      KEY_OPQ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: 'opq',
        text_size: 20,
      })

      KEY_RST.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "rst",
        text_size: 20,
      })

      KEY_UVW.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "uvw",
        text_size: 20,
      })

      KEY_XYZ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: 'xyz',
        text_size: 20,
      })

      KEY_A.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "a",
        text_size: 20,
      })

      KEY_B.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "b",
        text_size: 20,
      })

      KEY_C.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "c",
        text_size: 20,
      })

      KEY_D.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "d",
        text_size: 20,
      })

      KEY_E.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "e",
        text_size: 20,
      })

      KEY_F.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "f",
        text_size: 20,
      })

      KEY_G.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "g",
        text_size: 20,
      })

      KEY_H.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "h",
        text_size: 20,
      })

      KEY_I.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "i",
        text_size: 20,
      })

      KEY_J.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "j",
        text_size: 20,
      })

      KEY_K.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "k",
        text_size: 20,
      })

      KEY_L.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "l",
        text_size: 20,
      })

      KEY_M.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "m",
        text_size: 20,
      })

      KEY_N.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "n",
        text_size: 20,
      })

      KEY_ENE.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "ñ",
        text_size: 20,
      })

      KEY_O.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "o",
        text_size: 20,
      })

      KEY_P.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "p",
        text_size: 20,
      })

      KEY_Q.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "q",
        text_size: 20,
      })

      KEY_R.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "r",
        text_size: 20,
      })

      KEY_S.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "s",
        text_size: 20,
      })

      KEY_T.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "t",
        text_size: 20,
      })

      KEY_U.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "u",
        text_size: 20,
      })

      KEY_V.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "v",
        text_size: 20,
      })

      KEY_W.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "w",
        text_size: 20,
      })

      KEY_X.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "x",
        text_size: 20,
      })

      KEY_Y.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "y",
        text_size: 20,
      })

      KEY_Z.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "z",
        text_size: 20,
      })
    }

    function showNumericsButon() {
      GROUP_LETTERS.setProperty(prop.VISIBLE, false)
      GROUP_NUMERIC.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, true)

    }

    function hideNumericsButon() {
      GROUP_NUMERIC.setProperty(prop.VISIBLE, false)
      GROUP_LETTERS.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
    }

    function showSymbolsButon() {
      GROUP_LETTERS.setProperty(prop.VISIBLE, false)
      GROUP_SYMBOLS.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, true)

    }

    function hideSymbolsButon() {
      GROUP_SYMBOLS.setProperty(prop.VISIBLE, false)
      GROUP_LETTERS.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
    }

    let comparative = ""
    //events
    function addCharacter(_value, text_input) {

      vibrate.stop()
      vibrate.scene = 24
      vibrate.start()
      if (comparative.length < 51) {
        //if CAP key is enabled the letter will be in capital otherwise lower case
        isKeyCapPressed || text_value.length == 0 ? text_value += _value.toUpperCase() : text_value += _value;
        isKeyCapPressed || comparative.length == 0 ? comparative += _value.toUpperCase() : comparative += _value;
        if (comparative.length % 17 == 0 && comparative.length != 0) {
          text_value += "\n"
        }
        text_input.setProperty(prop.MORE, {
          text: text_value,
        })
      } else {
        showToast({
          content: "You can´t add more than 50 characters."//, actuales: " + text_value.length + "."
        })
      }
    }
    function removeCharacter(text_input) {

      vibrate.stop()
      vibrate.scene = 24
      vibrate.start()

      text_value = text_value.slice(0, -1);

      text_input.setProperty(prop.MORE, {
        text: text_value,
      })
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

    vibrate && vibrate.stop()
  },
});