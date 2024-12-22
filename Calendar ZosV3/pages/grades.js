import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    var color = 0x00cc00
    var color2 = 0x000000
    let subjectGradesAdded = false
    setStatusBarVisible(false)
    var saves = []
    var jsonBase = readFile('task_keySch')
    var decodeJSON = jsonBase
    let num = 2
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



    const sub = Config.addedSubjects

    var nextScreenX = 1
    var bools = [];
    var addedSub = []
    let subY = 0
    var textColors = [];

    // Crear el fondo
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 24 * 390,
      h: 450,
      color: themeBG,
    });

    let idx = 0;
    let number = 6;
    sub.pop()
    sub.pop()
    sub.pop()
    if (sub.length < number) { number = sub.length }
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

    // Asignar pesos por defecto para cada asignatura
    var subjectWeights = {}
    function renderSub() {
      subY = 0
      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0xffffff
      })
      let m = 0
      // Crear widgets de asignaturas con botones para cambiar pesos
      for (let i = 0; i < number; i++) {
        console.log("subject: " + sub[i])
        if (sub[i] != "") {
          let img = createWidget(widget.IMG, {
            x: 300 + 390 * m,
            y: 7 + subY * space + space,
            src: "false.png",
          });

          let txt = createWidget(widget.TEXT, {
            x: 40 + 390 * m,
            y: 7 + subY * space + space,
            w: 258,
            h: 33,
            text: sub[i],
            color: addedSub.indexOf(sub[i]) == -1 ? textColors[i] : color, // Usa el color inicial
            text_size: 25,
          });

          groups2.push(img);
          groups.push(txt);

          img.addEventListener(event.CLICK_DOWN, () => {
            let boolIndex = i + showBools * number;
            bools[boolIndex] = !bools[boolIndex];
            txt.setProperty(prop.MORE, { color: addedSub.indexOf(sub[i]) != -1 ? color : bools[boolIndex] ? color2 : textColors[i] })
            img.setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
          });
          subY++;
        }
      }
      let constants = []
      if (idx > 0) {
        let preButton = createWidget(widget.BUTTON, {
          x: 390 * m,
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
        constants.push(preButton);

        let nextButton = createWidget(widget.BUTTON, {
          x: (390 * m) + 390 / 2,
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
        constants.push(nextButton);
      }
      let UI2 = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 45,
        color: themeUI
      })
      let desp = createWidget(widget.TEXT, {
        x: 0,
        y: 10,
        w: 390,
        h: 55,
        text: `Add configuration to:`,
        align_h: align.CENTER_H,
        text_size: 20,
        color: themeSec
      })
      let closeBtn = createWidget(widget.BUTTON, {
        x: 390 * m + 390 / 2 - 250 / 2,
        y: 325,
        w: 250,
        h: 40,
        press_color: 0xe9efe8,
        normal_color: 0xd8ded7,
        color: 0x000000,
        text: "Close",
        radius: 15,
        click_func: () => {
          UI.setProperty(prop.VISIBLE, false)
          groups.push(closeBtn)
          groups.push(UI2)
          groups.push(desp)
          groups.forEach((c) => {
            c.setProperty(prop.VISIBLE, false)
          })
          groups2.forEach((c) => {
            c.setProperty(prop.VISIBLE, false)
          })
          if (idx > 0) {
            constants.forEach((c) => {
              c.setProperty(prop.VISIBLE, false)
            })
          }
          groups = []
          groupss = []
          constants = []
          let userSub = []
          if (bools.indexOf(true) != -1) {
            for (let i = 0; i < sub.length; i++) {
              if (bools[i] == true) {
                userSub.push(sub[i])
                if (addedSub.indexOf(sub[i]) == -1) {
                  addedSub.push(sub[i])
                }
              }
            }
            console.log("COMP: " + JSON.stringify(subjectData.examComponents))
            for (let l = 0; l < userSub.length; l++) {
              let subC = userSub[l]
              console.log("SubC: " + subC)
              if (!subjectWeights[subC]) {
                subjectWeights[subC] = {
                  examWeight: subjectData.examWeight,
                  attitudeWeight: subjectData.attitudeWeight,
                  taskWeight: subjectData.taskWeight,
                  customWeight: subjectData.customWeight,
                  sizes: subjectData.examComponents
                };
              }
              // Se elimina el else, ya que el mismo bloque se repite en el else
              subjectWeights[subC] = {
                examWeight: subjectData.examWeight,
                attitudeWeight: subjectData.attitudeWeight,
                taskWeight: subjectData.taskWeight,
                customWeight: subjectData.customWeight,
                sizes: subjectData.examComponents
              };
              console.log("weights: " + JSON.stringify(subjectWeights[subC]))
            }
            let str = ""
            for (let i = 0; i < userSub.length; i++) {
              if (i == 0) {
                str += userSub[i]
              } else if (i == userSub.length - 1) {
                str += " and " + userSub[i]
              } else {
                str += ", " + userSub[i]
              }
            }
            showToast({
              content: "Added to: " + str + "."
            })
            subjectGradesAdded = true
            console.log("weights: " + JSON.stringify(subjectWeights))
          } else {
            showToast({
              content: "No added this structure to any subject."
            })
          }
          for (let e = 0; e < sub.length; e++) {
            textColors[e] = 0x000000
            showBools = 0
            bools[e] = false; // Restablece el array bools
          }
          groups = []
          groups2 = []
        }
      })
      function updatePage() {
        let text = organizedData[showBools];
        for (let qw = 0; qw < number; qw++) {
          groups2[qw].setProperty(prop.VISIBLE, true);
          let boolIndex = qw + showBools * number;
          groups[qw].setProperty(prop.MORE, { text: "" });
          groups2[qw].setProperty(prop.MORE, { src: ".png" });
          console.log("subject: " + text[qw])
          if (Array.isArray(text) && typeof text[qw] === "string" && text[qw].trim() != "" && text[qw].trim() != undefined) {
            groups[qw].setProperty(prop.MORE, { text: text[qw], color: addedSub.indexOf(text[qw]) != -1 ? color : textColors[qw] });
            groups2[qw].setProperty(prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
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
          } else {
            console.log("true: " + text[qw])
            groups[qw].setProperty(prop.MORE, { text: "" });
            groups2[qw].setProperty(prop.MORE, { src: ".png" });
            groups[qw].removeEventListener(event.CLICK_DOWN, () => { });
            groups2[qw].removeEventListener(event.CLICK_DOWN, () => { });
          }
        }
      }
    }
    const subjectData = {
      examWeight: 70, // Peso por defecto para exámenes
      attitudeWeight: 10, // Peso por defecto para actitud
      taskWeight: 20, // Peso por defecto para tareas
      customWeight: 0, // Peso personalizado
      examComponents: [
        //{ name: "Exam 1", weight: 30, tag: 2 },
        //{ name: "Exam 2", weight: 70, tag: 2 },
      ]
    }
    showWeightDialog()
    function showWeightDialog() {
      let offsetY = 120;
      let dec = 5
      let max = 300
      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0xffffff
      })
      createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 70,
        color: themeUI
      })
      createWidget(widget.TEXT, {
        x: 20,
        y: 20,
        w: 350,
        h: 70,
        text: `Select the structure:`,
        text_size: 20,
        color: themeSec
      })
      let n = createWidget(widget.IMG, {
        x: 320,
        y: 90,
        src: "conf2.png"
      })
      n.addEventListener(event.CLICK_DOWN, () => {
        let percentaje = subjectData.attitudeWeight + subjectData.taskWeight + subjectData.examWeight
        if (customOn) { percentaje += subjectData.customWeight }
        console.log("L: " + JSON.stringify(subjectData.examComponents))
        console.log("LL: " + subjectData.examComponents.length)
        if (percentaje == 100 && subjectData.examComponents.length != 0 || percentaje == 100 && subjectData.examComponents.length == undefined) {
          renderSub()
        } else if (subjectData.examComponents.length == 0 || subjectData.examComponents.length == undefined) {
          showToast({
            content: "Press \"Exams details\" and then \"Save\" to continue."
          })
        } else {
          showToast({
            content: "Data must sum a 100%."
          })
        }
      })

      let customOn = false

      let progressBar = createWidget(widget.FILL_RECT, {
        x: 10,
        y: offsetY,
        w: max,
        h: 10,
        color: 0xcccccc, // Fondo de la barra de progreso
        radius: 5,
      });
      let WC = subjectData.attitudeWeight + subjectData.taskWeight + subjectData.examWeight
      if (customOn) { WC += subjectData.customWeight }
      let progress = createWidget(widget.FILL_RECT, {
        x: 10,
        y: offsetY,
        w: (WC * max) / 100,
        h: 10,
        color: 0x66cc66 // Verde claro para la barra de progreso
      });
      let progressText = createWidget(widget.TEXT, {
        x: 10 + max - dec - dec * 6,
        y: offsetY - 25, // Posición inicial sobre la barra
        w: 50, // Ancho del texto
        h: 20, // Alto del texto
        text: "100%", // Valor inicial
        text_size: 16,
        color: 0x003366, // Azul oscuro
        align_h: align.CENTER
      });
      if (subjectData.customWeight > 0) { customOn = true }
      let a = createWidget(widget.BUTTON, {
        x: 10,
        y: 150,
        w: 170,
        h: 50,
        text: `Exams: ${subjectData.examWeight}%`,
        normal_color: 0xcddddc,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5, color: 0x003366,
        click_func: () => {
          let maxWeight = 100 - (subjectData.attitudeWeight + subjectData.taskWeight); // Peso máximo permitido
          if (customOn == true) { maxWeight = 100 - (subjectData.attitudeWeight + subjectData.taskWeight + subjectData.customWeight); }
          if (subjectData.examWeight >= maxWeight) {
            // Restablecer si se supera el límite
            subjectData.examWeight = 0;
            //showToast({ text: "Peso de exámenes restablecido a 0 por superar el límite permitido." });
          } else {
            // Incrementar el peso si no supera el límite
            subjectData.examWeight = Math.min(subjectData.examWeight + 5, maxWeight);
            //showToast({ text: `Peso de exámenes actualizado: ${subjectData.examWeight}%` });
          }
          a.setProperty(prop.MORE, {
            x: 10,
            y: 150,
            w: 170,
            h: 50,
            text: `Exams: ${subjectData.examWeight}%`,
          })
          Bar()
        }
      });

      // Botón para gestionar peso de tareas
      let b = createWidget(widget.BUTTON, {
        x: 200,
        y: 220,
        w: 170,
        h: 50,
        normal_color: 0xcddddc,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        color: 0x003366,
        text: `Tasks: ${subjectData.taskWeight}%`,
        click_func: () => {
          let maxWeight = 100 - (subjectData.attitudeWeight + subjectData.examWeight); // Peso máximo permitido
          if (customOn == true) { maxWeight = 100 - (subjectData.attitudeWeight + subjectData.examWeight + subjectData.customWeight); }
          if (subjectData.taskWeight >= maxWeight) {
            // Restablecer si se supera el límite
            subjectData.taskWeight = 0;
            //showToast({ text: "Peso de tareas restablecido a 0 por superar el límite permitido." });
          } else {
            // Incrementar el peso si no supera el límite
            subjectData.taskWeight = Math.min(subjectData.taskWeight + 5, maxWeight);
            //showToast({ text: `Peso de tareas actualizado: ${subjectData.taskWeight}%` });
          }
          b.setProperty(prop.MORE, {
            x: 200,
            y: 220,
            w: 170,
            h: 50,
            text: `Tasks: ${subjectData.taskWeight}%`,
          })
          Bar()
        }
      });

      // Botón para gestionar peso de actitud
      let c = createWidget(widget.BUTTON, {
        x: 10,
        y: 220,
        w: 170,
        h: 50,
        text: `Attitude: ${subjectData.attitudeWeight}%`,
        normal_color: 0xcddddc,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        color: 0x003366,
        click_func: () => {
          let maxWeight = 100 - (subjectData.examWeight + subjectData.taskWeight); // Peso máximo permitido
          if (customOn == true) { maxWeight = 100 - (subjectData.examWeight + subjectData.taskWeight + subjectData.customWeight); }
          if (subjectData.attitudeWeight >= maxWeight) {
            // Restablecer si se supera el límite
            subjectData.attitudeWeight = 0;
            //showToast({ text: "Peso de actitud restablecido a 0 por superar el límite permitido." });
          } else {
            // Incrementar el peso si no supera el límite
            subjectData.attitudeWeight = Math.min(subjectData.attitudeWeight + 5, maxWeight);
            //showToast({ text: `Peso de actitud actualizado: ${subjectData.attitudeWeight}%` });
          }
          c.setProperty(prop.MORE, {
            x: 10,
            y: 220,
            w: 170,
            h: 50,
            text: `Attitude: ${subjectData.attitudeWeight}%`,
          })
          Bar()
        }
      });
      let d = createWidget(widget.BUTTON, {
        x: 10,
        y: 290,
        w: 170,
        h: 50,
        text: `Separate grade: ${subjectData.customWeight}%`,
        normal_color: 0xcddddc,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        color: 0x003366,
        click_func: () => {
          let maxWeight = 100 - (subjectData.examWeight + subjectData.taskWeight + subjectData.attitudeWeight); // Peso máximo permitido
          if (subjectData.customWeight >= maxWeight) {
            // Restablecer si se supera el límite
            subjectData.customWeight = 0;
            //showToast({ text: "Peso de actitud restablecido a 0 por superar el límite permitido." });
          } else {
            // Incrementar el peso si no supera el límite
            subjectData.customWeight = Math.min(subjectData.customWeight + 5, maxWeight);
            //showToast({ text: `Peso de actitud actualizado: ${subjectData.attitudeWeight}%` });
          }
          d.setProperty(prop.MORE, {
            x: 10,
            y: 290,
            w: 170,
            h: 50,
            text: `Separate grade: ${subjectData.customWeight}%`,
          })
          Bar()
        }
      });
      let nhm = 20
      let k = createWidget(widget.IMG, {
        x: 210 + nhm,
        y: 290 - 1,
        src: customOn == false ? "unticked.png" : "ticked.png"
      })
      k.addEventListener(event.CLICK_DOWN, () => {
        customOn = !customOn;
        k.setProperty(prop.MORE, {
          src: customOn == false ? "unticked.png" : "ticked.png"
        })
        Bar()
        d.setProperty(prop.MORE, {
          x: 10,
          y: 290,
          w: 170,
          h: 50,
          normal_color: customOn == false ? 0xcddddc : 0x00ff00
        })
        subjectData.customWeight = 0
        d.setProperty(prop.MORE, {
          x: 10,
          y: 290,
          w: 170,
          h: 50,
          text: `Separate grade: ${subjectData.customWeight}%`,
        })
      })
      let infoRest = createWidget(widget.IMG, {
        x: 370 - 50 - nhm,
        y: 295,
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
        let description = createWidget(widget.TEXT, {
          x: 0,
          y: 80,
          w: 390,
          h: 300,
          align_h: align.CENTER_H,
          text: "Mark it to indicate, for\nexample, a project with\ndirect percentaje over\nfinal grade.\nThis no need to have\na percentaje.",
          text_size: 24,
          color: 0x000000
        })
        let title = createWidget(widget.TEXT, {
          x: 0,
          y: 10,
          w: 390,
          h: 80,
          align_h: align.CENTER_H,
          text: "Separate grade:",
          text_size: 40,
          color: 0xffffff
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
      // Botón para salir del diálogo
      let j = createWidget(widget.BUTTON, {
        x: 30,
        y: 360,
        w: 330,
        h: 50,
        text: "Exams number: " + num,
        normal_color: 0x394444,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        click_func: () => {
          num++
          if (num > 3) {
            num = 1
          }
          if (num == 1) {
            let examComponents = [
              { name: "Examen 1", weight: 100, tag: 7 },
            ];
            subjectData.examComponents = examComponents
          } else {
            subjectData.examComponents = saves
          }
          j.setProperty(prop.MORE, {
            x: 10,
            y: 360,
            w: 360,
            h: 50,
            text: "Exams number: " + num,
          })
        }
      });
      createWidget(widget.BUTTON, {
        x: 200,
        y: 150,
        w: 170,
        h: 50, color: 0x003366,
        text: "Exams details",
        normal_color: 0xcddddc,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        click_func: () => {
          if (num > 1) {
            showExamComponentsDialog(num);
          } else {
            showToast({ content: "Set unless to exams to modify it" });
          }
        }
      });
      function Bar() {
        let newTotalWeight = subjectData.examWeight + subjectData.attitudeWeight + subjectData.taskWeight
        if (customOn) {
          newTotalWeight += subjectData.customWeight
        }
        // Calcula el ancho de la barra de progreso según el nuevo total
        let progressWidth = (newTotalWeight * max) / 100;
        progress.setProperty(prop.MORE, { x: 10, y: 120, w: progressWidth, h: 10, color: progressWidth >= max ? 0x66cc66 : 0xff0000 });
        let tlt = 10 + progressWidth - dec
        if (progressWidth >= max) {
          tlt = 10 + progressWidth - dec - dec * 6
        }
        if (newTotalWeight == 95) {
          tlt = 10 + progressWidth - dec * 2
        }
        // Actualiza el texto del progreso
        progressText.setProperty(prop.MORE, {
          text: `${newTotalWeight}%`,
          x: tlt, // Ajusta la posición según el ancho de la barra
        });
      }
    }

    function showExamComponentsDialog(num) {
      let widgets = [];
      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0xffffff // Mantiene el fondo original
      });

      // Título de la sección
      let header = createWidget(widget.TEXT, {
        x: 35,
        y: 10,
        w: 370,
        h: 40,
        text: "Exams components",
        text_size: 24,
        color: 0x003366, // Azul oscuro
        align_h: align.CENTER
      });
      widgets.push(header)

      // Instrucciones para el usuario
      let instructions = createWidget(widget.TEXT, {
        x: 10,
        y: 50,
        w: 370,
        h: 60,
        text: "Adjust the weights of each component.\nThe total must add up to 100%.",
        text_size: 18,
        color: 0x333333, // Gris oscuro
        align_h: align.CENTER,
      });
      widgets.push(instructions)
      let offsetY = 120;
      let examComponents = subjectData.examComponents;
      if (!examComponents || examComponents.length !== num) {
        if (num == 3) {
          examComponents = [
            { name: "Examen 1", weight: 20, tag: 3 },
            { name: "Examen 2", weight: 30, tag: 3 },
            { name: "Examen 3", weight: 50, tag: 3 },
          ];
        } else if (num == 2) {
          examComponents = [
            { name: "Examen 1", weight: 30, tag: 2 },
            { name: "Examen 2", weight: 70, tag: 2 },
          ];
        } else if (num == 1) {
          examComponents = [
            { name: "Examen 1", weight: 100, tag: 7 },
          ];
        }
        //saves = examComponents
      }
      let names = ["Examen 1", "Examen 2", "Examen 3"]
      let namesT = ["Exam 1", "Exam 2", "Exam 3"]
      // Barra de progreso general
      let progressBar = createWidget(widget.FILL_RECT, {
        x: 10,
        y: offsetY,
        w: 370,
        h: 10,
        color: 0xcccccc, // Fondo de la barra de progreso
        radius: 5,
      });
      widgets.push(progressBar)
      let progress = createWidget(widget.FILL_RECT, {
        x: 10,
        y: offsetY,
        w: Math.min(370, examComponents.reduce((sum, c) => sum + c.weight, 0) * 3.7),
        h: 10,
        color: 0x66cc66 // Verde claro para la barra de progreso
      });
      widgets.push(progress)
      let dec = 5
      let progressText = createWidget(widget.TEXT, {
        x: 10 + 370 - dec - dec * 6,
        y: offsetY - 25, // Posición inicial sobre la barra
        w: 50, // Ancho del texto
        h: 20, // Alto del texto
        text: "100%", // Valor inicial
        text_size: 16,
        color: 0x003366, // Azul oscuro
        align_h: align.CENTER
      });
      widgets.push(progressText)

      // Actualización dinámica de la barra y del texto
      offsetY += 20;

      examComponents.forEach((component, idx) => {
        // Contenedor para cada componente
        let container = createWidget(widget.FILL_RECT, {
          x: 10,
          y: offsetY,
          w: 370,
          h: 60,
          color: 0xcddddc, // Fondo claro para el contenedor
        });
        widgets.push(container)
        let name = namesT[names.indexOf(component.name)]
        // Texto con el nombre y peso del componente
        let text = createWidget(widget.TEXT, {
          x: 15,
          y: offsetY + 10,
          w: 200,
          h: 30,
          text: `${name}: ${component.weight}%`,
          text_size: 18,
          color: 0x003366 // Azul oscuro para texto
        });
        widgets.push(text);
        // Botón para incrementar el peso
        let plusButton = createWidget(widget.BUTTON, {
          x: 290,
          y: offsetY + 10,
          w: 60,
          h: 30,
          text: "+5%",
          normal_color: 0x394444,
          press_color: 0xd9f2e6, // Verde claro al presionar
          radius: 5,
          click_func: () => {
            // Calcula el peso total actual de todos los exámenes
            const totalWeight = examComponents.reduce((sum, c) => sum + c.weight, 0);

            if (totalWeight < 100 && component.tag != 7) {
              // Actualiza el peso del componente sumando 5%, asegurando que no supere el límite
              component.weight = Math.min(component.weight + 5, 100 - (totalWeight - component.weight));

              // Actualiza el texto del componente
              text.setProperty(prop.MORE, { text: `${name}: ${component.weight}%` });

              // Recalcular el peso total con el nuevo valor
              const newTotalWeight = examComponents.reduce((sum, c) => sum + c.weight, 0);

              // Calcula el ancho de la barra de progreso según el nuevo total
              let progressWidth = (newTotalWeight * 370) / 100;
              progress.setProperty(prop.MORE, { x: 10, y: 120, w: progressWidth, h: 10, color: progressWidth >= 370 ? 0x66cc66 : 0xff0000 });
              let tlt = 10 + progressWidth - dec
              if (progressWidth >= 370) {
                tlt = 10 + progressWidth - dec - dec * 6
              }
              // Actualiza el texto del progreso
              progressText.setProperty(prop.MORE, {
                text: `${newTotalWeight}%`,
                x: tlt, // Ajusta la posición según el ancho de la barra
              });
            }
          }
        });
        widgets.push(plusButton);

        // Botón para disminuir el peso
        let minusButton = createWidget(widget.BUTTON, {
          x: 220,
          y: offsetY + 10,
          w: 60,
          h: 30,
          text: "-5%",
          normal_color: 0x394444,
          press_color: 0xd9f2e6, // Verde claro al presionar
          radius: 5,
          click_func: () => {
            if (component.weight > 0 && component.tag != 7) {
              component.weight = Math.max(component.weight - 5, 0);
              if (component.weight == 0) {
                component.weight = 5
                showToast({ content: "minimum weight: 5%. For remove it, set the number of exams to " + (component.tag - 1) })
              }
              text.setProperty(prop.MORE, { text: `${name}: ${component.weight}%` });
              let totalWeight = 0;
              for (let i = 0; i < examComponents.length; i++) {
                totalWeight += examComponents[i].weight;
              }
              let progressWidth = (totalWeight * 370) / 100;
              progress.setProperty(prop.MORE, { x: 10, y: 120, w: progressWidth, h: 10, color: progressWidth >= 379 ? 0x66cc66 : 0xff0000 });
              progressText.setProperty(prop.MORE, {
                text: `${totalWeight}%`,
                x: progressWidth == 0 ? 10 : 10 + progressWidth - dec, // Ajusta la posición según el ancho de la barra
              });
            }
          }
        });
        widgets.push(minusButton);

        offsetY += 70;
      });

      // Botón para cerrar el diálogo
      let closeButton = createWidget(widget.BUTTON, {
        x: 10,
        y: offsetY,
        w: 370,
        h: 50,
        text: "Save",
        normal_color: 0x394444,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        click_func: () => {
          const totalWeight = examComponents.reduce((sum, c) => sum + c.weight, 0);
          if (totalWeight === 100) {
            UI.setProperty(prop.VISIBLE, false);
            widgets.forEach(widget => widget.setProperty(prop.VISIBLE, false));
            subjectData.examComponents = examComponents;
            //showToast({ text: "Componentes actualizados correctamente." });
            //saves = examComponents
          } else {
            showToast({ content: "Sum must be a 100%." });
          }
        }
      });
      widgets.push(closeButton);
    }


    // Botón "Next"
    createWidget(widget.BUTTON, {
      x: 0,
      y: 420,
      w: 390,
      h: 30,
      radius: 7,
      normal_color: themeUI,
      press_color: themeUI,
      color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
      text: 'Next',
      click_func: () => {
        if (subjectGradesAdded) {
          saveJson("crit_keySch", subjectWeights)
          saveJson("Num_keySch", {})
          Config.new = false
          writeFile("conf_keySch", Config)
          push({ url: 'pages/init', param: '...' })
        } else {
          showToast({ content: "Add at least one structure to any subject from the settings button." })
        }
      }
    });
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
    //setScrollView(true, 390, nextScreenX + 1, false)
  }
});
