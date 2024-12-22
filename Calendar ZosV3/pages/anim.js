import { Time } from '@zos/sensor'
import { createWidget, widget, prop, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import {offGesture} from '@zos/interaction'
import { scrollTo, setScrollLock} from '@zos/page'
import { LocalStorage } from '@zos/storage'
import { set, REPEAT_ONCE } from '@zos/alarm'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
var alerted = false
var par
Page({
  state: {},
  onInit(params) {
    try{
    const paramsObj = JSON.parse(params)
    par = paramsObj
    const { alarmedWakeUp, type } = paramsObj
    alerted = alarmedWakeUp
    }catch(e){}
  },
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
      x: 150,
      y: 110,
      w: 0,
      h: 130 + 15,
      color: 0xee1907,
    })
    let img = createWidget(widget.IMG, {
      x: 390 / 2 - 50,
      y: 120,
      src: "anim/0.png"
    })
    let text1 = createWidget(widget.TEXT, {
      x: 390 / 2 - 50 - n,
      y: nY,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: m[time.getMonth() - 1].substring(0, 1)
    })
    let text2 = createWidget(widget.TEXT, {
      x: 390 / 2 - 50 + l - n,
      y: nY,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: m[time.getMonth() - 1].substring(1, 2)
    })
    let text3 = createWidget(widget.TEXT, {
      x: 390 / 2 - 50 + l * 2 - n,
      y: nY,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: m[time.getMonth() - 1].substring(2, 3)
    })
    let text4 = createWidget(widget.TEXT, {
      x: 390 / 2 - 50 + q - n,
      y: nY,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: psT.toString().length < 2 ? "0" : psT.toString().substring(0, 1)
    })
    let text5 = createWidget(widget.TEXT, {
      x: 390 / 2 - 50 + q + l - n,
      y: nY,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: psT.toString().length > 1 ? psT.toString().substring(1, 2) : psT.toString().substring(0, 1)
    })
    let rect = createWidget(widget.FILL_RECT, {
      x: 150,
      y: 185,
      w: 0,
      h: 15,
      color: 0xffffff,
    })
    let rectUI = createWidget(widget.FILL_RECT, {
      x: 500,
      y: 185,
      w: 0,
      h: 75,
      color: 0xdce8da,
    })
    let rectUI2 = createWidget(widget.FILL_RECT, {
      x: 590,
      y: 185 + 90,
      w: 0,
      h: 75,
      color: 0xdce8da,
    })
    let rectUI3 = createWidget(widget.FILL_RECT, {
      x: 550,
      y: 185 + 90 * 2,
      w: 0,
      h: 75,
      color: 0xdce8da,
    })
    let check = createWidget(widget.IMG, {
      x: 500,
      y: 185,
      src: "anim2/0.png"
    })
    let check2 = createWidget(widget.IMG, {
      x: 500,
      y: 275,
      src: "anim2/0.png"
    })
    let check3 = createWidget(widget.IMG, {
      x: 500,
      y: 365,
      src: "anim2/0.png"
    })
    let datesDisplay = []
    Config.remindMe1.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0]
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 1) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)
          console.log("O: " + reminder[fecha].tasks); // Muestra las tareas originales
          reminder[fecha].tasks = [];
          console.log("N: " + reminder[fecha].tasks); // Muestra las tareas después de la eliminación
    
          writeFile('conf_keySch', Config);
        }
      });
    });
    Config.remindMe3.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 3) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)
          console.log("O: " + reminder[fecha].tasks); // Muestra las tareas originales
          reminder[fecha].tasks = [];
          console.log("N: " + reminder[fecha].tasks); // Muestra las tareas después de la eliminación
          writeFile('conf_keySch', Config);
        }
      });
    });
    Config.remindMe7.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 7) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)
          console.log("O: " + reminder[fecha].tasks); // Muestra las tareas originales
          reminder[fecha].tasks = [];
          console.log("N: " + reminder[fecha].tasks); // Muestra las tareas después de la eliminación
          writeFile('conf_keySch', Config);
        }
      });
    });
    Config.remindMe15.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 15) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)
          console.log("O: " + reminder[fecha].tasks); // Muestra las tareas originales
          reminder[fecha].tasks = [];
          console.log("N: " + reminder[fecha].tasks); // Muestra las tareas después de la eliminación
          writeFile('conf_keySch', Config);
        }
      });
    });
    Config.remindMe30.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumM(fecha, 1) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)
          console.log("O: " + reminder[fecha].tasks); // Muestra las tareas originales
          reminder[fecha].tasks = [];
          console.log("N: " + reminder[fecha].tasks); // Muestra las tareas después de la eliminación
          writeFile('conf_keySch', Config);
        }
      });
    });
    Config.remindMe60.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumM(fecha, 2) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)
          console.log("O: " + reminder[fecha].tasks); // Muestra las tareas originales
          reminder[fecha].tasks = [];
          console.log("N: " + reminder[fecha].tasks); // Muestra las tareas después de la eliminación
          writeFile('conf_keySch', Config);
        }
      });
    });
    writeFile("")
    console.log("dates: " + datesDisplay)
    function sumD(fecha, dias) {
      let fechaObj = new Date(fecha);
      fechaObj.setDate(fechaObj.getDate() + dias);
      let nuevaFecha = fechaObj.toISOString().split('T')[0];
      return nuevaFecha;
    }
    function sumM(fecha, meses) {
      let fechaObj = new Date(fecha);
      fechaObj.setMonth(fechaObj.getMonth() + meses);
      let nuevaFecha = fechaObj.toISOString().split('T')[0];
      return nuevaFecha;
    }
    if (datesDisplay.length > 3) {
      
    }
    if (datesDisplay.length == 1) {
      check2.setProperty(prop.VISIBLE, false)
      check3.setProperty(prop.VISIBLE, false)
      rectUI2.setProperty(prop.VISIBLE, false)
      rectUI3.setProperty(prop.VISIBLE, false)
    }
    if (datesDisplay.length == 2) {
      check3.setProperty(prop.VISIBLE, false)
      rectUI3.setProperty(prop.VISIBLE, false)
    }
    
    let t = setInterval(function () {
      if (b < 16) {
        b++;
      } else {
        let h = setInterval(function () {
          if (xC > 25) {
            xC -= 8;
          } else {
            if (initS1 < 60) {
              initS1 += 4;
            }
            if (initS1 > 40) {
              if (initS2 < 60) {
                initS2 += 4;
              }
              if (initS2 > 40) {
                if (initS3 < 60) {
                  initS3 += 4;
                }
                if (initS3 > 40) {
                  if (initS4 < 60) {
                    initS4 += 4;
                  }
                  if (initS4 > 40) {
                    if (initS5 < 60) {
                      initS5 += 4;
                    }
                    if (initS5 > 40) {
                      if (rectW < 360) {
                        rectX -= 16;
                        rectW += 16;
                        rect.setProperty(prop.MORE, {
                          x: rectX,
                          y: 230,
                          w: rectW,
                          h: 15
                        });
                      } else {
                        if (rectW2 < 390) {
                          rectX2 -= 16;
                          rectW2 += 16;
                          rect2.setProperty(prop.MORE, {
                            x: rectX2,
                            y: 110,
                            w: rectW2,
                            h: 130 + 15
                          });
                        } else {
                          if (nY > 40) {
                            nY -= o;
                            let fnY = nY;
                            let ftnY = 65;
                            if (fnY < ftnY) {
                              fnY = ftnY;
                            }
                            rY -= o;
                            rY2 -= o;
                            rect2.setProperty(prop.MORE, {
                              x: rectX2,
                              y: rY2,
                              w: rectW2,
                              h: 130 + 15
                            });
                            rect.setProperty(prop.MORE, {
                              x: rectX,
                              y: rY,
                              w: rectW,
                              h: 15
                            });
                            text1.setProperty(prop.MORE, {
                              y: fnY
                            });
                            text2.setProperty(prop.MORE, {
                              y: fnY
                            });
                            text3.setProperty(prop.MORE, {
                              y: fnY
                            });
                            text4.setProperty(prop.MORE, {
                              y: fnY
                            });
                            text5.setProperty(prop.MORE, {
                              y: fnY
                            });
                            img.setProperty(prop.MORE, {
                              y: nY
                            });
                          } else {
                            if (rY2 > 0) {
                              rY2 -= o;
                              rH2 += o;
                              rect2.setProperty(prop.MORE, {
                                x: rectX2,
                                y: rY2,
                                w: rectW2,
                                h: 130 + 15 + rH2
                              });
                            } else {
                              let w1 = 0;
                              let w2 = 0;
                              let w3 = 0;
                              clearInterval(h); // Detener el intervalo h
                              let b = setInterval(function () {
                                let k = v;
                                if (v > 4) {
                                  k = 9 - v;
                                }
                                if (v < 10) {
                                  v++;
                                }
                                if (k < 0) {
                                  k = 0;
                                }
                                if (v > 6) {
                                  let f = z;
                                  if (z > 4) {
                                    f = 9 - z;
                                  }
                                  if (z < 10) {
                                    z++;
                                  }
                                  if (f < 0) {
                                    f = 0;
                                  }
                                  if (z > 6) {
                                    let w = d;
                                    if (d > 4) {
                                      w = 9 - d;
                                    }
                                    if (d < 10) {
                                      d++;
                                    }
                                    if (w < 0) {
                                      w = 0;
                                    }
                                    check3.setProperty(prop.MORE, {
                                      x: 24,
                                      src: "anim2/" + w + ".png"
                                    });
                                    if (w3 < 350) {
                                      w3 += 10;
                                    }
                                    if (w3 > 350) {
                                      w3 = 350;
                                      clearInterval(b); // Detener el intervalo b
                                    }
                                    rectUI3.setProperty(prop.MORE, {
                                      x: 20,
                                      y: 185 + 90 * 2 - e,
                                      w: w3,
                                      h: 75,
                                      radius: 11
                                    });
                                    write();
                                    maked = true;
                                  }
                                  check2.setProperty(prop.MORE, {
                                    x: 24,
                                    src: "anim2/" + f + ".png"
                                  });
                                  if (w2 < 350) {
                                    w2 += 10;
                                  }
                                  if (w2 > 350) {
                                    w2 = 350;
                                  }
                                  rectUI2.setProperty(prop.MORE, {
                                    x: 20,
                                    y: 185 + 90 - e,
                                    w: w2,
                                    h: 75,
                                    radius: 11
                                  });
                                }
                                check.setProperty(prop.MORE, {
                                  x: 24,
                                  src: "anim2/" + k + ".png"
                                });
                                if (w1 < 350) {
                                  w1 += 10;
                                }
                                if (w1 > 350) {
                                  w1 = 350;
                                }
                                rectUI.setProperty(prop.MORE, {
                                  x: 20,
                                  y: 185 - e,
                                  w: w1,
                                  h: 75,
                                  radius: 11
                                });
                              }, 4); // Intervalo de 4ms
                            }
                          }
                        }
                      }
                    }
                    text5.setProperty(prop.MORE, {
                      text_size: initS5
                    });
                  }
                  text4.setProperty(prop.MORE, {
                    text_size: initS4
                  });
                }
                text3.setProperty(prop.MORE, {
                  text_size: initS3
                });
              }
              text2.setProperty(prop.MORE, {
                text_size: initS2
              });
            }
            text1.setProperty(prop.MORE, {
              text_size: initS1
            });
          }
          img.setProperty(prop.MORE, {
            x: xC,
            src: "anim/" + b + ".png"
          });
        }, 4); // Intervalo de 4ms
        clearInterval(t); // Detener el intervalo t
      }
      img.setProperty(prop.MORE, {
        src: "anim/" + b + ".png"
      });
    }, 40); // Intervalo de 40ms
    
    
    let times = 0

    function executeTimer() {
      if (times < 7) {
        if (times === 0 || times === 2 || times === 4 || times === 6) {
          vibrate.stop();
          vibrate.scene = 9;
          vibrate.start();
        } else {
          vibrate.stop();
          vibrate.scene = 27;
          vibrate.start();
        }
        times++;
        setTimeout(executeTimer, 1300); // Llama nuevamente después de 1300 ms
      } else {
        vibrate.stop();
      }
    }
    
    //setTimeout(executeTimer, 1300);
    
    var string = 1
    function write() {
      if (datesDisplay.length > 0 && maked == false) {
        let refresh = createWidget(widget.IMG, {
          x: 390 - 100,
          y: 5,
          src: "refresh.png"
        }).addEventListener(event.CLICK_DOWN, (info) => {
          push({ url: 'pages/init', param: '...' })
        })
        let p = 0
        for (let i = 0; i < datesDisplay.length + 1; i++) {
          p = i
          if (i > 2 && i < datesDisplay.length) {
            let txt = datesDisplay[i].substring(0, datesDisplay[i].indexOf("!"))
            createWidget(widget.FILL_RECT, {
              x: 20,
              y: 180 + 90 * i,
              w: 350,
              h: 75,
              radius: 11,
              color: 0xdce8da,
            })
            createWidget(widget.IMG, {
              x: 24,
              y: 185 + 90 * i,
              src: "anim2/0.png"
            })
            createWidget(widget.TEXT, {
              x: 100,
              y: 180 + 90 * i, 
              w: 390 - 20,
              h: 80,
              color: 0x000000,
              text: txt, 
              text_size: 17
            })
          } else if (i < datesDisplay.length) {
            let txt = datesDisplay[i].substring(0, datesDisplay[i].indexOf("!"))
            createWidget(widget.TEXT, {
              x: 100,
              y: 180 + 90 * i, 
              w: 390 - 20,
              h: 80,
              color: 0x000000,
              text: txt, 
              text_size: 17
            })
          } else {
            if (alerted != true) {
              let al = createWidget(widget.IMG, {
                x: 390 / 2 - 100 / 2,
                y: 185 + 90 * i + 3,
                center_x: 50,
                center_y: 50,
                src: "alarm.png"
              })
              al.addEventListener(event.CLICK_DOWN, (info) => {
                scrollTo({
                  y: 0
                })
                setScrollLock({
                  lock: true,
                })
                createWidget(widget.FILL_RECT, {
                  x: 0,
                  y: 0,
                  w: 390,
                  h: 550,
                  color: themeBG,
                })
                let maskMonth = createWidget(widget.FILL_RECT, {
                  x: 0,
                  y: 0,
                  w: 390,
                  h: 70,
                  color: themeUI
                });
                createWidget(widget.TEXT, {
                  x: 50,
                  y: 20,
                  w: 390,
                  h: 450,
                  text_size: 26,
                  color: themePrim,
                  text: "Remember me on:"
                })
                let refresh = createWidget(widget.IMG, {
                  x: 390 - 100,
                  y: 5,
                  src: "refresh.png"
                }).addEventListener(event.CLICK_DOWN, (info) => {
                  push({ url: 'pages/Tasks', param: '...' })
                })
                const v = 110
                const p = 7
                const o = 170
                const j = 40
                var b1 = createWidget(widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j,
                  y: 0 - p + v,
                  w: 57,
                  h: 57,
                  src: "select.png"
                })
                var b2 = createWidget(widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j,
                  y: 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b3 = createWidget(widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j,
                  y: 57 + 40 + 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b4 = createWidget(widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j + o + 5 + 12,
                  y: 0 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b5 = createWidget(widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j + o + 5 + 12,
                  y: 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b6 = createWidget(widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j + o + 5 + 12,
                  y: 57 + 40 + 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                b1.addEventListener(event.CLICK_DOWN, (info) => {
                  b1.setProperty(prop.MORE, {
                    src: "select.png"
                  })
                  b2.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "1"
                })
                b2.addEventListener(event.CLICK_DOWN, (info) => {
                  b1.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(prop.MORE, {
                    src: "select.png"
                  })
                  b3.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "2"
                })
                b3.addEventListener(event.CLICK_DOWN, (info) => {
                  b1.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(prop.MORE, {
                    src: "select.png"
                  })
                  b4.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "3"
                })
                b4.addEventListener(event.CLICK_DOWN, (info) => {
                  b1.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(prop.MORE, {
                    src: "select.png"
                  })
                  b5.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "4"
                })
                b5.addEventListener(event.CLICK_DOWN, (info) => {
                  b1.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(prop.MORE, {
                    src: "select.png"
                  })
                  b6.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "5"
                })
                b6.addEventListener(event.CLICK_DOWN, (info) => {
                  b1.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(prop.MORE, {
                    src: "select.png"
                  })
                  string = "6"
                })
                var yR = 100
                createWidget(widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75,
                  y: yR,
                  w: 130,
                  h: 70,
                  text: "10 Mins",
                  text_size: 30,
                  color: themePrim
                })
                createWidget(widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75,
                  y: 57 + 40 + yR,
                  w: 130,
                  h: 70,
                  text: "30 Mins",
                  text_size: 30,
                  color: themePrim
                })
                createWidget(widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75,
                  y: 57 + 40 + 57 + 40 + yR,
                  w: 100,
                  h: 70,
                  text: "1 Hour",
                  text_size: 30,
                  color: themePrim
                })
                createWidget(widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75 + o + 5,
                  y: yR,
                  w: 255,
                  h: 70,
                  text: "2 Hours",
                  text_size: 30,
                  color: themePrim
                })
                createWidget(widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75 + o + 5,
                  y: 57 + 40 + yR,
                  w: 200,
                  h: 70,
                  text: "4 Hours",
                  text_size: 30,
                  color: themePrim
                })
                createWidget(widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75 + o + 5,
                  y: 57 + 40 + 57 + 40 + yR + 5,
                  w: 200,
                  h: 70,
                  text: "6 Hours",
                  text_size: 30,
                  color: themePrim
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
                    let time = 0
                    if (string == "1") {
                      time = 60 * 10
                    } else if (string == "2") {
                      time = 60 * 30
                    } else if (string == "3") {
                      time = 60 * 60
                    } else if (string == "4") {
                      time = 60 * 120
                    } else if (string == "5") {
                      time = 60 * 120 * 2
                    } else if (string == "6") {
                      time = 60 * 120 * 3
                    }
                    const options = {
                      url: 'pages/pass',
                      delay: time,
                      repeat_type: REPEAT_ONCE,
                    }
                    set(options)
                    push({url: "pages/init", params: "..."})
                  }
                })
              })
              let phases = [
                -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1
              ]
              if (i < 3) {
                let angleC = 0
                let h = 0
                let x;

                function executeTimer() {
                  angleC = angleC + phases[h] * 3;
                  if ((angleC < -40 && phases[h] < 0 && h < 16) || (angleC > 40 && phases[h] > 0 && h < 16)) {
                    h++;
                  } else if (h > 15) {
                    al.setProperty(prop.MORE, { angle: 0 });
                    return; // Termina la ejecución
                  }
                
                  al.setProperty(prop.MORE, { angle: angleC });
                  x = setTimeout(executeTimer, 6); // Llama nuevamente después de 6 ms
                }
                
                x = setTimeout(executeTimer, 6);
                
              }
              createWidget(widget.IMG, {
                x: 390 / 2 - 100 / 2,
                y: 185 + 90 * i + 115 + 20,
                src: ".png"
              })
            }
          }
        }
        p++
      }
    }
  },
  onDestroy() {
   offGesture()

    vibrate && vibrate.stop()
  },
});