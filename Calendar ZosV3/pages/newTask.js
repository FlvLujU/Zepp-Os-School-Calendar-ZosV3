import { Time } from '@zos/sensor'
import { createWidget, widget, prop, event } from '@zos/ui'
import { Vibrator} from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { replace } from '@zos/router'
import { offGesture } from '@zos/interaction'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    setStatusBarVisible(false)
    var jsonBase = readFile('task_keySch')
    
    var decodeJSON = jsonBase
    
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
    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
    }
    const subjects = Config.addedSubjects
    //const subjectsJson = Config.addedSubjects.map(removeAccents);
    
    const docsTypes = [
      'task',
      'project',
      'exam'
    ]
    const docsTypesUp = [
      'Task',
      'Project',
      'Exam'
    ]
    function removeAccents(str) {
      const accents = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u'
      };

      return str.push(/[áéíóúÁÉÍÓÚàèìòùäëïöü]/g, match => accents[match] || match);
    }
    const subjectsDown = Config.addedSubjects
    function lower(str) {
        if (str.length > 0) {
          return str.charAt(0).toLowerCase() + str.slice(1);
        }
        return str; 
      }
      function upper(str) {
        if (str.length > 0) {
          
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return str; 
      }
    var count = 0
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG,
      radius: 7
    })
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 70,
      color: themeUI
    });
    let txt = createWidget(widget.TEXT, {
      x: 390 / 2 - 100,
      y: 10,
      w: 250,
      h: 70,
      text: subjects[count],
      text_size: 34,
      color: themeSec
    })
    createWidget(widget.BUTTON, {
      x: 10,
      y: 75,
      w: 70,
      h: 70,
      radius: 7,
      normal_color: themeUI,
      press_color: themeUI,
      color: themeSec,
      text_size: 38,
      text: '<',
      click_func: () => {
        count = count - 1
        if (count < 0) {
          count = subjects.length - 1
        }
        txt.setProperty(prop.MORE, {
          x: 390 / 2 - 100,
          w: 250,
          h: 70,
          text: subjects[count],
        })
      }
    })
    createWidget(widget.BUTTON, {
      x: 310,
      y: 75,
      w: 70,
      h: 70,
      radius: 7,
      normal_color: themeUI,
      press_color: themeUI,
      color: themeSec,
      text_size: 38,
      text: '>',
      click_func: () => {
        count = count + 1
        if (count > subjects.length - 1) {
          count = 0
        }
        txt.setProperty(prop.MORE, {
          x: 390 / 2 - 100,
          w: 250,
          h: 70,
          text: subjects[count],
        })
      }
    })

    var h = 145
    const radioGroup = createWidget(widget.RADIO_GROUP, {
      x: 0,
      y: 0,
      w: 480,
      h: 64,
      select_src: 'select.png',
      unselect_src: 'unselect.png',
      check_func: (group, index, checked) => {
        if (index == 3 && checked == true) {

        } else if (index == 1 && checked == true) {

          createWidget(widget.BUTTON, {
            x: 0,
            y: 400,
            w: 390,
            h: 50,
            radius: 7,
            normal_color: themeUI,
            press_color: themeUI,
            color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
            text: 'Next.',
            click_func: () => {
              createWidget(widget.FILL_RECT, {
                x: 0,
                y: 0,
                w: 390,
                h: 450,
                color: 0x000000,
                radius: 7
              })
              let maskMonth = createWidget(widget.FILL_RECT, {
                x: 0,
                y: 0,
                w: 390,
                h: 70,
                color: themeUI
              })
              let refresh = createWidget(widget.IMG, {
                x: 390 - 115,
                y: 5,
                src: "refresh.png"
              }).addEventListener(event.CLICK_DOWN, (info) => {
                replace({ url: 'pages/newTask', param: '...' })
              })
              let sig = createWidget(widget.TEXT, {
                x: 25,
                y: 20,
                w: 255,
                h: 70,
                text: subjectsDown[count] + " " + lower(docsTypesUp[index]) + ":",
                text_size: 23,
                color: themeSec
              })
              createWidget(widget.FILL_RECT, {
                x: 0,
                y: 70,
                w: 390,
                h: h + l,
                color: 0x000000
              })
              const pick_date_date = createWidget(widget.PICK_DATE)
              pick_date_date.setProperty(prop.MORE, {
                w: 300,
                h: h,
                x: 45,
                y: 70,
                font_size: 25,
                startYear: getDay("y") - 1,
                endYear: getDay("y") + 1,
                initYear: getDay("y"),
                initMonth: getDay("m"),
                initDay: getDay("d"),
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
                  const dateObj = pick_date_date.getProperty(prop.MORE, {})
                  const { year, month, day } = dateObj
                  let d = time.getDay()
                  let m = time.getMonth()
                  let h = time.getHours()
                  let min = time.getMinutes()
                  let sec = time.getSeconds()
                  if (d.length < 2) {
                    d = '0' + d
                  }
                  if (m.length < 2) {
                    m = '0' + m
                  }
                  if (h.length < 2) {
                    h = '0' + h
                  }
                  if (min.length < 2) {
                    min = '0' + min
                  }
                  if (sec.length < 2) {
                    sec = '0' + sec
                  }
                  addItem(subjects[count], docsTypes[index], `${subjects[count]} project.\nDeadline: ${day}/${month}/${year} !Creation date: \n${d}/${m}/${time.getFullYear()} ${h}:${min}:${sec}`, `${day}/${month}/${year}`)
                }
              })
            }
          })
        } else if (index == 2 && checked == true) {
          createWidget(widget.BUTTON, {
            x: 0,
            y: 400,
            w: 390,
            h: 50,
            radius: 7,
            normal_color: themeUI,
            press_color: themeUI,
            color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
            text: 'Next.',
            click_func: () => {
              let themePrim = "0xffffff"
              createWidget(widget.FILL_RECT, {
                x: 0,
                y: 0,
                w: 390,
                h: 450,
                color: 0x000000,
                radius: 7
              })
              let maskMonth = createWidget(widget.FILL_RECT, {
                x: 0,
                y: 0,
                w: 390,
                h: 70,
                color: themeUI
              });
              let refresh = createWidget(widget.IMG, {
                x: 390 - 115,
                y: 5,
                src: "refresh.png"
              }).addEventListener(event.CLICK_DOWN, (info) => {
                replace({ url: 'pages/newTask', param: '...' })
              })
              let sig = createWidget(widget.TEXT, {
                x: 25,
                y: 20,
                w: 255,
                h: 70,
                text: subjectsDown[count] + " " + lower(docsTypesUp[index]) + ":",
                text_size: 23,
                color: themeSec
              })
              createWidget(widget.FILL_RECT, {
                x: 0,
                y: 70,
                w: 390,
                h: h + l,
                color: 0x000000
              })
              const pick_date_date = createWidget(widget.PICK_DATE)
              pick_date_date.setProperty(prop.MORE, {
                w: 300,
                h: h,
                x: 45,
                y: 70,
                font_size: 25,
                startYear: getDay("y") - 1,
                endYear: getDay("y") + 1,
                initYear: getDay("y"),
                initMonth: getDay("m"),
                initDay: getDay("d"),
              })
              var typeStr = "midterm"
              createWidget(widget.TEXT, {
                x: 20,
                y: 250,
                w: 255,
                h: 70,
                text: "Type:",
                text_size: 55,
                color: 0x0390bd
              })
              var typeExam = createWidget(widget.TEXT, {
                x: 160,
                y: 250,
                w: 255,
                h: 70,
                text: "Midterm",
                text_size: 55,
                color: 0x0ec0f9
              })
              typeExam.addEventListener(event.CLICK_DOWN, (info) => {
                if (typeStr == "midterm") {
                  typeStr = "final"
                  typeExam.setProperty(prop.MORE, {
                    text: "Final"
                  })
                } else {
                  typeStr = "midterm"
                  typeExam.setProperty(prop.MORE, {
                    text: "Midterm"
                  })
                }
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
                  const dateObj = pick_date_date.getProperty(prop.MORE, {})
                  const { year, month, day } = dateObj
                  console.log('year', year)
                  console.log('month', month)
                  console.log('day', day)
                  let d = time.getDay()
                  let m = time.getMonth()
                  let h = time.getHours()
                  let min = time.getMinutes()
                  let sec = time.getSeconds()
                  if (d.length < 2) {
                    d = '0' + d
                  }
                  if (m.length < 2) {
                    m = '0' + m
                  }
                  if (h.length < 2) {
                    h = '0' + h
                  }
                  if (min.length < 2) {
                    min = '0' + min
                  }
                  if (sec.length < 2) {
                    sec = '0' + sec
                  }
                  addItem(subjects[count], docsTypes[index], `${subjects[count]} ${typeStr} exam.\nDate: ${day}/${month}/${year} !Creation date: \n${d}/${m}/${time.getFullYear()} ${h}:${min}:${sec}`, `${day}/${month}/${year}`)
                }
              })
            }
          })
        } else if (index == 0 && checked != true) {
          createWidget(widget.BUTTON, {
            x: 0,
            y: 400,
            w: 390,
            h: 50,
            radius: 7,
            normal_color: themeUI,
            press_color: themeUI,
            color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
            text: 'Next.',
            click_func: () => {
              let themePrim = "0xffffff"
              let pageCent = 1
              let pageDec = 2
              let pageUnit = 3
              let exDec = 1
              let exUnit = 2
              let ejsStr = ""
              createWidget(widget.FILL_RECT, {
                x: 0,
                y: 0,
                w: 390,
                h: 450,
                color: 0x000000,
                radius: 7
              })
              let refresh = createWidget(widget.IMG, {
                x: 390 - 115,
                y: 5,
                src: "refresh.png"
              }).addEventListener(event.CLICK_DOWN, (info) => {
                replace({ url: 'pages/newTask', param: '...' })
              })
              let ejsCount = 0
              let add = createWidget(widget.IMG, {
                x: 390 - 95,
                y: 278,
                src: "add.png"
              }).addEventListener(event.CLICK_DOWN, (info) => {
                console.log("DD")
                if (ejsCount < 8 && String(exDec) + String(exUnit) != "00") {
                  if (ejsStr.length > 0) {
                    ejsStr = ejsStr + ", "
                  }
                  console.log("AA")
                  ejsStr = ejsStr + supimreZero(String(exDec)) + String(exUnit)
                  showToast({
                    content: "Exercise added: " + ejsStr,
                  })
                  ejsCount++
                } else if (String(exDec) + String(exUnit) == "00" && ejsCount < 8) {
                  console.log("BB")
                  showToast({
                    content: "Exercises number\nmust be more than 0",
                  })
                } else {
                  showToast({
                    content: "You can´t add more exercises.",
                  })
                }
              })
              function supimreZero(num) {
                num = num.replace(/^0+/, '');
                return num;
              }
              let maskMonth = createWidget(widget.FILL_RECT, {
                x: 0,
                y: 0,
                w: 390,
                h: 70,
                color: themeUI
              })
              let sig = createWidget(widget.TEXT, {
                x: 25,
                y: 20,
                w: 255,
                h: 70,
                text: subjectsDown[count] + " " + lower(docsTypesUp[index]) + ":",
                text_size: 23,
                color: themeSec
              })
              createWidget(widget.FILL_RECT, {
                x: 0,
                y: 70,
                w: 390,
                h: h + l,
                color: 0x000000
              })
              const pick_date_date = createWidget(widget.PICK_DATE)
              pick_date_date.setProperty(prop.MORE, {
                w: 300,
                h: h - 40,
                x: 45,
                y: 60,
                font_size: 25,
                startYear: getDay("y") - 1,
                endYear: getDay("y") + 1,
                initYear: getDay("y"),
                initMonth: getDay("m"),
                initDay: getDay("d"),
              })
              let pageDesp = createWidget(widget.TEXT, {
                x: 20,
                y: 240,
                w: 250,
                h: 70,
                text: "Page: ",
                text_size: 45,
                color: themePrim
              })
              let pageCentText = createWidget(widget.TEXT, {
                x: 130 + 42,
                y: 240,
                w: 30,
                h: 70,
                text: pageCent,
                text_size: 50,
                color: themePrim
              })
              let pageDecText = createWidget(widget.TEXT, {
                x: 155 + 42,
                y: 240,
                w: 30,
                h: 70,
                text: pageDec,
                text_size: 50,
                color: themePrim
              })
              let pageUnitText = createWidget(widget.TEXT, {
                x: 180 + 42,
                y: 240,
                w: 30,
                h: 70,
                text: pageUnit,
                text_size: 50,
                color: themePrim
              })
              let exDesp = createWidget(widget.TEXT, {
                x: 20,
                y: 315,
                w: 60,
                h: 70,
                text: "Ex: ",
                text_size: 45,
                color: themePrim
              })
              let exDecText = createWidget(widget.TEXT, {
                x: 155 + 42,
                y: 315,
                w: 30,
                h: 70,
                text: exDec,
                text_size: 50,
                color: themePrim
              })
              let exUnitText = createWidget(widget.TEXT, {
                x: 180 + 42,
                y: 315,
                w: 30,
                h: 70,
                text: exUnit,
                text_size: 50,
                color: themePrim
              })
              pageCentText.addEventListener(event.CLICK_DOWN, (info) => {
                pageCent = pageCent + 1
                if (pageCent > 9) {
                  pageCent = 0
                }
                pageCentText.setProperty(prop.MORE, {
                  text: pageCent,
                  color: 0x0ec0f9
                })
                pageDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
              })
              pageDecText.addEventListener(event.CLICK_DOWN, (info) => {
                pageDec = pageDec + 1
                if (pageDec > 9) {
                  pageDec = 0
                  pageCent++
                  if (pageCent > 9) {
                    pageCent = 9
                  }
                  pageCentText.setProperty(prop.MORE, {
                    text: themePrim,
                  })
                }
                pageCentText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageDecText.setProperty(prop.MORE, {
                  text: pageDec,
                  color: 0x0ec0f9
                })
                pageUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
              })
              pageUnitText.addEventListener(event.CLICK_DOWN, (info) => {
                pageUnit = pageUnit + 1
                if (pageUnit > 9) {
                  pageUnit = 0
                }
                if (pageDec > 9) {
                  pageDec = 0
                }
                if (pageCent > 9) {
                  pageCent = 0
                }
                pageCentText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageUnitText.setProperty(prop.MORE, {
                  text: pageUnit,
                  color: 0x0ec0f9
                })
                exDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
              })
              exDecText.addEventListener(event.CLICK_DOWN, (info) => {
                exDec = exDec + 1
                if (exDec > 9) {
                  exDec = 0
                }
                pageCentText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exDecText.setProperty(prop.MORE, {
                  text: exDec,
                  color: 0x0ec0f9
                })
                exUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
              })
              exUnitText.addEventListener(event.CLICK_DOWN, (info) => {
                exUnit = exUnit + 1
                if (exUnit > 9) {
                  exUnit = 0
                }
                if (exDec > 9) {
                  exDec = 0
                }
                pageCentText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                pageUnitText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exDecText.setProperty(prop.MORE, {
                  color: themePrim
                })
                exUnitText.setProperty(prop.MORE, {
                  text: exUnit,
                  color: 0x0ec0f9
                })
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
                  if (ejsStr.length > 0 && String(pageCent) + String(pageDec) + String(pageUnit) != "000") {
                    const dateObj = pick_date_date.getProperty(prop.MORE, {})
                    const { year, month, day } = dateObj
                    let ejsAdd = ""
                    if (pageCent > 0) {
                      ejsAdd = String(pageCent) + String(pageDec) + String(pageUnit)
                    } else if (pageCent == 0) {
                      ejsAdd = ejsAdd + supimreZero(String(pageCent))
                      if (pageDec > 0) {
                        ejsAdd = ejsAdd + String(pageDec)
                      } else if (pageDec == 0) {
                        ejsAdd = ejsAdd + supimreZero(String(pageDec))
                      }
                      ejsAdd = ejsAdd + String(pageUnit)
                    }
                    let d = time.getDay()
                    let m = time.getMonth()
                    let h = time.getHours()
                    let min = time.getMinutes()
                    let sec = time.getSeconds()
                    if (d.length < 2) {
                      d = '0' + d
                    }
                    if (m.length < 2) {
                      m = '0' + m
                    }
                    if (h.length < 2) {
                      h = '0' + h
                    }
                    if (min.length < 2) {
                      min = '0' + min
                    }
                    if (sec.length < 2) {
                      sec = '0' + sec
                    }
                    addItem(subjects[count], docsTypes[index], `${subjects[count]} exercises.\nDeadline: ${day}/${month}/${year}, Page: ${ejsAdd}\n Exs: ${ejsStr} !Creation date: \n${d}/${m}/${time.getFullYear()} ${h}:${min}:${sec}`, `${day}/${month}/${year}`)
                  } else if (String(pageCent) + String(pageDec) + String(pageUnit) == "000" && ejsStr.length > 0) {
                    showToast({
                      content: 'Page can´t be "000", modify it.',
                    })
                  } else {
                    showToast({
                      content: 'Add an exercise with\nred button "+"\nin order to create the task.',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })

    const button4 = radioGroup.createWidget(widget.STATE_BUTTON, {
      x: 450,
      y: 190,
      w: 57,
      h: 57
    })
    const button2 = radioGroup.createWidget(widget.STATE_BUTTON, {
      x: 55 - 35,
      y: 180 + 57 + 20,
      w: 57,
      h: 57
    })
    const button3 = radioGroup.createWidget(widget.STATE_BUTTON, {
      x: 55 - 35,
      y: 180 + 57 + 20 + 57 + 20,
      w: 57,
      h: 57
    })
    const button1 = radioGroup.createWidget(widget.STATE_BUTTON, {
      x: 55 - 35,
      y: 180,
      w: 57,
      h: 57
    })

    radioGroup.setProperty(prop.INIT, button4)
    let txt1 = createWidget(widget.TEXT, {
      x: 55 + 57 + 20 - 35,
      y: 180,
      w: 250,
      h: 70,
      text: "Exercise",
      text_size: 26,
      color: themePrim
    })
    let txt2 = createWidget(widget.TEXT, {
      x: 55 + 57 + 20 - 35,
      y: 180 + 57 + 20,
      w: 250,
      h: 70,
      text: "Project",
      text_size: 26,
      color: themePrim
    })
    let txt3 = createWidget(widget.TEXT, {
      x: 55 + 57 + 20 - 35,
      y: 180 + 57 + 20 + 57 + 20,
      w: 250,
      h: 70,
      text: "Exam",
      text_size: 26,
      color: themePrim
    })
    function addItem(name, type, element, date) {
        data = decodeJSON

      
      let subjectJSON = data.asignaturas.find(asig => asig.nombre === name);

      if (!subjectJSON) {
        subjectJSON = {
          nombre: name,
          actividades: {
            tareas: [],
            proyectos: [],
            examenes: []
          }
        };
        data.asignaturas.push(subjectJSON);
      } else if (!subjectJSON.actividades) {
        
        subjectJSON.actividades = {
          tareas: [],
          proyectos: [],
          examenes: []
        }; 
      }
      if (!subjectJSON.actividades.examenes) {
        subjectJSON.actividades.examenes = [];
      }

      
      switch (type) {
        case 'task':
          subjectJSON.actividades.tareas.push(element);
          break;
        case 'project':
          subjectJSON.actividades.proyectos.push(element);
          break;
        case 'exam':
          subjectJSON.actividades.examenes.push(element);
          break;
        default:
          
          return;
      }

      data.fechas.push(date)

      
      
      saveJson('task_keySch', data);
      replace({ url: 'pages/newTask', param: '...' })
    }
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
    function readFile(filename) {
      return localStorage.getItem(filename);
    }
    
    
    function getDay(sol) {
      let nuevaFecha = new Date(time.getFullYear(), time.getMonth() - 1, time.getDay());
      let k = nuevaFecha
      nuevaFecha.setDate(k.getDate() + 1);
      let y = nuevaFecha.getFullYear();
      let m = nuevaFecha.getMonth(); 
      let d = nuevaFecha.getDate();
      if (sol == "d") {
        return d
      } else if (sol == "m") {
        return m + 1
      }else if (sol == "y") {
        return y
      }
    }
  },
  onDestroy() {
   offGesture()

  },
});





