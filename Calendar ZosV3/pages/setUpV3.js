import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { onGesture, offGesture, GESTURE_RIGHT } from '@zos/interaction'
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL} from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    var jsonBase = readFile('task_keySch')

    var decodeJSON = jsonBase

    function decodeUint8Array(uint8array) {
      let decodedString = "";


      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
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
    let datesDisplay = []
    var time = new Time()
    function readFile(filename) {
      return localStorage.getItem(filename);
    }
    
    
    const sub = [
      "Arreglar jardín",
      "Asistir a reuniones",
      "Aspirar",
      "Ayudar a mi hijo",
      "Cenar",
      "Comer",
      "Cuidar mascotas",
      "Dar el biberón",
      "Desayunar",
      "Desinfectar casa",
      "Enviar informes",
      "Estudiar",
      "Fregar platos",
      "Hacer llamadas",
      "Hacer la cama",
      "Hacer la compra",
      "Hacer la comida",
      "Hacer listas",
      "Hacer reparaciones",
      "Limpiar",
      "Limpiar baños",
      "Limpiar nevera",
      "Organizar cuarto",
      "Pagar cuentas",
      "Planificar tareas",
      "Regar plantas",
      "Responder correos",
      "Repasar con mi hijo"
    ];
    var nextScreenX = 1
    var subY = 0
    var bools = []
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 24 * 390,
      h: 450,
      color: themeBG,
    })
    let idx = 0
    let number = 7
    let space = 45
    let organizedData = agrupate(sub)
    let groups = []
    let groups2 = []
    var showBools = 0
    function agrupate(data) {
      const result = [];
      let subarray = [];
      for (let sData of data) {
        subarray.push(sData);
        if (subarray.length % number === 0) {
          result.push(subarray);
          subarray = [];
        }
      }
      if (subarray.length > 0) result.push(subarray);
      return result;
    }
    
    for (let re = 0; re < sub.length; re++) {
      if (re % number === 0 && re !== 0) idx++;
    }
    
    for (let i = 0; i < number; i++) {
      let txt = createWidget(widget.TEXT, {
        x: 40 + 390,
        y: 7 + subY * space,
        w: 258,
        h: 33,
        text: sub[i],
        color: themePrim,
        text_size: 25,
      });
    
      let img = createWidget(widget.IMG, {
        x: 300 + 390,
        y: 7 + subY * space,
        src: "false.png",
      });
    
      groups.push(txt);
      groups2.push(img);
    
      img.addEventListener(event.CLICK_DOWN, () => {
        let boolIndex = i + showBools * number;
        bools[boolIndex] = !bools[boolIndex];
        img.setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
      });
      subY++;
    }
    
    if (idx > 0) {
      let preButton = createWidget(widget.BUTTON, {
        x: 390,
        y: 370,
        w: 390 / 2,
        h: 80,
        press_color: 0xe9efe8,
        normal_color: 0xd8ded7,
        color: themePrim,
        text_size: 33,
        text: 'Prev.',
        click_func: () => {
          showBools = Math.max(showBools - 1, 0);
          updatePage();
        },
      });
    
      let nextButton = createWidget(widget.BUTTON, {
        x: 390 + 390 / 2,
        y: 370,
        w: 390 / 2,
        h: 80,
        press_color: 0xe9efe8,
        normal_color: 0xd8ded7,
        color: themePrim,
        text_size: 33,
        text: 'Next.',
        click_func: () => {
          showBools = Math.min(showBools + 1, idx);
          updatePage();
        },
      });
    }
    
    function updatePage() {
      let text = organizedData[showBools];
      for (let qw = 0; qw < number; qw++) {
        let boolIndex = qw + showBools * number;
        if (text && text[qw] !== undefined && text[qw] !== "") {
          groups[qw].setProperty(prop.MORE, { text: text[qw] });
          groups2[qw].setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
    
          groups2[qw].removeEventListener(event.CLICK_DOWN, () => {});
          groups2[qw].addEventListener(event.CLICK_DOWN, () => {
            bools[boolIndex] = !bools[boolIndex];
            groups2[qw].setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
          });
        } else {
          groups[qw].setProperty(prop.MORE, { text: "" });
          groups2[qw].setProperty(prop.MORE, { src: ".png" });
          groups2[qw].removeEventListener(event.CLICK_DOWN, () => {});
        }
      }
    }

    createWidget(widget.TEXT, {
      x: 20,
      y: 20,
      w: 300,
      h: 270,
      color: themePrim,
      text_size: 26,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: "Desliza a la derecha para\nver todas las asignaturas.\nElige aquellas que tengas\ny presione el botón \"Next\"\npara continuar.\n\nO tan solo agregue\nla suya propia."
    })
    var userSub = []
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
        if (bools.indexOf(true) != -1) {
          for (let i = 0; i < sub.length; i++) {
            if (bools[i] == true) {
              userSub.push(sub[i])
            }
          }
          if (Config.customSubjects.length > 0) {
            for (let j = 0; j < Config.customSubjects.length; j++) {
              userSub.push(Config.customSubjects[j])
            }
          }
          Config.addedSubjects = userSub
          writeFile("conf_keySch", Config)
          push({ url: 'pages/times', param: '...' })
        } else {
          showToast({
            text: "Agregue al menos una asignatura\npara continuar."
          })
        }
      }
    })
    onGesture(function (event) {
      if (event == GESTURE_RIGHT) {
       offGesture()
        push({ url: 'pages/profSelect', param: '...' })
      }
    });
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
    setScrollMode({
      mode: SCROLL_MODE_SWIPER_HORIZONTAL,
      options: {
        height: 390,
        count: nextScreenX + 1,
      },
    })
  },
  onDestroy() {
   offGesture()
    hmFS.close("conf_keySch");
    hmFS.close("task_keySch");
    vibrate && vibrate.stop()
  },
});