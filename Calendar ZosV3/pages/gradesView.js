
import { createWidget, widget, align, prop, event } from '@zos/ui'
import { Vibrator} from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push, replace } from '@zos/router'
import { scrollTo, setScrollLock } from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    function readFile(filename) {
      return localStorage.getItem(filename);
    }



    function decodeUint8Array(uint8array) {
      let decodedString = "";
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }
      return decodedString;
    }
    var conf = readFile("conf_keySch")

    var Config = conf
    var gradesEnc = readFile('crit_keySch')
    //var gradesEncDec = decodeUint8Array(gradesEnc);
    var Grades = gradesEnc
    var gradesNumEnc = readFile('Num_keySch')
    console.log("data: " + JSON.stringify(gradesNumEnc))
    var gradesNumEncDec = gradesNumEnc
    var conf = readFile("conf_keySch")


    var Config = conf
    var themeBG = Config.theme.bg
    var themeUI = Config.theme.UI
    var themePrim = Config.theme.primText
    var themeSec = Config.theme.secText
    var themeSlot = Config.theme.slot
    var Num
    try {
      Num = gradesNumEncDec
    } catch (e) {
      Num = {}
    }
    console.log(JSON.stringify(Grades))
    let g = 0
    let y = 50
    setStatusBarVisible(false)
    let bg = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG
    })
    let UI2 = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 45,
      color: conf.theme.UI
    })
    let desp = createWidget(widget.TEXT, {
      x: 0,
      y: 10,
      w: 390,
      h: 55,
      text: `Grades: `,
      align_h: align.CENTER_H,
      text_size: 20,
      color: conf.theme.secText
    })
    let widgetCount = 0
    Object.keys(Grades).forEach((subject) => {
      console.log("THEMES: " + JSON.stringify(conf.theme))
      g += 1
      widgetCount++
      createWidget(widget.FILL_RECT, {
        x: 10,
        y: y + 60 * (g - 1),
        w: 370,
        h: 50,
        radius: 10,
        color: conf.theme.slot
      })
      const subjectsJson = [
        'Maths',
        'Languaje',
        'Physics',
        'Philosophy',
        'History',
        'English',
        'Technology',
        'ICT',
        "Biology",
        "Natural sciencies",
        "Social sciencies",
        "Technical drawing",
        "PE",
        "Arts Education",
        "Economy",
        "Physics and Chemistry",
        "Geography",
        "Computer Science",
        "Ancient languages",
        "Literature",
        "Music",
        "Chemistry",
        "Religion",
        "Other"
      ]
      const subjectsColors = [
        0xFFD700,
        0x1E90FF,
        0x00FFFF,
        0x800080,
        0x8B4513,
        0xff4500,
        0x32CD32,
        0xA9A9A9,
        0x32CD32,
        0x00FF7F,
        0xFFD700,
        0x800080,
        0x1E90FF,
        0x00FFFF,
        0x8B4513,
        0xf7c2be,
        0xA9A9A9,
        0xFF4500,
        0x2E8B57,
        0xFF1493,
        0x4682B4,
        0x808000,
        0x7B68EE,
        0xB22222
      ];
      createWidget(widget.TEXT, {
        x: 35,
        y: y + 60 * (g - 1) + 5,
        w: 225,
        h: 50,
        text_size: 30,
        color: conf.theme.primText,
        text: subject + ": "
      })
      var Config = conf
      var themeBG = Config.theme.bg
      var themeUI = Config.theme.UI
      var themePrim = Config.theme.primText
      var themeSec = Config.theme.secText
      var themeSlot = Config.theme.slot
      var autoBright = Config.autoBright
      var autoDark = Config.autoDark
      let colourNum = subjectsJson.indexOf(subject)
      createWidget(widget.FILL_RECT, {
        x: 15,
        y: y + 60 * (g - 1) + 5,
        w: 10,
        h: 40,
        color: subjectsColors[colourNum],
        radius: 12
      })
      createWidget(widget.TEXT, {
        x: 290,
        y: y + 60 * (g - 1) + 5,
        w: 370,
        h: 50,
        text_size: 30,
        color: renderGradesOnlyNum(subject) < 5 ? 0xcc0000 : conf.theme.primText,
        text: aprox(Number(renderGradesOnlyNum(subject)))
      })
      const imgWidget = createWidget(widget.IMG, {
        x: 10,
        y: y + 60 * (g - 1),
        w: 370,
        h: 50,
        src: ".png"
      });
      let num = getNum(subject)
      let examComponents = []
      if (num == 3) {
        examComponents = [
          { grade: "¿?" },
          { grade: "¿?" },
          { grade: "¿?" },
        ];
      } else if (num == 2) {
        examComponents = [
          { grade: "¿?" },
          { grade: "¿?" },
        ];
      } else if (num == 1) {
        examComponents = [
          { grade: "¿?" },
        ];
      }
      if (!Num[subject]) {
        Num[subject] = {
          examWeight: "¿?",
          attitudeWeight: "¿?",
          taskWeight: ["¿?"],
          customWeight: "¿?",
          sizes: examComponents
        };
      }
      // Agregar evento al widget IMG
      imgWidget.addEventListener(event.CLICK_DOWN, () => {
        p = 0
        renderGrades(subject);
      });
    })
    let offCount = widgetCount - 6
    let w = 450
    for (let i = 0; i < offCount + 4; i++) {
      w += y
      bg.setProperty(prop.MORE, {
        x: 0,
        y: 0,
        w: 390,
        h: w
      })
    }
    let p = 0
    let h = 0
    var promps = [
      "Exámenes",
      "Actitud",
      "Tareas",
      "Personalizado"
    ]
    var prompsEng = [
      "Exams",
      "Attitude",
      "Tasks",
      "Custom"
    ]
    let widgetsGrade = []
    function renderGrades(subject) {
      scrollTo({
        y: 0
      })
      setScrollLock({
        lock: true,
      })
      console.log("LENGHT: " + JSON.stringify(Grades[subject]));

      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG
      });
      let UI2 = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 45,
        color: Config.theme.UI
      })
      let desp = createWidget(widget.TEXT, {
        x: 0,
        y: 10,
        w: 390,
        h: 55,
        text: `${subject}: `,
        align_h: align.CENTER_H,
        text_size: 20,
        color: Config.theme.secText
      })

      const subjectData = Grades[subject];

      // Iterar sobre las propiedades de la asignatura
      const subjectCur = Num[subject];
      const index = []; // Asegúrate de inicializar el array de índices
      const indexRev = [];
      let curKey = 0;
      for (const key in subjectData) {
        if (subjectData[key] === 0 || key === "sizes") {
          index.push(curKey); // Agrega el índice al array de exclusión
        } else {
          indexRev.push(curKey)
        }
        curKey++;
      }

      let curGrade = 0;
      const values = [];
      let prompssCur = []
      let prompssEngTxt = []
      for (const key in subjectCur) {
        if (index.indexOf(curGrade) === -1) { // Solo procesar si no está en el array de exclusión
          values.push(subjectCur[key]); // Agrega el valor válido a `values`
          prompssCur.push(promps[curGrade])
          prompssEngTxt.push(prompsEng[curGrade])
        }
        curGrade++;
      }
      let total = []
      let displayIndex = 0; // Índice para los widgets visibles
      let dataTotal = 0
      for (const key in subjectData) {
        // Verificar si el peso NO es 0
        if (subjectData[key] === 0 || key === "sizes") {
          console.log(`${key} tiene valor 0 o es irrelevante, no se mostrará`);
          continue; // Ignorar este campo y no incrementar displayIndex
        }

        const j = displayIndex; // Usar índice visible actual

        // Crear el widget de fondo
        let rect = createWidget(widget.FILL_RECT, {
          x: 10,
          y: y + 60 * displayIndex,
          w: 370,
          h: 50,
          radius: 10,
          color: themeSlot
        }).addEventListener(event.CLICK_DOWN, () => {
          setGradePage(indexRev[j], subjectData, true);
        });

        console.log(`displayIndex: ${displayIndex}, mostrando ${key}: ${subjectData[key]}`);
        let data = values[j];
        if (prompssCur[displayIndex] == "Exámenes") {
          data = average()  // Calcula la media ponderada
        }

        // Función para calcular la media ponderada
        function average() {
          const subjectCur = Num[subject].sizes;  // Componentes de examen
          let weightedSum = 0;

          console.log("SUBJECT CUR: " + subjectCur.length)
          let verify = false
          // Calcula la suma ponderada
          console.log("ISTRUE")
          for (let key in Num[subject].sizes) {
            const weight = Number(Grades[subject].sizes[key].weight) / 100;  // Peso correspondiente al examen
            const grade = Number(Num[subject].sizes[key].grade);
            console.log("GRADE: " + JSON.stringify(grade))
            console.log("WEIGHT: " + JSON.stringify(weight))
            console.log("KEYCUR: " + key)
            // Filtra los datos como en averageTwo (verifica si el valor es un número)
            if (!isNaN(grade)) {  // Verifica que la calificación no sea NaN ni una cadena vacía
              weightedSum += (Number(grade) * Number(weight));  // Suma ponderada (calificación * peso)
              verify = true
            } else {
              console.log("INVALID GRADE: " + grade);  // Log de valor no válido
            }
          }
          if (verify == false) {
            return "¿?"
          }
          console.log("weightedSum: " + weightedSum)
          // Devuelve la suma ponderada redondeada a 2 decimales
          return aprox(weightedSum.toFixed(2));  // Media ponderada (suma ponderada / total de pesos)
        }

        if (prompssCur[displayIndex] == "Tareas") {
          if (Num[subject].taskWeight.indexOf("¿?") == true) {
            data = "¿?"
          } else {
            data = averageTwo()
          }
        }
        if (isNaN(data)) {
          data = "¿?"
        }
        function averageTwo() {
          let average = 0
          let count = 0
          for (let val in Num[subject][key]) {
            console.log("VALSIZES: " + val)
            if (!isNaN(Num[subject][key][val])) {
              average += Number((Num[subject][key][val]))
              count++
            }
          }
          let definitive = "¿?"
          if (count > 0) {
            let result = Number(average / count)
            definitive = Number(result) * ((Grades[subject][key]) / 100)
            definitive = definitive.toFixed(2)
          }
          return aprox(definitive)
        }
        let total = [];
        total.push(data); // Ejemplo: valores únicos basados en `data`
        dataTotal = data
        console.log(total);
        // Crear el widget de texto
        let text = createWidget(widget.TEXT, {
          x: 20,
          y: y + 60 * displayIndex + 5,
          w: 370,
          h: 50,
          text_size: 30,
          color: themePrim,
          text: `${prompssEngTxt[displayIndex]}: `
        }).addEventListener(event.CLICK_DOWN, () => {
          setGradePage(indexRev[j], subject, true);
        });
        let grade = createWidget(widget.TEXT, {
          x: 290,
          y: y + 60 * displayIndex + 5,
          w: 370,
          h: 50,
          text_size: 30,
          color: data != "¿?" && analize(Number(data), prompssCur[displayIndex]) < (5 * (analizeWeight(prompssCur[displayIndex]))) ? 0xcc0000 : themePrim,
          text: `${data != "¿?" ? analize(data, prompssCur[displayIndex]).toFixed(2) : "¿?"}`
        }).addEventListener(event.CLICK_DOWN, () => {
          setGradePage(indexRev[j], subject, true);
        });
        widgetsGrade.push(rect)
        widgetsGrade.push(text)
        widgetsGrade.push(grade)
        displayIndex++; // Incrementar solo para datos válidos
      }
      function analize(data, index) {
        console.log("data: " + data)
        console.log("index: " + index)
        if (index == "Exámenes") {
          data *= Grades[subject].examWeight
        } else if (index == "Actitud") {
          data *= Grades[subject].attitudeWeight
        } else if (index == "Tareas") {
          return data
        } else if (index == "Personalizado") {
          data *= Grades[subject].customWeight
        }
        if (isNaN(data)) {
          data = "¿?"
        } else {
          data /= 100
        }
        return data
      }
      function analizeWeight(index) {
        console.log("index: " + index)
        let ret
        if (index == "Exámenes") {
          ret = Grades[subject].examWeight
        } else if (index == "Actitud") {
          ret = Grades[subject].attitudeWeight
        } else if (index == "Tareas") {
          ret = Grades[subject].taskWeight
        } else if (index == "Personalizado") {
          ret = Grades[subject].customWeight
        }
        console.log("RET: " + ret)
        return ret / 100
      }
      let sum = 0
      if (total.indexOf("¿?") == -1) {
        console.log("NEXT")
        for (const key in Num[subject]) {
          console.log("KEY: " + key)
          if (key == "examWeight" || key == "taskWeight" || Num[subject][key] != "¿?" && key != "sizes" && key != "attitudeWeight" && key != "customWeight") {
            if (key == "examWeight") {
              let sizes = Num[subject].sizes;  // Componentes de examen
              let filteredGrades = sizes
                .filter(item => item.grade !== "¿?")  // Filtra las calificaciones que no son "¿?"
                .map(item => parseFloat(item.grade));  // Convierte las calificaciones a números

              // Verifica si las calificaciones son válidas y realiza el cálculo de la media ponderada
              if (filteredGrades.length > 0) {
                if (!isNaN(average(filteredGrades))) {
                  sum += Number(average(filteredGrades)) * ((Grades[subject][key]) / 100);
                }  // Calcula la media ponderada
                console.log("NUM: " + average(filteredGrades))
                console.log("%%: " + ((Grades[subject][key]) / 100))
              } else {
                console.log("No hay calificaciones válidas para calcular la media.");
              }
            } else if (key == "taskWeight") {
              let average = 0
              let count = 0
              for (let val in Num[subject][key]) {
                console.log("VALSIZES: " + val)
                if (!isNaN(Num[subject][key][val])) {
                  average += Number((Num[subject][key][val]))
                  count++
                }
              }
              if (count > 0) {
                let result = Number(average / count)
                let definitive = Number(result) * ((Grades[subject][key]) / 100)
                sum += Number(definitive.toFixed(2))
                console.log("DEFINITIVE: " + result)
                console.log("%%%%%: " + ((Grades[subject][key]) / 100))
              }
            } else {
              sum += 0 // ;)
            }
          } else if (key == "attitudeWeight") {
            console.log("NUM: " + (Num[subject][key]))
            console.log("%%: " + ((Grades[subject][key]) / 100))
            console.log("TYPE: " + typeof Num[subject][key])
            console.log("KEY TYPE: " + key)
            if (!isNaN(Num[subject][key])) {
              sum += Number((Num[subject][key])) * ((Grades[subject][key]) / 100)
            }
          } else if (key == "customWeight") {
            if (!isNaN(Num[subject][key])) {
              sum += Number((Num[subject][key])) * ((Grades[subject][key]) / 100)
            }
          }
        }
        function average() {
          const subjectCur = Num[subject].sizes;  // Componentes de examen
          let weightedSum = 0;
  
          console.log("SUBJECT CUR: " + subjectCur.length)
          let verify = false
          // Calcula la suma ponderada
          console.log("ISTRUE")
          for (let key in Num[subject].sizes) {
            const weight = Number(Grades[subject].sizes[key].weight) / 100;  // Peso correspondiente al examen
            const grade = Number(Num[subject].sizes[key].grade);
            console.log("GRADE: " + JSON.stringify(grade))
            console.log("WEIGHT: " + JSON.stringify(weight))
            console.log("KEYCUR: " + key)
            // Filtra los datos como en averageTwo (verifica si el valor es un número)
            if (!isNaN(grade)) {  // Verifica que la calificación no sea NaN ni una cadena vacía
              weightedSum += (Number(grade) * Number(weight));  // Suma ponderada (calificación * peso)
              verify = true
            } else {
              console.log("INVALID GRADE: " + grade);  // Log de valor no válido
            }
          }
          if (verify == false) {
            return "¿?"
          }
          console.log("weightedSum: " + weightedSum)
          // Devuelve la suma ponderada redondeada a 2 decimales
          return parseFloat(weightedSum.toFixed(2));  // Media ponderada (suma ponderada / total de pesos)
        }
      }
      console.log("SUM: " + sum)
      const btn = createWidget(widget.BUTTON, {
        x: 390 / 2 - 200 / 2,
        y: 288,
        w: 200,
        h: 40,
        radius: 20,
        text: "Criteria",
        press_color: 0xccccdd,
        normal_color: themeSlot,
        color: themePrim,
        click_func: () => {
          renderWeights(subject)
        }
      });
      if (typeof sum == "number" && sum >= 0) {
        const y = 400;
        let w = 110
        let p = sum
        if (sum == 10.0 || sum == "10.0") {
          sum = 10
        }
        const mediaBox = createWidget(widget.FILL_RECT, {
          x: (390 / 2 - w / 2),
          y: y - 65,
          w: w,
          h: w,
          radius: 20,
          color: conf.theme.slot
        });
        var op = 65
        const mediaText = createWidget(widget.TEXT, {
          x: 0,
          y: y + 10 - op,
          w: 390,
          h: 80,
          text_size: 20,
          align_h: align.CENTER_H,
          color: themePrim,
          text: `Average:`
        });

        const gradeText = createWidget(widget.TEXT, {
          x: 0,
          y: y + 30 - op,
          w: 390,
          h: 120,
          align_h: align.CENTER_H,
          text_size: 60,
          color: sum < 5 ? 0xcc0000 : conf.theme.primText,
          text: `${aprox(sum.toFixed(1))}`
        });
        widgetsGrade.push(mediaBox)
        widgetsGrade.push(mediaText)
        widgetsGrade.push(gradeText)
      }
    }
    function renderGradesOnlyNum(subject) {
      console.log("DATAAAAAAAA")
      console.log("LEN: " + JSON.stringify(Grades[subject]));
      const subjectData = Grades[subject];

      // Iterar sobre las propiedades de la asignatura
      const subjectCur = Num[subject];
      const index = []; // Asegúrate de inicializar el array de índices
      const indexRev = [];
      let curKey = 0;
      console.log("FFFFFF")
      for (const key in subjectData) {
        if (subjectData[key] === 0 || key === "sizes") {
          index.push(curKey); // Agrega el índice al array de exclusión
        } else {
          indexRev.push(curKey)
        }
        curKey++;
      }
      let curGrade = 0;
      const values = [];
      let prompssCur = []
      console.log("DDD")
      try {
        for (const key in subjectCur) {
          if (index.indexOf(curGrade) === -1) { // Solo procesar si no está en el array de exclusión
            values.push(subjectCur[key]); // Agrega el valor válido a `values`
            prompssCur.push(promps[curGrade])
            console.log("FDFD")
          }
          curGrade++;
        }
      } catch (e) { }
console.log("PP")
      let total = []
      let displayIndex = 0; // Índice para los widgets visibles
      let dataTotal = 0
      console.log("S: " + JSON.stringify(subjectData))
      for (const key in subjectData) {
        console.log(key)
      }
      for (const key in subjectData) {
        // Verificar si el peso NO es 0
        if (subjectData[key] === 0 || key === "sizes") {
          console.log(`${key} tiene valor 0 o es irrelevante, no se mostrará`);
          continue; // Ignorar este campo y no incrementar displayIndex
        }

        const j = displayIndex; // Usar índice visible actual

        console.log(`displayIndex: ${displayIndex}, mostrando ${key}: ${subjectData[key]}`);
        let data = values[j];
        if (prompssCur[displayIndex] == "Exámenes") {
          data = average();  // Calcula la media ponderada
        }
        // Función para calcular la media ponderada
        if (prompssCur[displayIndex] == "Tareas") {
          if (Num[subject].taskWeight.indexOf("¿?") == true) {
            data = "¿?"
          } else {
            data = averageTwo()
          }
        }
        if (isNaN(data)) {
          data = "¿?"
        }
        function averageTwo() {
          let average = 0
          let count = 0
          for (let val in Num[subject][key]) {
            console.log("VALSIZES: " + val)
            if (!isNaN(Num[subject][key][val])) {
              average += Number((Num[subject][key][val]))
              count++
            }
          }
          let definitive = "¿?"
          if (count > 0) {
            let result = Number(average / count)
            definitive = Number(result) * ((Grades[subject][key]) / 100)
            definitive = definitive.toFixed(2)
          }
          return definitive
        }
        let total = [];
        total.push(data); // Ejemplo: valores únicos basados en `data`
        dataTotal = data
        console.log(total);
        // Crear el widget de texto
        displayIndex++; 
        
      }
      let sum = 0
      if (total.indexOf("¿?") == -1) {
        console.log("NEXT")
        for (const key in Num[subject]) {
          console.log("KEY: " + key)
          if (key == "examWeight" || key == "taskWeight" || Num[subject][key] != "¿?" && key != "sizes" && key != "attitudeWeight" && key != "customWeight") {
            if (key == "examWeight") {
              let sizes = Num[subject].sizes;  // Componentes de examen
              let filteredGrades = sizes
                .filter(item => item.grade !== "¿?")  // Filtra las calificaciones que no son "¿?"
                .map(item => parseFloat(item.grade));  // Convierte las calificaciones a números

              // Verifica si las calificaciones son válidas y realiza el cálculo de la media ponderada
              if (filteredGrades.length > 0) {
                console.log("GRADE: " + average(filteredGrades))
                if (!isNaN(average(filteredGrades))) {
                  sum += Number(average(filteredGrades)) * ((Grades[subject][key]) / 100);
                }  // Calcula la media ponderada*/
                //console.log("NUM: " + average(filteredGrades))
                //console.log("%%: " + ((Grades[subject][key]) / 100))
              } else {
                console.log("No hay calificaciones válidas para calcular la media.");
              }
            }else if (key == "taskWeight") {
              let average = 0
              let count = 0
              for (let val in Num[subject][key]) {
                console.log("VALSIZES: " + val)
                if (!isNaN(Num[subject][key][val])) {
                  average += Number((Num[subject][key][val]))
                  count++
                }
              }
              if (count > 0) {
                let result = Number(average / count)
                let definitive = Number(result) * ((Grades[subject][key]) / 100)
                sum += Number(definitive.toFixed(2))
                console.log("DEFINITIVE: " + result)
                console.log("%%%%%: " + ((Grades[subject][key]) / 100))
              }
            } else {
              sum += 0 // ;)
            }
          } else if (key == "attitudeWeight") {
            console.log("NUM: " + (Num[subject][key]))
            console.log("%%: " + ((Grades[subject][key]) / 100))
            console.log("TYPE: " + typeof Num[subject][key])
            console.log("KEY TYPE: " + key)
            if (!isNaN(Num[subject][key])) {
              sum += Number((Num[subject][key])) * ((Grades[subject][key]) / 100)
            }
          } else if (key == "customWeight") {
            if (!isNaN(Num[subject][key])) {
              sum += Number((Num[subject][key])) * ((Grades[subject][key]) / 100)
            }
          }
        }
      }
      console.log("SUM: " + sum)
      function average() {
        const subjectCur = Num[subject].sizes;  // Componentes de examen
        let weightedSum = 0;

        console.log("SUBJECT CUR: " + subjectCur.length)
        let verify = false
        // Calcula la suma ponderada
        console.log("ISTRUE")
        for (let key in Num[subject].sizes) {
          const weight = Number(Grades[subject].sizes[key].weight) / 100;  // Peso correspondiente al examen
          const grade = Number(Num[subject].sizes[key].grade);
          console.log("GRADE: " + JSON.stringify(grade))
          console.log("WEIGHT: " + JSON.stringify(weight))
          console.log("KEYCUR: " + key)
          // Filtra los datos como en averageTwo (verifica si el valor es un número)
          if (!isNaN(grade)) {  // Verifica que la calificación no sea NaN ni una cadena vacía
            weightedSum += (Number(grade) * Number(weight));  // Suma ponderada (calificación * peso)
            verify = true
          } else {
            console.log("INVALID GRADE: " + grade);  // Log de valor no válido
          }
        }
        if (verify == false) {
          return "¿?"
        }
        console.log("weightedSum: " + weightedSum)
        // Devuelve la suma ponderada redondeada a 2 decimales
        return parseFloat(weightedSum.toFixed(2));  // Media ponderada (suma ponderada / total de pesos)
      }
      if (typeof sum == "number" && sum >= 0) {
        return sum.toFixed(1)
      } else {
        return "¿?"
      }
    }
    
    function setGradePage(int, subject, type) {
      console.log("Int: " + int)
      if (type) {
        let UI = createWidget(widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 390,
          h: 450,
          color: conf.theme.bg
        });
        let UI2 = createWidget(widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 390,
          h: 45,
          color: conf.theme.UI
        })
        let desp = createWidget(widget.TEXT, {
          x: 0,
          y: 10,
          w: 390,
          h: 55,
          text: `${prompsEng[int]}: `,
          align_h: align.CENTER_H,
          text_size: 20,
          color: conf.theme.secText
        })
        let p = 0
      }
      let arr = 0
      if (int == 0) {
        let l = y
        y += 10
        const subjectData = Grades[subject].sizes
        const subjectCur = Num[subject].sizes;
        console.log("sub: " + JSON.stringify(Num[subject].sizes))
        console.log("sub2: " + JSON.stringify(subjectData))
        let curVal = 0
        for (const key in subjectData) {

          let txt = JSON.stringify(subjectData[key].name)
          let txtEng
          if (txt == "\"Examen 1\"") {
            txt = "Examen 1"
            txtEng = "Exam 1"
            arr = 1
          } else if (txt == "\"Examen 2\"") {
            txt = "Examen 2"
            txtEng = "Exam 2"
            arr = 2
          } else if (txt == "\"Examen 3\"") {
            txt = "Examen 3"
            txtEng = "Exam 3"
            arr = 3
          }
          let l = arr
          if (type) {
            createWidget(widget.FILL_RECT, {
              x: 10,
              y: y + 60 * p,
              w: 370,
              h: 50,
              radius: 10,
              color: conf.theme.slot
            }).addEventListener(event.CLICK_DOWN, () => {
              setGradeInt(l, subject);
            });
            createWidget(widget.TEXT, {
              x: 20,
              y: y + 60 * p + 5,
              w: 370,
              h: 50,
              text_size: 30,
              color: conf.theme.primText,
              text: `${txtEng}: `
            }).addEventListener(event.CLICK_DOWN, () => {
              setGradeInt(l, subject);
            });
            createWidget(widget.TEXT, {
              x: 290,
              y: y + 60 * p + 5,
              w: 370,
              h: 50,
              text_size: 30,
              color: Number(subjectCur[curVal].grade) < 5 ? 0xcc0000 : conf.theme.primText,
              text: `${subjectCur[curVal].grade}`
            }).addEventListener(event.CLICK_DOWN, () => {
              setGradeInt(l, subject);
            });
            p++;
          }
          curVal++
        }
      } else if (int == 2) {
        let y = 80;
        let cY = 0; // Contador para la posición vertical
        let arrTask = [...Num[subject].taskWeight]; // Copiar los elementos del array para iterar
        console.log("ARR: " + arrTask)
        let j = 0
        // Iterar sobre las tareas existentes
        arrTask.forEach((index) => {
          let k = j
          // Crear un fondo para cada tarea
          createWidget(widget.FILL_RECT, {
            x: 10,
            y: y + 60 * cY,
            w: 370,
            h: 50,
            radius: 10,
            color: conf.theme.slot
          }).addEventListener(event.CLICK_DOWN, () => {
            rendertaskGrades(k, subject); // Pasar el índice correspondiente
          });
          console.log("T: " + `${Num[subject].taskWeight}`)
          // Crear un texto con el nombre y el valor de la tarea
          createWidget(widget.TEXT, {
            x: 20,
            y: y + 60 * cY + 5,
            w: 370,
            h: 50,
            text_size: 30,
            color: conf.theme.primText,
            text: `Task ${j + 1}: `
          }).addEventListener(event.CLICK_DOWN, () => {
            rendertaskGrades(k, subject); // Pasar el índice correspondiente
          });
          createWidget(widget.TEXT, {
            x: 290,
            y: y + 60 * cY + 5,
            w: 370,
            h: 50,
            text_size: 30,
            color: Number(Num[subject].taskWeight[j]) < 5 ? 0xcc0000 : conf.theme.primText,
            text: `${Num[subject].taskWeight[j] || "¿?"}`
          }).addEventListener(event.CLICK_DOWN, () => {
            rendertaskGrades(k, subject); // Pasar el índice correspondiente
          });
          j++
          cY++; // Incrementar la posición para la próxima tarea
        });

        // Botón para añadir una nueva tarea
        createWidget(widget.IMG, {
          x: 390 / 2 - 50 / 2,
          y: (y + 60 * (cY + 1)) - 55,
          src: "plus.png"
        }).addEventListener(event.CLICK_DOWN, () => {
          Num[subject].taskWeight.push("¿?");
          saveJson("Num_keySch", Num)

          replace({
            url: 'pages/gradesView',
            param: JSON.stringify({
              preview: true,
              type: 'normal'
            })
          })
        });

      } else if (int == 1) {
        let y = 80;
        let p = 0;
        let wholeNumber = 5;
        let decimal = 5;
        if (Num[subject].attitudeWeight != "¿?") {
          wholeNumber = Num[subject].attitudeWeight.split('.')[0];
          decimal = Num[subject].attitudeWeight.split('.')[1];
        }
        let Rect = createWidget(widget.FILL_RECT, {
          x: 10,
          y: y - 10,
          w: 370,
          h: 165,
          radius: 10,
          color: conf.theme.slot
        })
        let w = []
        let info = createWidget(widget.TEXT, {
          x: 20,
          y: y + 25,
          w: 370,
          h: 120,
          text_size: 60,
          color: conf.theme.primText,
          text: "Grade:"
        });
        let xDec = 220
        let grade = createWidget(widget.TEXT, {
          x: xDec,
          y: y + 25,
          w: 125,
          h: 125,
          text_size: 60,
          color: conf.theme.primText,
          text: `${wholeNumber}.${decimal}`
        });
        let l = 50
        for (let i = 0; i < 2; i++) {
          let j = createWidget(widget.IMG, {
            x: xDec + (i * l),
            y: y + 5,
            src: "plusS.png"
          });
          j.addEventListener(event.CLICK_DOWN, () => {
            if (i == 0) {
              wholeNumber = (wholeNumber + 1) % 11;
              if (wholeNumber === 10) decimal = 0;
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            } else {
              decimal = (decimal + 1) % 11;
              if (wholeNumber === 10) decimal = 0;
              if (decimal === 10) decimal = 0;
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            }
          });
          w.push(j);
        }
        for (let i = 0; i < 2; i++) {
          let j = createWidget(widget.IMG, {
            x: xDec + (i * l),
            y: y + 105,
            src: "lessS.png"
          });
          j.addEventListener(event.CLICK_DOWN, () => {
            if (i == 0) {
              wholeNumber = (wholeNumber - 1) % 11;
              if (wholeNumber < 0) wholeNumber = 0
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            } else {
              decimal = (decimal - 1) % 11;
              if (decimal < 0) decimal = 0
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            }
          });
          w.push(j);
        }
        var themeUI = Config.theme.UI
        var themePrim = Config.theme.primText
        let ready = createWidget(widget.BUTTON, {
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
            Num[subject].attitudeWeight = `${wholeNumber}.${decimal}`
            saveJson("Num_keySch", Num)

            replace({
              url: 'pages/gradesView',
              param: JSON.stringify({
                preview: true,
                type: 'normal'
              })
            })
          }
        });
        function updateGradeText() {
          grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
        }
      } else if (int == 3) {
        let y = 80;
        let p = 0;
        let wholeNumber = 5;
        let decimal = 5;
        if (Num[subject].customWeight != "¿?") {
          wholeNumber = Num[subject].customWeight.split('.')[0];
          decimal = Num[subject].customWeight.split('.')[1];
        }
        let Rect = createWidget(widget.FILL_RECT, {
          x: 10,
          y: y - 10,
          w: 370,
          h: 165,
          radius: 10,
          color: conf.theme.slot
        })
        let w = []
        let info = createWidget(widget.TEXT, {
          x: 20,
          y: y + 25,
          w: 370,
          h: 120,
          text_size: 60,
          color: conf.theme.primText,
          text: "Grade:"
        });
        let xDec = 220
        let grade = createWidget(widget.TEXT, {
          x: xDec,
          y: y + 25,
          w: 125,
          h: 125,
          text_size: 60,
          color: conf.theme.primText,
          text: `${wholeNumber}.${decimal}`
        });
        let l = 50
        for (let i = 0; i < 2; i++) {
          let j = createWidget(widget.IMG, {
            x: xDec + (i * l),
            y: y + 5,
            src: "plusS.png"
          });
          j.addEventListener(event.CLICK_DOWN, () => {
            if (i == 0) {
              wholeNumber = (wholeNumber + 1) % 11;
              if (wholeNumber === 10) decimal = 0;
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            } else {
              decimal = (decimal + 1) % 11;
              if (wholeNumber === 10) decimal = 0;
              if (decimal === 10) decimal = 0;
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            }
          });
          w.push(j);
        }
        for (let i = 0; i < 2; i++) {
          let j = createWidget(widget.IMG, {
            x: xDec + (i * l),
            y: y + 105,
            src: "lessS.png"
          });
          j.addEventListener(event.CLICK_DOWN, () => {
            if (i == 0) {
              wholeNumber = (wholeNumber - 1) % 11;
              if (wholeNumber < 0) wholeNumber = 0
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            } else {
              decimal = (decimal - 1) % 11;
              if (decimal < 0) decimal = 0
              grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
            }
          });
          w.push(j);
        }
        var themeUI = Config.theme.UI
        var themePrim = Config.theme.primText
        let ready = createWidget(widget.BUTTON, {
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
            Num[subject].customWeight = `${wholeNumber}.${decimal}`
            saveJson("Num_keySch", Num)

            replace({
              url: 'pages/gradesView',
              param: JSON.stringify({
                preview: true,
                type: 'normal'
              })
            })
          }
        });

        grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });

      }
      if (type) return arr;
    }
    function getNum(subject) {
      const subjectData = Grades[subject].sizes
      console.log("subTest: " + JSON.stringify(subjectData))
      let arr = 0;
      for (const key in subjectData) {

        let txt = JSON.stringify(subjectData[key].name)
        if (txt == "\"Examen 1\"") {
          txt = "Examen 1"
          arr = 1
        } else if (txt == "\"Examen 2\"") {
          txt = "Examen 2"
          arr = 2
        } else if (txt == "\"Examen 3\"") {
          txt = "Examen 3"
          arr = 3
        }
      }
      return arr;
    }
    function setGradeInt(arr, subject) {
      let y = 80;
      let p = 0;
      let wholeNumber = 5;
      let decimal = 5;
      if (Num[subject].sizes[arr - 1].grade != "¿?") {
        wholeNumber = Num[subject].sizes[arr - 1].grade.split('.')[0];
        decimal = Num[subject].sizes[arr - 1].grade.split('.')[1];
      }
      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG
      });
      let UI2 = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 45,
        color: conf.theme.UI
      })
      let desp = createWidget(widget.TEXT, {
        x: 0,
        y: 10,
        w: 390,
        h: 55,
        text: `Exam ${arr}: `,
        align_h: align.CENTER_H,
        text_size: 20,
        color: conf.theme.secText
      })
      let Rect = createWidget(widget.FILL_RECT, {
        x: 10,
        y: y - 10,
        w: 370,
        h: 165,
        radius: 10,
        color: conf.theme.slot
      })
      let w = []
      let info = createWidget(widget.TEXT, {
        x: 20,
        y: y + 25,
        w: 370,
        h: 120,
        text_size: 60,
        color: conf.theme.primText,
        text: "Grade:"
      });
      let xDec = 220
      let grade = createWidget(widget.TEXT, {
        x: xDec,
        y: y + 25,
        w: 125,
        h: 125,
        text_size: 60,
        color: conf.theme.primText,
        text: `${wholeNumber}.${decimal}`
      });
      let l = 50
      for (let i = 0; i < 2; i++) {
        let j = createWidget(widget.IMG, {
          x: xDec + (i * l),
          y: y + 5,
          src: "plusS.png"
        });
        j.addEventListener(event.CLICK_DOWN, () => {
          if (i == 0) {
            wholeNumber = (wholeNumber + 1) % 11;
            if (wholeNumber === 10) decimal = 0;
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          } else {
            decimal = (decimal + 1) % 11;
            if (wholeNumber === 10) decimal = 0;
            if (decimal === 10) decimal = 0;
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          }
        });
        w.push(j);
      }
      for (let i = 0; i < 2; i++) {
        let j = createWidget(widget.IMG, {
          x: xDec + (i * l),
          y: y + 105,
          src: "lessS.png"
        });
        j.addEventListener(event.CLICK_DOWN, () => {
          if (i == 0) {
            wholeNumber = (wholeNumber - 1) % 11;
            if (wholeNumber < 0) wholeNumber = 0
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          } else {
            decimal = (decimal - 1) % 11;
            if (decimal < 0) decimal = 0
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          }
        });
        w.push(j);
      }
      var themeUI = Config.theme.UI
      var themePrim = Config.theme.primText
      let ready = createWidget(widget.BUTTON, {
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
          Num[subject].sizes[arr - 1].grade = `${wholeNumber}.${decimal}`
          saveJson("Num_keySch", Num)

          replace({
            url: 'pages/gradesView',
            param: JSON.stringify({
              preview: true,
              type: 'normal'
            })
          })
        }
      });
      grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
    }
    function rendertaskGrades(arr, subject) {
      let y = 80;
      let p = 0;
      let wholeNumber = 5;
      let decimal = 0;
      if (Num[subject].taskWeight[arr] != "¿?") {
        wholeNumber = Num[subject].taskWeight[arr].split('.')[0];
        decimal = Num[subject].taskWeight[arr].split('.')[1];
      }
      const subjectCur = Num[subject].taskWeight;
      const values = [];
      let curGrade = 0
      for (const key in subjectCur) {
        values.push(subjectCur[key]); // Agrega el valor válido a `values`
        curGrade++;
      }
      console.log("val: " + values)
      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: conf.theme.bg
      });
      let UI2 = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 45,
        color: conf.theme.UI
      })
      let desp = createWidget(widget.TEXT, {
        x: 0,
        y: 10,
        w: 390,
        h: 55,
        text: `Task ${arr + 1}: `,
        align_h: align.CENTER_H,
        text_size: 20,
        color: conf.theme.secText
      })
      let Rect = createWidget(widget.FILL_RECT, {
        x: 10,
        y: y - 10,
        w: 370,
        h: 165,
        radius: 10,
        color: conf.theme.slot
      })
      let w = []
      let info = createWidget(widget.TEXT, {
        x: 20,
        y: y + 25,
        w: 370,
        h: 120,
        text_size: 60,
        color: conf.theme.primText,
        text: "Grade:"
      });
      let xDec = 220
      let grade = createWidget(widget.TEXT, {
        x: xDec,
        y: y + 25,
        w: 125,
        h: 125,
        text_size: 60,
        color: conf.theme.primText,
        text: `${wholeNumber}.${decimal}`
      });
      let l = 50
      for (let i = 0; i < 2; i++) {
        let j = createWidget(widget.IMG, {
          x: xDec + (i * l),
          y: y + 5,
          src: "plusS.png"
        });
        j.addEventListener(event.CLICK_DOWN, () => {
          if (i == 0) {
            wholeNumber = (wholeNumber + 1) % 11;
            if (wholeNumber === 10) decimal = 0;
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          } else {
            decimal = (decimal + 1) % 11;
            if (wholeNumber === 10) decimal = 0;
            if (decimal === 10) decimal = 0;
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          }
        });
        w.push(j);
      }
      for (let i = 0; i < 2; i++) {
        let j = createWidget(widget.IMG, {
          x: xDec + (i * l),
          y: y + 105,
          src: "lessS.png"
        });
        j.addEventListener(event.CLICK_DOWN, () => {
          if (i == 0) {
            wholeNumber = (wholeNumber - 1) % 11;
            if (wholeNumber < 0) wholeNumber = 0
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          } else {
            decimal = (decimal - 1) % 11;
            if (decimal < 0) decimal = 0
            grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
          }
        });
        w.push(j);
      }
      var themeUI = Config.theme.UI
      var themePrim = Config.theme.primText
      let ready = createWidget(widget.BUTTON, {
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
          values[arr] = `${wholeNumber}.${decimal}`
          console.log("ARR: " + arr)
          Num[subject].taskWeight = values
          saveJson("Num_keySch", Num)

          replace({
            url: 'pages/gradesView',
            param: JSON.stringify({
              preview: true,
              type: 'normal'
            })
          })
        }
      });
      grade.setProperty(prop.MORE, { text: `${wholeNumber}.${decimal}` });
    }

    function saveJson(filename, json) {
      writeFile(filename, json);
    }
    function writeFile(filename, data) {
      console.log("SAVING")
      console.log("file: " + filename)
      console.log("data: " + JSON.stringify(data))
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
    function aprox(num) {
      num = Number(num)
      if (Number.isInteger(num)) {
        // Si es un número entero, lo mostramos sin decimales
        return num.toString().split(".")[0];
      } else {
        // Si no es un número entero, lo mostramos tal cual
        return num
      }
    }
    function renderWeights(subject) {
      let tasks = Grades[subject].taskWeight
      let exams = Grades[subject].examWeight
      let attitude = Grades[subject].attitudeWeight
      let custom = Grades[subject].customWeight
      let sizes = Grades[subject].sizes
      const subjectData = {
        examWeight: exams, // Peso por defecto para exámenes
        attitudeWeight: attitude, // Peso por defecto para actitud
        taskWeight: tasks, // Peso por defecto para tareas
        customWeight: custom, // Peso personalizado
        examComponents: sizes
      }
      let offsetY = 120;
      let dec = 5
      let max = 370
      let UI = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG
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
      let customOn = false

      let progressBar = createWidget(widget.FILL_RECT, {
        x: 10,
        y: offsetY,
        w: max,
        h: 10,
        color: themeSlot, // Fondo de la barra de progreso
        radius: 5,
      });
      let WC = subjectData.attitudeWeight + subjectData.taskWeight + subjectData.examWeight
      if(Grades[subject].customWeight > 0){
        customOn = true
      }
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
        color: themePrim, // Azul oscuro
        align_h: align.CENTER
      });
      if (subjectData.customWeight > 0) { customOn = true }
      let a = createWidget(widget.BUTTON, {
        x: 10,
        y: 150,
        w: 170,
        h: 50,
        text: `Exams: ${subjectData.examWeight}%`,
        normal_color: themeSlot,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5, color: themePrim,
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
        normal_color: themeSlot,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        color: themePrim,
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
        normal_color: themeSlot,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        color: themePrim,
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
        normal_color: customOn == false ? themeSlot : 0x00ff00,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        color: themePrim,
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
        src: customOn == true ? "ticked.png" : color(themeBG) == true ? "unticked.png" : "unticked2.png"
      })
      console.log("COLOR: " + color(themeBG) == true)
      k.addEventListener(event.CLICK_DOWN, () => {
        customOn = !customOn;
        k.setProperty(prop.MORE, {
          src: customOn == true ? "ticked.png" : color(themeBG) == true ? "unticked.png" : "unticked2.png"
        })
        d.setProperty(prop.MORE, {
          x: 10,
          y: 290,
          w: 170,
          h: 50,
          normal_color: customOn == false ? themeSlot : 0x00ff00
        })
        subjectData.customWeight = 0
        d.setProperty(prop.MORE, {
          x: 10,
          y: 290,
          w: 170,
          h: 50,
          text: `Separate grade: ${subjectData.customWeight}%`,
        })
        Bar()
      })
      let infoRest = createWidget(widget.IMG, {
        x: 370 - 50 - nhm,
        y: 295,
        src: "info.png"
      })
      function color(hexColor) {
        // Quitar el símbolo "#" si existe
        hexColor = hexColor.replace('0x', '');

        // Convertir el color HEX a valores R, G, B
        let r = parseInt(hexColor.substring(0, 2), 16);
        let g = parseInt(hexColor.substring(2, 4), 16);
        let b = parseInt(hexColor.substring(4, 6), 16);

        // Convertir a luminancia relativa usando el estándar de percepción
        let luminancia = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Determinar si el color es claro u oscuro
        return luminancia > 128; // 128 es un valor intermedio para decidir
      }
      infoRest.addEventListener(event.CLICK_DOWN, () => {
        let BG = createWidget(widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 390,
          h: 450,
          color: themeBG
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
          color: themePrim
        })
        let title = createWidget(widget.TEXT, {
          x: 0,
          y: 10,
          w: 390,
          h: 80,
          align_h: align.CENTER_H,
          text: "Separate grade:",
          text_size: 40,
          color: themeSec
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
      let num = sizes.length
      // Botón para salir del diálogo
      let j = createWidget(widget.BUTTON, {
        x: 30,
        y: 360,
        w: 330,
        h: 50,
        text: "Exams number: " + num,
        normal_color: themeSlot,
        press_color: 0xd9f2e6, // Verde claro al presionar
        color: themePrim,
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
            var saves = []
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
        h: 50,
        color: themePrim,
        text: "Exams details",
        normal_color: themeSlot,
        press_color: 0xd9f2e6, // Verde claro al presionar
        radius: 5,
        click_func: () => {
          if (num > 1) {
            showExamComponentsDialog(num);
          } else {
            showToast({ text: "Set unless to exams to modify it" });
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
          let percentaje = subjectData.attitudeWeight + subjectData.taskWeight + subjectData.examWeight
          if (customOn) { percentaje += subjectData.customWeight }
          if (percentaje == 100 && subjectData.examComponents.length != 0 || percentaje == 100 && subjectData.examComponents.length == undefined) {
            Grades[subject] = {
              examWeight: subjectData.examWeight,
              attitudeWeight: subjectData.attitudeWeight,
              taskWeight: subjectData.taskWeight,
              customWeight: subjectData.customWeight,
              sizes: subjectData.examComponents
            };
            console.log("GRADES: " + JSON.stringify(subjectData))
            let num = getNum(subject)
            function getNum(subject) {
              const subjectData = Grades[subject].sizes
              console.log("subTest: " + JSON.stringify(subjectData))
              let arr = 0;
              for (const key in subjectData) {

                let txt = JSON.stringify(subjectData[key].name)
                if (txt == "\"Examen 1\"") {
                  txt = "Examen 1"
                  arr = 1
                } else if (txt == "\"Examen 2\"") {
                  txt = "Examen 2"
                  arr = 2
                } else if (txt == "\"Examen 3\"") {
                  txt = "Examen 3"
                  arr = 3
                }
              }
              return arr;
            }
            let examComponents
            console.log(JSON.stringify(Num[subject]))
            if (num == 3) {
              examComponents = [
                {
                  grade:
                    Num[subject].sizes[0] &&
                      Num[subject].sizes[0].grade !== undefined &&
                      Num[subject].sizes[0].grade !== ""
                      ? Num[subject].sizes[0].grade
                      : "¿?",
                },
                {
                  grade:
                    Num[subject].sizes[1] &&
                      Num[subject].sizes[1].grade !== undefined &&
                      Num[subject].sizes[1].grade !== ""
                      ? Num[subject].sizes[1].grade
                      : "¿?",
                },
                {
                  grade:
                    Num[subject].sizes[2] &&
                      Num[subject].sizes[2].grade !== undefined &&
                      Num[subject].sizes[2].grade !== ""
                      ? Num[subject].sizes[2].grade
                      : "¿?",
                },
              ];
            } else if (num == 2) {
              examComponents = [
                {
                  grade:
                    Num[subject].sizes[0] &&
                      Num[subject].sizes[0].grade !== undefined &&
                      Num[subject].sizes[0].grade !== ""
                      ? Num[subject].sizes[0].grade
                      : "¿?",
                },
                {
                  grade:
                    Num[subject].sizes[1] &&
                      Num[subject].sizes[1].grade !== undefined &&
                      Num[subject].sizes[1].grade !== ""
                      ? Num[subject].sizes[1].grade
                      : "¿?",
                },
              ];
            } else if (num == 1) {
              examComponents = [
                {
                  grade:
                    Num[subject].sizes[0] &&
                      Num[subject].sizes[0].grade !== undefined &&
                      Num[subject].sizes[0].grade !== ""
                      ? Num[subject].sizes[0].grade
                      : "¿?",
                },
              ];
            }

            Num[subject] = {
              examWeight: Number(Grades[subject].examWeight) > 0 ? Num[subject].examWeight : "¿?",
              attitudeWeight: Number(Grades[subject].attitudeWeight) > 0 ? Num[subject].examWeight : "¿?",
              taskWeight: Number(Grades[subject].taskWeight) > 0 ? Num[subject].taskWeight : "¿?",
              customWeight: Number(Grades[subject].customWeight) > 0 ? Num[subject].customWeight : "¿?",
              sizes: examComponents
            };
            saveJson("crit_keySch", Grades)
            saveJson("Num_keySch", Num)
            push({ url: 'pages/init', param: '...' })
          } else if (subjectData.examComponents.length == 0 || subjectData.examComponents.length == undefined) {
            showToast({
              content: "Press \"Exams details\" and then \"Save\" to continue."
            })
          } else {
            showToast({
              content: "Data must sum a 100%."
            })
          }
        }
      })


      function showExamComponentsDialog(num) {
        let widgets = [];
        let UI = createWidget(widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 390,
          h: 450,
          color: themeBG // Mantiene el fondo original
        });

        // Título de la sección
        let header = createWidget(widget.TEXT, {
          x: 35,
          y: 10,
          w: 370,
          h: 40,
          text: "Exams components",
          text_size: 24,
          color: themePrim, // Azul oscuro
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
          color: conf.theme.triText, // Gris oscuro
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

        // Barra de progreso general
        let progressBar = createWidget(widget.FILL_RECT, {
          x: 10,
          y: offsetY,
          w: 370,
          h: 10,
          color: themeSlot, // Fondo de la barra de progreso
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
          color: themePrim, // Azul oscuro
          align_h: align.CENTER
        });
        widgets.push(progressText)

        // Actualización dinámica de la barra y del texto
        offsetY += 20;
        let names = ["Examen 1", "Examen 2", "Examen 3"]
        let namesT = ["Exam 1", "Exam 2", "Exam 3"]
        examComponents.forEach((component, idx) => {
          // Contenedor para cada componente
          let container = createWidget(widget.FILL_RECT, {
            x: 10,
            y: offsetY,
            w: 370,
            h: 60,
            color: themeSlot, // Fondo claro para el contenedor
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
            color: themePrim // Azul oscuro para texto
          });
          widgets.push(text);
          // Botón para incrementar el peso
          let plusButton = createWidget(widget.BUTTON, {
            x: 290,
            y: offsetY + 10,
            w: 60,
            h: 30,
            text: "+5%",
            color: themeSec,
            normal_color: themeUI,
            press_color: 0xd9f2e6, // Verde claro al presionar
            radius: 5,
            click_func: () => {
              // Calcula el peso total actual de todos los exámenes
              const totalWeight = examComponents.reduce((sum, c) => sum + c.weight, 0);

              if (totalWeight < 100 && component.tag != 7) {
                // Actualiza el peso del componente sumando 5%, asegurando que no supere el límite
                component.weight = Math.min(component.weight + 5, 100 - (totalWeight - component.weight));

                // Actualiza el texto del componente
                text.setProperty(prop.MORE, { text: `${name}: ${component.weight}%`, });

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
            color: themeSec,
            normal_color: themeUI,
            press_color: 0xd9f2e6, // Verde claro al presionar
            radius: 5,
            click_func: () => {
              if (component.weight > 0 && component.tag != 7) {
                component.weight = Math.max(component.weight - 5, 0);
                if (component.weight == 0) {
                  component.weight = 5
                  showToast({ content: "minimum weight: 5%. For remove it, set the number of exams to " + (component.tag - 1) })
                }
                text.setProperty(prop.MORE, { text: `${name}: ${component.weight}%`, });
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
          normal_color: themeUI,
          press_color: 0xd9f2e6, // Verde claro al presionar
          color: themeSec,
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
    }
  }
});