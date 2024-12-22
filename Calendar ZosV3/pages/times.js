import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, text_style, event, getTextLayout, deleteWidget } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { offGesture } from '@zos/interaction'
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


    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ]
    var init = 30
    var initT = [
      [0, 8, 3, 0],
      [0, 8, 3, 0],
      [0, 8, 3, 0],
      [0, 8, 3, 0],
      [0, 8, 3, 0]
    ]
    var initT2 = [
      [0, 0, 5, 5],
      [0, 0, 5, 5],
      [0, 0, 5, 5],
      [0, 0, 5, 5],
      [0, 0, 5, 5]
    ]
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390 * 5,
      h: 450,
      color: themeBG,
      radius: 0
    })
    var minus = 30
    var widgetArray = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    var widgetArray2 = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    var sTimeHour = [
      [],
      [],
      [],
      [],
      []
    ]
    var sTimeMin = [
      [],
      [],
      [],
      [],
      []
    ]
    for (let i = 0; i < 5; i++) {
      const { width, height } = getTextLayout(days[i], {
        text_size: 26,
        text_width: 0,
        wrapped: 0
      })
      createWidget(widget.FILL_RECT, {
        x: 390 * i,
        y: 0,
        w: 390,
        h: init,
        color: themeUI,
        radius: 0
      })
      createWidget(widget.TEXT, {
        x: (390 / 2 - width / 2) + 390 * i,
        y: -5,
        w: 390,
        h: init + 3,
        color: themeSec,
        text_size: 26,
        text: days[i]
      })
      createWidget(widget.TEXT, {
        x: 25 + 390 * i,
        y: 20,
        w: 390,
        h: 60,
        color: themePrim,
        text_size: 50,
        text: "Start:"
      })
      for (let j = 0; j < 4; j++) {
        var k = 70;
        var p = 0;

        if (j == 2) k = 90;
        if (j == 3) p = 40;

        widgetArray[i][j] = createWidget(widget.TEXT, {
          x: (390 * i) + 35 + p + k * j,
          y: 135 - minus,
          text_size: 120,
          color: themePrim,
          text: initT[i][j]
        });
        createWidget(widget.TEXT, {
          x: 178 + 390 * i,
          y: 125 - minus,
          w: 30,
          text_size: 120,
          color: themePrim,
          text: ":"
        });

        createWidget(widget.IMG, {
          x: (390 * i) + 35 + p + k * j + 9,
          y: 120 - minus,
          src: "plus.png"
        }).addEventListener(event.CLICK_DOWN, (info) => {
          if (sTimeHour[i].length < 1 && sTimeMin[i].length < 1) {
            initT[i][j]++;

            if (j == 0 && initT[i][j] > 2) {
              initT[i][j] = 0;
            } else if (j == 1) {
              if (initT[i][0] == 2 && initT[i][j] > 3) {
                initT[i][j] = 0;
              } else if (initT[i][j] > 9) {
                initT[i][j] = 0;
              }
            } else if (j == 2 && initT[i][j] > 5) {
              initT[i][j] = 0;
            } else if (j == 3 && initT[i][j] > 9) {
              initT[i][j] = 0;
            }

            if (initT[i][0] == 2 && initT[i][1] > 3) {
              initT[i][1] = 3;
              widgetArray[i][1].setProperty(prop.MORE, {
                text: initT[i][1]
              });
            }

            widgetArray[i][j].setProperty(prop.MORE, {
              text: initT[i][j]
            });
          } else {
            showToast({
              content: "Delete all elements from " + days[i] + " to modify start hour."
            })
          }
        });

        createWidget(widget.IMG, {
          x: (390 * i) + 35 + p + k * j + 9,
          y: 280 - minus,
          src: "less.png"
        }).addEventListener(event.CLICK_DOWN, (info) => {
          if (sTimeHour[i].length < 1 && sTimeMin[i].length < 1) {
            initT[i][j]--;

            if (j == 0 && initT[i][j] < 0) {
              initT[i][j] = 2;
            } else if (j == 1) {
              if (initT[i][0] == 2 && initT[i][j] < 0) {
                initT[i][j] = 3;
              } else if (initT[i][j] < 0) {
                initT[i][j] = 9;
              }
            } else if (j == 2 && initT[i][j] < 0) {
              initT[i][j] = 5;
            } else if (j == 3 && initT[i][j] < 0) {
              initT[i][j] = 9;
            }

            if (initT[i][0] == 2 && initT[i][1] > 3) {
              initT[i][1] = 3;
              widgetArray[i][1].setProperty(prop.MORE, {
                text: initT[i][1]
              });
            }

            widgetArray[i][j].setProperty(prop.MORE, {
              text: initT[i][j]
            });
          } else {
            showToast({
              content: "Delete all elements from " + days[i] + " to modify start hour."
            })
          }
        });
      }
      createWidget(widget.TEXT, {
        x: 25 + 390 * i,
        y: 300,
        w: 390,
        h: 60,
        color: themePrim,
        text_size: 30,
        text: "Duration:"
      })
      for (let j = 0; j < 4; j++) {
        let minus = -195
        var k = 37;
        var p = 0;
        var f = 90
        var q = 33
        if (j == 2) k = 44;
        if (j == 3) p = 20;
        widgetArray2[i][j] = createWidget(widget.TEXT, {
          x: f + (390 * i) + 35 + p + k * j,
          y: 135 - minus,
          w: 34,
          text_size: 60,
          color: themePrim,
          text: j > 0 ? initT2[i][j] : ""
        });
        createWidget(widget.TEXT, {
          x: (f + 295) / 2 + 390 * i,
          y: 130 - minus,
          w: 13,
          text_size: 60,
          color: themePrim,
          text: ":"
        });
        if (j > 0) {
          createWidget(widget.IMG, {
            x: f + (390 * i) + 25 + p + k * j + 9,
            y: 115 - minus,
            src: "plusS.png"
          }).addEventListener(event.CLICK_DOWN, (info) => {
            initT2[i][j]++;

            if (j == 0 && initT2[i][j] > 9) {
              initT2[i][j] = 0;
            } else if (j == 1 && initT2[i][j] > 9) {
              initT2[i][j] = 0;
            } else if (j == 2 && initT2[i][j] > 5) {
              initT2[i][j] = 0;
            } else if (j == 3 && initT2[i][j] > 9) {
              initT2[i][j] = 0;
            }

            widgetArray2[i][j].setProperty(prop.MORE, {
              text: initT2[i][j]
            });
          });

          createWidget(widget.IMG, {
            x: f + (390 * i) + 25 + p + k * j + 9,
            y: 210 - minus,
            src: "lessS.png"
          }).addEventListener(event.CLICK_DOWN, (info) => {
            initT2[i][j]--;

            if (j == 0 && initT2[i][j] < 0) {
              initT2[i][j] = 9;
            } else if (j == 1 && initT2[i][j] < 0) {
              initT2[i][j] = 9;
            } else if (j == 2 && initT2[i][j] < 0) {
              initT2[i][j] = 5;
            } else if (j == 3 && initT2[i][j] < 0) {
              initT2[i][j] = 9;
            }

            widgetArray2[i][j].setProperty(prop.MORE, {
              text: initT2[i][j]
            });
          });
          createWidget(widget.IMG, {
            x: 295 + 390 * i,
            y: 35,
            src: "conf2.png"
          }).addEventListener(event.CLICK_DOWN, (info) => {
            renderSetSchedule(i)
          })
          createWidget(widget.IMG, {
            x: 25 + 390 * i,
            y: 115 - minus + q,
            src: "add.png"
          }).addEventListener(event.CLICK_DOWN, (info) => {
            let startHours = parseInt(initT[i][0].toString() + initT[i][1].toString());
            let startMinutes = parseInt(initT[i][2].toString() + initT[i][3].toString());
            let durationHours = parseInt(initT2[i][0].toString() + initT2[i][1].toString());
            let durationMinutes = parseInt(initT2[i][2].toString() + initT2[i][3].toString());
            if (sTimeHour[i].length === 0 && sTimeMin[i].length === 0) {

              sTimeHour[i].push(startHours);
              sTimeMin[i].push(startMinutes);
            } else {
              let lastHour = sTimeHour[i][sTimeHour[i].length - 1];
              let lastMin = sTimeMin[i][sTimeMin[i].length - 1];
              let newMinutes = lastMin + durationMinutes;
              let extraHours = Math.floor(newMinutes / 60);
              newMinutes = newMinutes % 60;

              let newHours = lastHour + durationHours + extraHours;
              if (newHours >= 24) newHours = newHours % 24;
              sTimeHour[i].push(newHours);
              sTimeMin[i].push(newMinutes);
            }
            let newMinutes = startMinutes + durationMinutes;
            let extraHours = Math.floor(newMinutes / 60);
            newMinutes = newMinutes % 60;

            let newHours = startHours + durationHours + extraHours;
            if (newHours >= 24) newHours = newHours % 24;
            var scheduleLog = ""
            for (let j = 0; j < sTimeHour[i].length; j++) {
              let hour = sTimeHour[i][j];
              let minute = sTimeMin[i][j];
              if (j == 0) {
                scheduleLog += `${hour}:${minute < 10 ? '0' + minute : minute}`;
              } else {
                scheduleLog += `, ${hour}:${minute < 10 ? '0' + minute : minute}`;
              }
            }
            showToast({
              content: days[i] + ": " + scheduleLog
            })
          });
          createWidget(widget.IMG, {
            x: 300 + 390 * i,
            y: 115 - minus + q,
            src: "bin.png"
          }).addEventListener(event.CLICK_DOWN, (info) => {
            deleteTime(i)
          })
        }
      }
    }
    /*for (let l = 0; l < 4; l++) {
      const next = createWidget(widget.IMG, {
        x: 390 * curI,
        y: 400,
        src: "y.png"
      })
      const cancel = createWidget(widget.IMG, {
        x: 390 * curI + 195,
        y: 400,
        src: "n.png"
      })
    }*/
    function renderSetSchedule(curI) {
      let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      let daysUnMOF = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      console.log("curI: " + curI);

      let modifArrMC = [...sTimeMin[curI]];
      let modifArrHC = [...sTimeHour[curI]];
      let curStartClass = [...initT[curI]];
      let curDurationClass = [...initT2[curI]];
      let modifArrM = sTimeMin.map(arr => [...arr]);
      let modifArrH = sTimeHour.map(arr => [...arr]);
      let StartClass = initT.map(arr => [...arr]);
      let DurationClass = initT2.map(arr => [...arr]);

      days.splice(curI, 1);
      modifArrM.splice(curI, 1);
      modifArrH.splice(curI, 1);
      StartClass.splice(curI, 1);
      DurationClass.splice(curI, 1);

      let ticks = [false, false, false, false];
      let ticksPng = [];
      let textsPng = [];
      let BG = createWidget(widget.FILL_RECT, {
        x: 390 * curI,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG
      });
      let rect = createWidget(widget.FILL_RECT, {
        x: 390 * curI,
        y: 0,
        w: 390,
        h: 60,
        color: themeUI,
        radius: 0
      });
      let addThis = createWidget(widget.TEXT, {
        x: 390 * curI + 20,
        y: 10,
        w: 350,
        h: 50,
        text: "Add this schedule to:",
        color: themeSec,
        text_size: 33
      });

      // Botón para confirmar
      let next = createWidget(widget.BUTTON, {
        x: 390 * curI,
        y: 400,
        w: 195,
        h: 50,
        text: "",
        normal_src: 'y.png',
        press_src: 'y.png',
        click_func: () => {
          let daysC = "";
          ticks.splice(curI, 0, false);
          for (let l = 0; l < 5; l++) {
            if (ticks[l] == true && l != curI) {
              console.log("happy");
              let log = daysC.length == 0 ? daysUnMOF[l] : `, ${daysUnMOF[l]}`;
              daysC += log;
              console.log(daysUnMOF[l]);
              sTimeHour[l] = [...modifArrHC];
              sTimeMin[l] = [...modifArrMC];
              initT[l] = [...curStartClass];
              initT2[l] = [...curDurationClass];

              for (let g = 0; g < 4; g++) {
                widgetArray[l][g].setProperty(prop.MORE, {
                  text: curStartClass[g],
                });
                widgetArray2[l][g].setProperty(prop.MORE, {
                  text: g > 0 ? curDurationClass[g] : "",
                });
              }
            }
            deleteWidget(ticksPng[l]);
            deleteWidget(textsPng[l]);
            showToast({
              content: `This schedule was added to: ${daysC}`
            });
          }
          next.setProperty(prop.VISIBLE, false);
          cancel.setProperty(prop.VISIBLE, false);
          deleteWidget(addThis);
          deleteWidget(rect);
          deleteWidget(BG);
        }
      });

      // Botón para cancelar
      let cancel = createWidget(widget.BUTTON, {
        x: 390 * curI + 195,
        y: 400,
        w: 195,
        h: 50,
        text: "",
        normal_src: 'n.png',
        press_src: 'n.png',
        click_func: () => {
          for (let l = 0; l < 4; l++) {
            deleteWidget(ticksPng[l]);
            deleteWidget(textsPng[l]);
          }
          next.setProperty(prop.VISIBLE, false);
          cancel.setProperty(prop.VISIBLE, false);
          deleteWidget(addThis);
          deleteWidget(rect);
          deleteWidget(BG);
        }
      });

      // Crear widgets para seleccionar días de la semana
      let cH = 80;
      for (let j = 0; j < 4; j++) {
        let tickPng = createWidget(widget.IMG, {
          x: 390 * curI + 20,
          y: 75 + cH * j,
          src: "unticked.png"
        });
        ticksPng.push(tickPng);

        let textPng = createWidget(widget.TEXT, {
          x: 390 * curI + 80,
          y: 75 + cH * j,
          w: 350,
          h: 50,
          text: days[j],
          color: themePrim,
          text_size: 33
        });
        textsPng.push(textPng);

        tickPng.addEventListener(event.CLICK_DOWN, () => {
          ticks[j] = !ticks[j];
          tickPng.setProperty(prop.MORE, {
            src: ticks[j] ? "ticked.png" : "unticked.png"
          });
        });
      }
    }
    createWidget(widget.FILL_RECT, {
      x: 390 * 5,
      y: 0,
      w: 24 * 390,
      h: 450,
      color: themeBG,
    })
    createWidget(widget.TEXT, {
      x: 390 * 5 + 20,
      y: 20,
      w: 300,
      h: 250,
      color: themePrim,
      text_size: 26,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: "If your schedule\nis configured\npress \"Next.\" button\nto continue."
    })
    var LunNumHour = [];
    var LunNumMin = [];
    var MarNumHour = [];
    var MarNumMin = [];
    var MieNumHour = [];
    var MieNumMin = [];
    var JueNumHour = [];
    var JueNumMin = [];
    var VieNumHour = [];
    var VieNumMin = [];

    createWidget(widget.BUTTON, {
      x: 390 * 5,
      y: 400,
      w: 390,
      h: 50,
      radius: 7,
      normal_color: themeUI,
      press_color: themeUI,
      color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
      text: 'Next.',
      click_func: () => {
        LunNumMin = []
        LunNumHour = []
        MarNumMin = []
        MarNumHour = []
        MieNumMin = []
        MieNumHour = []
        JueNumMin = []
        JueNumHour = []
        VieNumMin = []
        VieNumHour = []
        addTimesToArray(0, sTimeHour[0], sTimeMin[0])
        addTimesToArray(1, sTimeHour[1], sTimeMin[1])
        addTimesToArray(2, sTimeHour[2], sTimeMin[2])
        addTimesToArray(3, sTimeHour[3], sTimeMin[3])
        addTimesToArray(4, sTimeHour[4], sTimeMin[4])
        Config.LunNumMin = LunNumMin
        Config.MarNumMin = MarNumMin
        Config.MieNumMin = MieNumMin
        Config.JueNumMin = JueNumMin
        Config.VieNumMin = VieNumMin
        Config.LunNumHour = LunNumHour
        Config.MarNumHour = MarNumHour
        Config.MieNumHour = MieNumHour
        Config.JueNumHour = JueNumHour
        Config.VieNumHour = VieNumHour
        writeFile("conf_keySch", Config)
        push({ url: 'pages/schedule', param: '...' })
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
    function addTimesToArray(dayIndex, hoursArray, minutesArray) {
      const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'];
      const day = days[dayIndex];

      for (let i = 0; i < hoursArray.length; i++) {
        const newHours = hoursArray[i];
        const newMinutes = minutesArray[i];

        if (day === 'Lun') {
          LunNumHour.push(newHours);
          LunNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Mar') {
          MarNumHour.push(newHours);
          MarNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Mie') {
          MieNumHour.push(newHours);
          MieNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Jue') {
          JueNumHour.push(newHours);
          JueNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Vie') {
          VieNumHour.push(newHours);
          VieNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        }

        if (i === hoursArray.length - 1) {
          let durationHours = parseInt(initT2[dayIndex][0].toString() + initT2[dayIndex][1].toString());
          let durationMinutes = parseInt(initT2[dayIndex][2].toString() + initT2[dayIndex][3].toString());

          let finalMinutes = newMinutes + durationMinutes;
          let extraHours = Math.floor(finalMinutes / 60);
          finalMinutes = finalMinutes % 60;

          let finalHours = newHours + durationHours + extraHours;
          if (finalHours >= 24) finalHours = finalHours % 24;

          if (day === 'Lun') {
            Config.lastMinLun = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourLun = finalHours
          } else if (day === 'Mar') {
            Config.lastMinMar = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourMar = finalHours
          } else if (day === 'Mie') {
            Config.lastMinMie = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourMie = finalHours
          } else if (day === 'Jue') {
            Config.lastMinJue = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourJue = finalHours
          } else if (day === 'Vie') {
            Config.lastMinVie = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourVie = finalHours
          }
        }
      }
    }
    function deleteTime(i) {
      if (sTimeHour[i].length > 0) {
        if (sTimeHour[i].length === 2) {
          sTimeHour[i].pop();
          sTimeMin[i].pop();
          sTimeHour[i].pop();
          sTimeMin[i].pop();
        } else {
          sTimeHour[i].pop();
          sTimeMin[i].pop();
        }
        var scheduleLog = ""
        for (let j = 0; j < sTimeHour[i].length; j++) {
          let hour = sTimeHour[i][j];
          let minute = sTimeMin[i][j];
          if (j == 0) {
            scheduleLog += `${hour}:${minute < 10 ? '0' + minute : minute}`;
          } else {
            scheduleLog += `, ${hour}:${minute < 10 ? '0' + minute : minute}`;
          }
        }
        showToast({
          text: days[i] + ":" + scheduleLog
        })
      } else {
        showToast({
          content: "There are no elements to delete on: " + days[i]
        })
      }
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
    setScrollMode({
      mode: SCROLL_MODE_SWIPER_HORIZONTAL,
      options: {
        height: 390,
        count: 6,
      },
    })
  },
  onDestroy() {
    offGesture()

    vibrate && vibrate.stop()
  },
});