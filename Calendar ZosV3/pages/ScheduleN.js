import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { offGesture } from '@zos/interaction'
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL, swipeToIndex } from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    var nl = 0
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





    var conf = readFile("conf_keySch")



    var Config = conf;
    var initMinute = [
      Config.LunNumMin,
      Config.MarNumMin,
      Config.MieNumMin,
      Config.JueNumMin,
      Config.VieNumMin
    ]
    var endMinute = [
      Config.LunNumMin,
      Config.MarNumMin,
      Config.MieNumMin,
      Config.JueNumMin,
      Config.VieNumMin
    ]
    var initHour = [
      Config.LunNumHour,
      Config.MarNumHour,
      Config.MieNumHour,
      Config.JueNumHour,
      Config.VieNumHour
    ]
    var endHour = [
      Config.LunNumHour,
      Config.MarNumHour,
      Config.MieNumHour,
      Config.JueNumHour,
      Config.VieNumHour
    ]

    var themeBG = Config.theme.bg;
    var themeUI = Config.theme.UI;
    var themePrim = Config.theme.primText;
    var themeSec = Config.theme.secText;
    var themeSlot = Config.theme.slot;
    var lang = Config.languaje;
    var remindMe = Config.remindMe;
    var dailyAppRemindMe = Config.dailyAppRemindMe;
    var profile = Config.profile;


    var LUN = Config.Schedule.Lun;
    var MAR = Config.Schedule.Mar;
    var MIE = Config.Schedule.Mie;
    var JUE = Config.Schedule.Jue;
    var VIE = Config.Schedule.Vie;
    const Calendar = [
      Config.Schedule.Lun,
      Config.Schedule.Mar,
      Config.Schedule.Mie,
      Config.Schedule.Jue,
      Config.Schedule.Vie,
    ]
    var subjectsUser = Config.addedSubjects;
    var customColors = Config.colors;

    let datesDisplay = [];
    var time = new Time();

    function readFile(filename) {
      return localStorage.getItem(filename);
    }




    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const darkerColors = [
      "0x96a29a", "0x8a928f", "0x858f8c", "0x7f8a87", "0x7e837f",
      "0x76807e", "0x6f6a69", "0x665f5e", "0x5e5a58", "0x5a4f4e",
      "0x52484a", "0x4e3f3d", "0x483534", "0x442b29", "0x422f2d",
      "0x3c2927"
    ];

    var times = [
      Config.LunNumMin,
      Config.MarNumMin,
      Config.MieNumMin,
      Config.JueNumMin,
      Config.VieNumMin
    ];

    var init = 30;
    var rects = [
      [], [], [], [], []
    ]
    var rectsD = [
      [], [], [], [], []
    ]
    var texts = [
      [], [], [], [], []
    ]
    let classIndexs = [
      [], [], [], [], []
    ];
    var scheduleArr = [
      new Array(times[0].length), new Array(times[1].length), new Array(times[2].length), new Array(times[3].length), new Array(times[4].length)
    ]

    if(!isArrayEmpty(Calendar)){
      scheduleArr = Calendar
    }
    var sub = Config.addedSubjects
    if (Config.profile != 3) {
      sub.push("Lunch");
      sub.push("Break");
      sub.push("Tutoring")
    }

    let globalClassCounter = 1;
    var undefDays = [];
    for (let z = 0; z < times.length; z++) {
      if (times[z].length == 0) {
        nl += 2;
        undefDays.push(z);
      } else {
      }
    }

    let omittedDays = 0;
    var showBools = []
    for (let qw = 0; qw < 5 - omittedDays; qw++) {
      showBools.push(0)
    }
    for (let i = 0; i < 5; i++) {

      if (undefDays.includes(i)) {

        omittedDays++;
        continue;
      }


      let p = (i - omittedDays) * 2;

      const { width, height } = getTextLayout(days[i], {
        text_size: 26,
        text_width: 0,
        wrapped: 0
      });

      createWidget(widget.FILL_RECT, {
        x: 390 + 390 * p,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG,
      });

      let idx = 0
      let number = 7
      let space = 45
      let subY = 0;
      let organizedData = agrupate(sub)
      let groups = [[], [], [], [], []]
      let groups2 = [[], [], [], [], []]


      for (let p = 0; p < number; p++) {
        let txt = createWidget(widget.TEXT, {
          x: 390 + 45 + (i - omittedDays) * 2 * 390,
          y: 7 + subY * space,
          w: 258,
          h: 33,
          text: sub[p],
          color: 0x000000,
          text_size: 25
        });

        let img = createWidget(widget.IMG, {
          x: 390 + 300 + (i - omittedDays) * 2 * 390,
          y: 7 + subY * space,
          src: sub[p] != undefined && sub[p] != "" ? "plusS.png" : ".png"
        });
        groups[i].push(txt)
        groups2[i].push(img)
        img.addEventListener(event.CLICK_DOWN, (info) => {
          if (texts[i] && texts[i][classIndexs[i]]) {
            texts[i][classIndexs[i]].setProperty(prop.MORE, {
              text: sub[p]
            });
            scheduleArr[i][classIndexs[i]] = sub[p];
          } else {
            showToast({
              content: "Select a class of schedule at " + days[i]
            });
          }
        });
        if (sub[p] == undefined && sub[p] == "") {
          img.removeEventListener(event.CLICK_DOWN, function (info) { })
        }
        subY++;
        //tolerated length = 10
      }
      for (let re = 0; re < sub.length; re++) {
        if (re % number == 0 && re != 0) {
          idx++
          //subY = 0
        }
        console.log("max: " + idx)
      }
      if (idx > 0) {
        let preButton = createWidget(widget.BUTTON, {
          x: 390 + (i - omittedDays) * 2 * 390,
          y: 450 - 80,
          w: 390 / 2,
          h: 80,
          press_color: 0xe9efe8,
          normal_color: 0xd8ded7,
          color: themePrim,
          text_size: 33,
          text: 'Prev.',
          click_func: () => {
            let max = idx
            showBools[i] -= 1
            if (showBools[i] < 0) {
              showBools[i] = 0
            }
            console.log("new-: " + showBools[i])
            console.log("l: " + groups[i][idx].length)
            let text = organizedData[showBools[i]]
            console.log("Text: " + text)
            for (let qw = 0; qw < number; qw++) {
              console.log("Text2: " + text[qw])
              groups[i][qw].setProperty(prop.MORE, {
                text: text[qw] != undefined && text[qw] != "" ? text[qw] : ""
              })
              if (text[qw] != undefined && text[qw] != "") {
                groups2[i][qw].setProperty(prop.MORE, {
                  src: "plusS.png"
                })
                groups2[i][qw].removeEventListener(event.CLICK_DOWN, function (info) { })
                groups2[i][qw].addEventListener(event.CLICK_DOWN, (info) => {
                  if (texts[i] && texts[i][classIndexs[i]]) {
                    texts[i][classIndexs[i]].setProperty(prop.MORE, {
                      text: text[qw]
                    });
                    scheduleArr[i][classIndexs[i]] = text[qw];
                  } else {
                    showToast({
                      content: "Select a class of schedule at " + days[i]
                    });
                  }
                });
              } else {
                groups2[i][qw].setProperty(prop.MORE, {
                  src: ".png"
                })
                groups2[i][qw].removeEventListener(event.CLICK_DOWN, function (info) { })
              }
            }
          }
        });
        let nextButton = createWidget(widget.BUTTON, {
          x: 390 + 390 / 2 + (i - omittedDays) * 2 * 390,
          y: 370,
          w: 390 / 2,
          h: 80,
          press_color: 0xe9efe8,
          normal_color: 0xd8ded7,
          color: themePrim,
          text_size: 33,
          text: 'Next.',
          click_func: () => {
            let max = idx
            showBools[i] += 1
            if (showBools[i] > max) {
              showBools[i] = max
            }
            console.log("l: " + max)
            console.log("new+: " + showBools[i])
            let text = organizedData[showBools[i]]
            console.log("Text: " + text)
            for (let qw = 0; qw < number; qw++) {
              console.log("Text2: " + text[qw])
              groups[i][qw].setProperty(prop.MORE, {
                text: text[qw] != undefined && text[qw] != "" ? text[qw] : ""
              })
              if (text[qw] != undefined && text[qw] != "") {
                groups2[i][qw].setProperty(prop.MORE, {
                  src: "plusS.png"
                })
                groups2[i][qw].removeEventListener(event.CLICK_DOWN, function (info) { })
                groups2[i][qw].addEventListener(event.CLICK_DOWN, (info) => {
                  if (texts[i] && texts[i][classIndexs[i]]) {
                    texts[i][classIndexs[i]].setProperty(prop.MORE, {
                      text: text[qw]
                    });
                    scheduleArr[i][classIndexs[i]] = text[qw];
                  } else {
                    showToast({
                      content: "Select a class in the schedule of: " + days[i]
                    });
                  }
                });
              } else {
                groups2[i][qw].setProperty(prop.MORE, {
                  src: ".png"
                })
                groups2[i][qw].removeEventListener(event.CLICK_DOWN, function (info) { })
              }
            }
          }
        });
      }
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
        if (subarray.length > 0) {
          result.push(subarray);
        }

        return result;
      }
      createWidget(widget.FILL_RECT, {
        x: 390 * p,
        y: 0,
        w: 390,
        h: init,
        color: themeUI,
        radius: 0
      });


      createWidget(widget.TEXT, {
        x: (390 / 2 - width / 2) + 390 * p,
        y: -5,
        w: 390,
        h: init + 3,
        color: themeSec,
        text_size: 26,
        text: days[i]
      });

      let rectHeight = (450 - init) / times[i].length;
      let rectSub = rectHeight;
      if (rectSub % 1 !== 0) {
        rectSub += 1;
      }
      let rectHeightd = 450 / times[i].length;
      let rectSubd = rectHeight;
      if (rectSubd % 1 !== 0) {
        rectSubd += 1;
      }
      for (let j = 0; j < times[i].length; j++) {
        let xP = 390 * p;
        let yP = init + rectHeight * j;
        let wP = 390 + 35;
        let hP = rectSub;
        let xPd = 390 * (p + 1);
        let yPd = rectHeightd * j;
        let wPd = 35;
        let hPd = rectSubd;
        var rect = createWidget(widget.FILL_RECT, {
          x: xP,
          y: yP,
          w: wP,
          h: hP,
          color: darkerColors[j]
        });
        var rectD = createWidget(widget.FILL_RECT, {
          x: xPd,
          y: yPd,
          w: wPd,
          h: hPd,
          color: darkerColors[j]
        });
        rects[i].push(rect);
        rectsD[i].push(rectD)

        let classNumber = globalClassCounter;
        globalClassCounter++;

        let text = createWidget(widget.TEXT, {
          x: 20 + 390 * p,
          y: init + rectHeight * j,
          w: 290,
          h: 100,
          text: Config.profile < 3 ? Calendar[i][j] == undefined || Calendar[i][j] == "" ? "Class " + classNumber : Calendar[i][j] : "Item " + classNumber,
          text_size: 27,
          color: themePrim
        });
        let time = createWidget(widget.TEXT, {
          x: 20 + 390 * p + 260,
          y: init + rectHeight * j,
          w: 390,
          h: 40,
          color: themePrim,
          text_size: 18,
          text: initHour[i][j] + ":" + initMinute[i][j] + " - " + get(endHour[i][j + 1], "h", i) + ":" + get(endMinute[i][j + 1], "m", i)
        })
        function get(arr, t, index) {
          if (arr == undefined || arr == "") {
            return getLast(t, index)
          } else {
            return arr
          }
        }
        function getLast(type, index) {
          if (type == "m") {
            if (index == 0) {
              return Config.lastMinLun
            } else if (index == 1) {
              return Config.lastMinMar
            } else if (index == 2) {
              return Config.lastMinMie
            } else if (index == 3) {
              return Config.lastMinJue
            } else if (index == 4) {
              return Config.lastMinVie
            }
          } else {
            if (type == "h") {
              if (index == 0) {
                return Config.lastHourLun
              } else if (index == 1) {
                return Config.lastHourMar
              } else if (index == 2) {
                return Config.lastHourMie
              } else if (index == 3) {
                return Config.lastHourJue
              } else if (index == 4) {
                return Config.lastHourVie
              }
            }
          }
        }
        texts[i].push(text);

        let l = j;
        rect.addEventListener(event.CLICK_DOWN, (info) => {
          classIndexs[i] = l;
          for (let j = 0; j < times[i].length; j++) {
            rects[i][j].setProperty(prop.MORE, {
              x: 390 * p,
              y: init + rectHeight * j,
              w: 390 + 35,
              h: rectSub,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
            rectsD[i][j].setProperty(prop.MORE, {
              x: 390 * (p + 1),
              y: rectHeightd * j,
              w: 35,
              h: rectSubd,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
          }
        });
        
        time.addEventListener(event.CLICK_DOWN, (info) => {
          classIndexs[i] = l;
          for (let j = 0; j < times[i].length; j++) {
            rects[i][j].setProperty(prop.MORE, {
              x: 390 * p,
              y: init + rectHeight * j,
              w: 390 + 35,
              h: rectSub,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
            rectsD[i][j].setProperty(prop.MORE, {
              x: 390 * (p + 1),
              y: rectHeightd * j,
              w: 35,
              h: rectSubd,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
          }
        });
        
        rectD.addEventListener(event.CLICK_DOWN, (info) => {
          classIndexs[i] = l;
          for (let j = 0; j < times[i].length; j++) {
            rects[i][j].setProperty(prop.MORE, {
              x: 390 * p,
              y: init + rectHeight * j,
              w: 390 + 35,
              h: rectSub,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
            rectsD[i][j].setProperty(prop.MORE, {
              x: 390 * (p + 1),
              y: rectHeightd * j,
              w: 35,
              h: rectSubd,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
          }
        });
        console.log("CALENDAR: " + Calendar)
        text.addEventListener(event.CLICK_DOWN, (info) => {
          classIndexs[i] = l;
          for (let j = 0; j < times[i].length; j++) {
            rects[i][j].setProperty(prop.MORE, {
              x: 390 * p,
              y: init + rectHeight * j,
              w: 390 + 35,
              h: rectSub,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
            rectsD[i][j].setProperty(prop.MORE, {
              x: 390 * (p + 1),
              y: rectHeightd * j,
              w: 35,
              h: rectSubd,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
          }
        });
      }
    }
    function isArrayEmpty(arr) {
      // Recorre cada elemento del array
      return arr.every(item => {
        // Si el elemento es un array, se llama a la función recursivamente
        if (Array.isArray(item)) {
          return isArrayEmpty(item);
        }
        // Verifica si el elemento es undefined
        return item === undefined;
      });
    }
    if (!isArrayEmpty(times)) {
      createWidget(widget.FILL_RECT, {
        x: 390 * (10 - nl),
        y: 0,
        w: 24 * 390,
        h: 450,
        color: themeBG,
      })
      createWidget(widget.TEXT, {
        x: 390 * (10 - nl) + 20,
        y: 20,
        w: 300,
        h: 250,
        color: themePrim,
        text_size: 26,
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text_style: text_style.NONE,
        text: "If schedule´s\nsubjects\nare configured\ncorrectly, press\nthe button \"Next\" \nto continue."
      })
      createWidget(widget.BUTTON, {
        x: 390 * (10 - nl),
        y: 400,
        w: 390,
        h: 50,
        radius: 7,
        normal_color: themeUI,
        press_color: themeUI,
        color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
        text: 'Next.',
        click_func: () => {
          if (checkUndefined(scheduleArr)) {
            Config.Schedule.Lun = scheduleArr[0]
            Config.Schedule.Mar = scheduleArr[1]
            Config.Schedule.Mie = scheduleArr[2]
            Config.Schedule.Jue = scheduleArr[3]
            Config.Schedule.Vie = scheduleArr[4]
            Config.new = false
            writeFile("conf_keySch", Config)
            push({
              url: 'pages/init',
              param: JSON.stringify({
                preview: true,
                type: 'normal'
              })
            })
          } else {
            showToast({
              content: "Make sure to assign a class for each hour in your schedule."
            })
          }
        }
      });
    } else {
      createWidget(widget.FILL_RECT, {
        x: 390 * (10 - nl),
        y: 0,
        w: 24 * 390,
        h: 450,
        color: themeBG,
      })
      createWidget(widget.TEXT, {
        x: 390 * (10 - nl) + 20,
        y: 20,
        w: 300,
        h: 250,
        color: themePrim,
        text_size: 26,
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text_style: text_style.NONE,
        text: "Time structure no added.\nChange it an then\ncome here again."
      })
      createWidget(widget.BUTTON, {
        x: 390 * (10 - nl),
        y: 400,
        w: 390,
        h: 50,
        radius: 7,
        normal_color: themeUI,
        press_color: themeUI,
        color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
        text: 'GO.',
        click_func: () => {
          push({
            url: 'pages/timesN',
            param: JSON.stringify({
              preview: true,
              type: 'normal'
            })
          })
        }
      });
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
    function checkUndefined(arr) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (arr[i][j] === undefined || arr[i][j] === "") {

            return false;
          }
        }
      }
      return true;
    }
    setScrollMode({
      mode: SCROLL_MODE_SWIPER_HORIZONTAL,
      options: {
        height: 390,
        count: (6 * 2 - 1) - nl,
      },
    })
    swipeToIndex({
      index: 0,
    })
  },

  onDestroy() {
    offGesture()

    vibrate && vibrate.stop()
  },
});