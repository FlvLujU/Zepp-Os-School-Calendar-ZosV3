import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { onGesture, offGesture } from '@zos/interaction'
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL } from '@zos/page'
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
      "Biology",
      "Natural sciencies",
      "Social sciencies",
      "Technical drawing",
      "PE",
      "Art education",
      "Economy",
      "Philosophy",
      "Physics",
      "Physics and Chemistry",
      "French",
      "Geography",
      "Geography e History",
      "History",
      "English",
      "Computer Science",
      "Ancient languages",
      "Languaje",
      "Literature",
      "Maths",
      "Music",
      "Chemistry",
      "Religion",
      "Technology",
      "ICT"
    ];
    var nextScreenX = 1
    var bools = [];
    let subY = 0
    var textColors = []; // Para almacenar el estado de color de cada texto
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 24 * 390,
      h: 450,
      color: themeBG,
    });
    let idx = 0;
    let number = 8;
    let space = 45;
    let organizedData = agrupate(sub);
    let groups = [];
    let groups2 = [];
    var showBools = 0;

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
      bools[re] = false; // Inicializa el array bools
      textColors[re] = 0x000000; // Inicializa el color de texto a negro
    }
    for (let i = 0; i < Config.addedSubjects.length; i++) {
      let subject = Config.addedSubjects[i];
      let index = sub.indexOf(subject)
      bools[index] = true
    }
    for (let i = 0; i < number; i++) {

      let img = createWidget(widget.IMG, {
        x: 300 + 390,
        y: 7 + subY * space,
        src: "false.png",
      });
      let txt = createWidget(widget.TEXT, {
        x: 40 + 390,
        y: 7 + subY * space,
        w: 258,
        h: 33,
        text: sub[i],
        color: textColors[i], // Usa el color inicial
        text_size: 25,
      });

      groups2.push(img);
      groups.push(txt);

      img.addEventListener(event.CLICK_DOWN, () => {
        let boolIndex = i + showBools * number;
        bools[boolIndex] = !bools[boolIndex];
        img.setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
        if (bools[boolIndex] == false) {
          let textIndex = i + showBools * number;
          textColors[textIndex] = 0x000000
          txt.setProperty(prop.MORE, { color: textColors[boolIndex] });
        }
      });

      txt.addEventListener(event.CLICK_DOWN, () => {
        if (bools[i + showBools * number] == true) {
          let textIndex = i + showBools * number;
          // Alterna el color entre negro y azul
          textColors[textIndex] = textColors[textIndex] === 0x000000 ? 0x0090ff : 0x000000;
          txt.setProperty(prop.MORE, { color: textColors[textIndex] });
          showToast({
            content: "Changed."
          })
        } else {
          showToast({
            content: "First select the subject you want to change the type of."
          })
        }
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
    updatePage();
    function updatePage() {
      let text = organizedData[showBools];
      for (let qw = 0; qw < number; qw++) {
        let boolIndex = qw + showBools * number;
        if (text && text[qw] !== undefined && text[qw] !== "") {
          groups[qw].setProperty(prop.MORE, { text: text[qw], color: textColors[boolIndex] });
          groups2[qw].setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
          // Actualiza el color de texto

          groups2[qw].removeEventListener(event.CLICK_DOWN, () => { });
          groups2[qw].addEventListener(event.CLICK_DOWN, () => {
            bools[boolIndex] = !bools[boolIndex];
            groups2[qw].setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
            if (bools[boolIndex] == false) {
              let textIndex = qw + showBools * number;
              textColors[textIndex] = 0x000000
              groups[qw].setProperty(prop.MORE, { color: textColors[boolIndex] });
            }
          });
          groups[qw].removeEventListener(event.CLICK_DOWN, () => { });
          groups[qw].addEventListener(event.CLICK_DOWN, () => {
            if (bools[qw + showBools * number] == true) {
              let textIndex = qw + showBools * number;
              // Alterna el color entre negro y azul
              textColors[textIndex] = textColors[textIndex] === 0x000000 ? 0x0090ff : 0x000000;
              groups[qw].setProperty(prop.MORE, { color: textColors[textIndex] });
              showToast({
                content: "Changed."
              })
            } else {
              showToast({
                content: "First select the subject you want to change the type of."
              })
            }
          });
        } else {
          groups[qw].setProperty(prop.MORE, { text: "" });
          groups2[qw].setProperty(prop.MORE, { src: ".png" });
          groups[qw].removeEventListener(event.CLICK_DOWN, () => { });
          groups2[qw].removeEventListener(event.CLICK_DOWN, () => { });
        }
      }
    }


    createWidget(widget.TEXT, {
      x: 20,
      y: 5,
      w: 350,
      h: 380,
      color: themePrim,
      text_size: 18,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: "Slide right to\nsee all subjects.\nChoose the ones you have\nand press \"Next\"\ button\nto continue.\n\nOr just add your own one.\n\n\n\n\nPress the name of a subject\nto change the type of class.",
    })
    createWidget(widget.IMG, {
      x: 390 / 2 - 37,
      y: 235,
      src: "add.png"
    }).addEventListener(event.CLICK_DOWN, (info) => {
      push({ url: 'pages/write', param: '...' })
    })
    let infoRest = createWidget(widget.IMG, {
      x: 345,
      y: 325 + 6,
      src: "info.png"
    })
    infoRest.addEventListener(event.CLICK_DOWN, () => {
      let BG = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0xffffff
      })
      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 70,
        color: themeUI
      })
      let title = createWidget(widget.TEXT, {
        x: 0,
        y: 10,
        w: 390,
        h: 80,
        align_h: align.CENTER_H,
        text: "Class type:",
        text_size: 40,
        color: 0xffffff
      })
      let description = createWidget(widget.TEXT, {
        x: 10,
        y: 80,
        w: 370,
        h: 300,
        align_h: align.CENTER_H,
        text: "Mark it if you like\nthat class.\nThis will help you to see\nthe day in another way.",
        text_size: 24,
        color: 0x000000
      })
      let ok = createWidget(widget.IMG, {
        x: 0,
        y: 400,
        src: "yB.png"
      })
      ok.addEventListener(event.CLICK_DOWN, () => {
        ok.setProperty(prop.VISIBLE, false)
        description.setProperty(prop.VISIBLE, false)
        BG.setProperty(prop.VISIBLE, false)
        title.setProperty(prop.VISIBLE, false)
        UI.setProperty(prop.VISIBLE, false)
      })
    })
    onGesture(function (event) {
      if (event == GESTURE_RIGHT) {
        offGesture()
        push({ url: 'pages/profSelect', param: '...' })
      }
    });
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
          if (textColors.indexOf(0x0090ff) != -1) {
            for (let i = 0; i < sub.length; i++) {
              if (textColors[i] == 0x0090ff) {
                Config.RestSubjects.push(sub[i])
              }
            }
          }

          var gradesEnc = readFile('crit_keySch')
          //var gradesEncDec = decodeUint8Array(gradesEnc);
          var subjectWeights = gradesEnc
          var Grades = gradesEnc
          const subjectData = {
            examWeight: 70, // Peso por defecto para exámenes
            attitudeWeight: 10, // Peso por defecto para actitud
            taskWeight: 20, // Peso por defecto para tareas
            customWeight: 0, // Peso personalizado
            examComponents: [
              { name: "Examen 1", weight: 30, tag: 2 },
              { name: "Examen 2", weight: 70, tag: 2 },
            ]
          }

          for (let l = 0; l < userSub.length; l++) {
            let subC = userSub[l]
            if (!subjectWeights[subC]) {
              subjectWeights[subC] = {
                examWeight: subjectData.examWeight,
                attitudeWeight: subjectData.attitudeWeight,
                taskWeight: subjectData.taskWeight,
                customWeight: subjectData.customWeight,
                sizes: subjectData.examComponents
              };
            }
          }
          gradesEnc = subjectWeights
          Config.addedSubjects = userSub

          writeFile("conf_keySch", Config)
          writeFile("crit_keySch", gradesEnc)
          push({ url: 'pages/init', param: '...' })
        } else {
          showToast({
            content: "Add unless one subject\nto continue."
          })
        }
      }
    })
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

    vibrate && vibrate.stop()
  },
});