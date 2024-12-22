import { Time } from '@zos/sensor'
import { createWidget, widget, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { getProfile } from '@zos/user'
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL} from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
var iCan = false
var timeC
Page({
  state: {},
  onInit(params) {
    const paramsObj = JSON.parse(params)
    const { can, timeCur } = paramsObj
    if (can == true) {
      iCan = can
      timeC = timeCur
    }
  },
  build() {
    readFile("task_keySch")
    readFile("conf_keySch")
    readFile("crit_keySch")
    readFile("Num_keySch")
    if (iCan) {
      push({ url: 'pages/wakeUp', param: "..." })
    }
    var jsonBase = readFile("task_keySch")

    //var decodeJSON = decodeUint8Array(jsonBase);
    console.log("DEC: " +jsonBase)
console.log("MMMM")
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
    var jsonBase2 = readFile('self_task')


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
    if (Config.new == true) {
      push({ url: 'pages/profSelect', param: '...' })
    }
    Config.remindMe1.forEach(reminder => {
console.log("DATESSS:: " + JSON.stringify(Config.remindMe1))
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      console.log("TASK: " + task)

      console.log("DATE: " + fecha)
      tasks.forEach((task, index) => {
        if (sumD(fecha, 1) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe3.forEach(reminder => {

      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumD(fecha, 3) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe7.forEach(reminder => {

      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumD(fecha, 7) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe15.forEach(reminder => {

      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumD(fecha, 15) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe30.forEach(reminder => {

      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumM(fecha, 1) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe60.forEach(reminder => {

      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumM(fecha, 2) == sumD(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDay()), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    if (datesDisplay.length > 0 && Config.lastYear != time.getFullYear() && Config.lastMonth != time.getMonth() && Config.lastDay != time.getDay()) {
      push({ url: 'pages/anim', param: '...' })
    } else {

    }
    var day = time.getDay()
    const subjects = [
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
      "ICT",
      "Other"
    ]
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
    const categorizedSubjects = {
      "Natural sciencies": [
        "Biology",
        "Natural sciencies",
        "Ecología",
        "Ecotoxicología",
        "Inmunología",
        "Neurociencia",
        "Neuropsicología",
        "Nanomedicina",
        "Nanotecnología",
        "Odontología"
      ],
      "Social sciencies": [
        "Social sciencies",
        "Educación Physics",
        "Philosophy",
        "Geography",
        "Geography e History",
        "History",
        "Religion",
        "Antropología",
        "Antropología Aplicada",
        "Antropología Cultural",
        "Arqueología",
        "Ciencias Ambientales",
        "Ciencias Forenses",
        "Ciencias Políticas",
        "Comunicación Social",
        "Comercio Internacional",
        "Contabilidad",
        "Criminología",
        "Desarrollo Infantil",
        "Desarrollo Organizacional",
        "Desarrollo Sostenible",
        "Desarrollo Urbano",
        "Derecho",
        "Derecho Internacional",
        "Gestión Ambiental",
        "Gestión Cultural",
        "Gestión del Cambio",
        "Gestión de Proyectos",
        "Gestión de Recursos Naturales",
        "Gestión del Talento Humano",
        "History Contemporánea",
        "History del Arte",
        "History Natural",
        "Sociología",
        "Sociología del Trabajo",
        "Estudios Africanos",
        "Estudios Asiáticos",
        "Estudios Culturales",
        "Estudios Ancient languagesoamericanos"
      ],
      "Idiomas": [
        "French",
        "English",
        "Ancient languages",
        "Languaje",
        "Literature",
        "Alemán",
        "Italiano"
      ],
      "Maths": [
        "Maths",
        "Algebra Lineal",
        "Cálculo Diferencial",
        "Cálculo Integral",
        "Cálculo Numérico",
        "Maths Avanzadas",
        "Maths Discretas",
        "Maths Financieras",
        "Probabilidad y Estadística",
        "Estadística"
      ],
      "Economy": [
        "Economy",
        "Administración de Empresas",
        "Finanzas"
      ],
      "Music": [
        "Music"
      ],
      "Educación": [
        "Educación Plástica",
        "Educación Physics"
      ],
      "ICT": [
        "Technology",
        "Computer Science",
        "ICT"
      ],
      "Technical drawing": [
        "Technical drawing"
      ],
      "Physics": [
        "Physics",
        "Physics Aplicada",
        "Physics Clásica",
        "Physics Moderna",
        "Fisiología",
        "Fisioterapia"
      ],
      "Chemistry": [
        "Chemistry",
        "Chemistry Physics",
        "Chemistry Inorgánica",
        "Chemistry Orgánica"
      ],
      "Other": [
        "Artes Visuales",
        "Auditoría",
        "Bioética",
        "Bioética en la Investigación",
        "Energías Renovables",
        "Etica",
        "Emprendimiento",
        "Imagen y Sonido",
        "Ingeniería Civil",
        "Ingeniería Electrónica",
        "Ingeniería Industrial",
        "Ingeniería Mecánica",
        "Inteligencia Artificial",
        "Prácticas Empresariales",
        "Psicología",
        "Psicología Organizacional",
        "Relaciones Internacionales",
        "Salud Mental",
        "Salud Pública",
        "Salud Pública Global",
        "Teatro",
        "Técnicas de Comunicación",
        "Técnicas de Estudio",
        "Terapia Ocupacional",
        "Teoría de Números",
        "Teoría de Sistemas",
        "Teoría del Aprendizaje",
        "Teoría del Conocimiento",
        "Trabajo Social",
        "Veterinaria",
        "Vigilancia Epidemiológica",
        "Contemporaneidad",
        "Crítica Literaria"
      ]
    };

    function getSubjectGroup(subject) {
      for (const group in categorizedSubjects) {
        if (categorizedSubjects[group].includes(subject)) {
          return group;
        }
      }
      return "Asignatura no encontrada";
    }

    var Calendar = [
      Config.Schedule.Lun,
      Config.Schedule.Mar,
      Config.Schedule.Mie,
      Config.Schedule.Jue,
      Config.Schedule.Vie,
    ]
    var times = [
      Config.LunNumHour,
      Config.MarNumHour,
      Config.MieNumHour,
      Config.JueNumHour,
      Config.VieNumHour
    ];
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
      Config.VieNumHour,
    ]
    const { nickName } = getProfile()
    const isAdmin = nickName
    if (isAdmin == "flvluju") {
      Calendar = [
        ["English", "Technology", "Languaje", "Recreo", "Physics", "History", "Philosophy"],
        ["Maths", "ICT", "Philosophy", "Recreo", "Physics", "History", "English"],
        ["ICT", "History", "Philosophy", "Recreo", "Technology", "Maths", "Languaje", "Physics"],
        ["Languaje", "Maths", "History", "Recreo", "Technology", "ICT", "English"],
        ["English", "Languaje", "Tutoría", "Recreo", "ICT", "Maths", "Physics", "Technology"]
      ]
      initHour = ["8", "9", "10", "11", "11", "12", "13", "14"]
      endHour = ["9", "10", "11", "11", "12", "13", "14", "15"]
      initMinute = ["30", "25", "20", "15", "45", "40", "35", "30"]
      endMinute = ["25", "20", "15", "45", "40", "35", "30", "25"]
    }
    function locateTask(texto) {
      let regex = /(Maths|Languaje|Physics|Philosophy|History|English|Technology|ICT)/g;
      let resultados = texto.match(regex);
      return subjects.indexOf(resultados[0]);
    }
    function sumD(fecha, dias) {
      console.log("DATE: " + fecha)
      console.log("DAYS: " + dias)
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
    function readFile(filename) {
      let defaut
      if (filename == "conf_keySch") {
        defaut = {
          "addedSubjects": [],
          "LunNumMin": [],
          "MarNumMin": [],
          "MieNumMin": [],
          "JueNumMin": [],
          "VieNumMin": [],
          "LunNumHour": [],
          "MarNumHour": [],
          "MieNumHour": [],
          "JueNumHour": [],
          "VieNumHour": [],
          "theme": {
            "bg": "0xffffff",
            "UI": "0xee1907",
            "primText": "0x000000",
            "secText": "0xffffff",
            "slot": "0xdce8da",
            "triText": "0x535352"
          },
          "nightTheme": {
            "bg": "0x333333",
            "UI": "0xff4500",
            "primText": "0xffffff",
            "secText": "0x000000",
            "slot": "0x7f8a7d",
            "triText": "0xffffff"
          },
          "new": true,
          "numberTheme": 0,
          "autoBright": false,
          "autoDark": false,
          "languaje": 1,
          "remindMe": [],
          "remindMe1": [],
          "remindMe3": [],
          "remindMe7": [],
          "remindMe15": [],
          "remindMe30": [],
          "remindMe60": [],
          "dailyAppRemindMe": false,
          "autoDelete": false,
          "dailyLastDate": "",
          "profile": 1,
          "lastDay": "",
          "lastMonth": "",
          "lastYear": "",
          "Schedule": {
            "Lun": [],
            "Mar": [],
            "Mie": [],
            "Jue": [],
            "Vie": []
          },
          "colors": [],
          "lastMinLun": "",
          "lastHourLun": "",
          "lastMinMar": "",
          "lastHourMar": "",
          "lastMinMie": "",
          "lastHourMie": "",
          "lastMinJue": "",
          "lastHourJue": "",
          "lastMinVie": "",
          "lastHourVie": "",
          "modify": "",
          "alarMin": "",
          "alarmHour": "",
          "currentAlarm": "",
          "alarmMe": "",
          "customSubjects": [],
          "RestSubjects": [],
          "CardsOrder": [0, 1, 2, 3, 4, 5, 6, 7]
        }
      } else if (filename == "task_keySch" || filename == "self_task") {
        defaut = {
          "asignaturas": [
            {
              "nombre": "Maths",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            },
            {
              "nombre": "Languaje",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            },
            {
              "nombre": "English",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            },
            {
              "nombre": "Physics",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            },
            {
              "nombre": "Technology",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            },
            {
              "nombre": "ICT",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            },
            {
              "nombre": "History",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            },
            {
              "nombre": "Philosophy",
              "actividades": {
                "examenes": [],
                "tareas": [],
                "proyectos": []
              }
            }
          ],
          "fechas": [],
          "Events": [],
          "Done": []
        }
      } else if (filename == "crit_KeySch") {
        defaut = {}
      } else if (filename == "Num_keySch") {
        defaut = {}
      }
      console.log(filename)
      if(!localStorage.getItem(filename)){localStorage.setItem(filename, defaut);}
      console.log("K_f:" + JSON.stringify(localStorage.getItem(filename)))
      return localStorage.getItem(filename, defaut);
    }


    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
    }
    if (Config.dailyAppRemindMe == true && datesDisplay.length == 0 && buscarFecha(String(time.getDay()) + "/" + String(time.getMonth()) + "/" + String(time.getFullYear())) == true || Config.dailyAppRemindMe == true && datesDisplay == [] && buscarFecha(String(time.getDay()) + "/" + String(time.getMonth()) + "/" + String(time.getFullYear())) == true) {
      if (compareDates(new Date(time.getFullYear(), time.getMonth(), time.getDay()), new Date(Config.lastYear, Config.lastMonth, Config.lastDay)) || Config.lastYear == "") {
        Config.lastDay = time.getDay()
        Config.lastMonth = time.getMonth()
        Config.lastYear = time.getFullYear()
        writeFile("conf_keySch", Config)
        push({ url: 'pages/remind', param: '...' })
      } else {
      }
    } else {
    }
    function buscarFecha(fechaBuscada) {

      const data = decodeJSON


      const fechasEncontradas = [];
      const asignaturasEncontradas = [];
      const dev = [];


      data.asignaturas.forEach(asignatura => {

        const actividades = [
          ...asignatura.actividades.examenes,
          ...asignatura.actividades.tareas,
          ...asignatura.actividades.proyectos
        ];


        actividades.forEach(actividad => {


          if (actividad.indexOf("Fecha: " + fechaBuscada) !== -1) {


            fechasEncontradas.push(actividad);
            asignaturasEncontradas.push(asignatura.nombre);
          } else if (actividad.indexOf("Entrega: " + fechaBuscada) !== -1) {


            fechasEncontradas.push(actividad);
            asignaturasEncontradas.push(asignatura.nombre);
          }
        });
      });
      dev.push(fechasEncontradas);
      dev.push(asignaturasEncontradas);
      if (fechasEncontradas.length > 0) {
        return true;
      } else {
        return false;
      }
    };
    const tareas = extraerTareas(decodeJSON);
    const proyectos = extraerProyectos(decodeJSON);
    const examenes = extraerExames(decodeJSON);
    const tareasT = extraerTareasL(decodeJSON);
    const proyectosT = extraerProtectosL(decodeJSON);
    const examenesT = extraerExamesL(decodeJSON);
    function extraerTareas(data) {
      
      const tareasPorAsignatura = [];


      data.asignaturas.forEach(asignatura => {
        tareasPorAsignatura.push(asignatura.actividades.tareas);
      });



      return tareasPorAsignatura;
    }
    function extraerProyectos(data) {
      
      const proyectosPorAsignatura = [];


      data.asignaturas.forEach(asignatura => {
        const asignaturaProyectos = asignatura.actividades.proyectos
        proyectosPorAsignatura.push(asignaturaProyectos);
      });



      return proyectosPorAsignatura;
    }
    function extraerExames(data) {
      
      const examenesPorAsignatura = [];


      data.asignaturas.forEach(asignatura => {
        const asignaturaExames = asignatura.actividades.examenes
        examenesPorAsignatura.push(asignaturaExames);
      });

      return examenesPorAsignatura;
    }
    function extraerTareasL(data) {
      
      const tareasPorAsignatura = {};

      data.asignaturas.forEach(asignatura => {
        tareasPorAsignatura[asignatura.nombre] = asignatura.actividades.tareas;
      });


      const totalTareas = Object.values(tareasPorAsignatura).reduce((total, tareas) => {
        return total + tareas.length;
      }, 0);



      return totalTareas;
    }
    function extraerExamesL(data) {
      
      const examenesPorAsignatura = {};

      data.asignaturas.forEach(asignatura => {
        examenesPorAsignatura[asignatura.nombre] = asignatura.actividades.examenes;
      });


      const totalExames = Object.values(examenesPorAsignatura).reduce((total, examenes) => {
        return total + examenes.length;
      }, 0);



      return totalExames;
    }
    function extraerProtectosL(data) {
      
      const proyectosPorAsignatura = {};

      data.asignaturas.forEach(asignatura => {
        proyectosPorAsignatura[asignatura.nombre] = asignatura.actividades.proyectos;
      });


      const totalProyectos = Object.values(proyectosPorAsignatura).reduce((total, proyectos) => {
        return total + proyectos.length;
      }, 0);


      return totalProyectos;
    }
    var self = ecodeJSON;
    if (Config.autoDelete == true) {

      for (const asignatura in tareas) {
        if (tareas[asignatura].length > 0) {
          const indicesAEliminar = [];
          for (let i = 0; i < tareas[asignatura].length; i++) {
            const tarea = tareas[asignatura][i];

            var delDate;
            try {
              delDate = locateDate(tarea, 1);
            } catch (e) {

              delDate = "...";
            }
            if (delDate != "..." && compareDates(new Date(delDate), new Date(String(time.getDay()) + "-" + String(time.getMonth()) + "-" + String(time.getFullYear())))) {
              indicesAEliminar.push(i);
            }
          }
          for (let i = indicesAEliminar.length - 1; i >= 0; i--) {
            deleteElement(subjectsJson[asignatura], "tarea", indicesAEliminar[i]);
          }
        }
      }


      for (const asignatura in proyectos) {
        if (proyectos[asignatura].length > 0) {
          const indicesAEliminar = [];
          for (let i = 0; i < proyectos[asignatura].length; i++) {
            const proyecto = proyectos[asignatura][i];

            var delDate;
            try {
              delDate = locateDate(proyecto, 1);
            } catch (e) {

              delDate = "...";
            }
            if (delDate != "..." && compareDates(new Date(delDate), new Date(String(time.getDay()) + "-" + String(time.getMonth()) + "-" + String(time.getFullYear())))) {
              indicesAEliminar.push(i);
            }
          }


          for (let i = indicesAEliminar.length - 1; i >= 0; i--) {
            deleteElement(subjectsJson[asignatura], "proyecto", indicesAEliminar[i]);
          }
        }
      }


      for (const asignatura in examenes) {
        if (examenes[asignatura].length > 0) {
          const indicesAEliminar = [];
          for (let i = 0; i < examenes[asignatura].length; i++) {
            const examen = examenes[asignatura][i];

            var delDate;
            try {
              delDate = locateDate(examen, 1);
            } catch (e) {

              delDate = "...";
            }
            if (delDate != "..." && compareDates(new Date(delDate), new Date(String(time.getDay()) + "-" + String(time.getMonth()) + "-" + String(time.getFullYear())))) {
              indicesAEliminar.push(i);
            }
          }


          for (let i = indicesAEliminar.length - 1; i >= 0; i--) {
            deleteElement(subjectsJson[asignatura], "examen", indicesAEliminar[i]);
          }
        }
      }
    }


    function deleteElement(asignatura, tipoElemento, indiceElemento) {
      var data = self;




      const asignaturaData = data.asignaturas.find(asig => asig.nombre === asignatura);

      if (asignaturaData) {
        switch (tipoElemento) {
          case "tarea":
            if (indiceElemento >= 0 && indiceElemento < asignaturaData.actividades.tareas.length) {
              asignaturaData.actividades.tareas.splice(indiceElemento, 1);

            }
            break;

          case "examen":
            if (indiceElemento >= 0 && indiceElemento < asignaturaData.actividades.examenes.length) {
              asignaturaData.actividades.examenes.splice(indiceElemento, 1);

            }
            break;

          case "proyecto":
            if (indiceElemento >= 0 && indiceElemento < asignaturaData.actividades.proyectos.length) {
              asignaturaData.actividades.proyectos.splice(indiceElemento, 1);

            }
            break;

          default:

        }


        saveJson('task_keySch', data);
      }
    }


    function locateDate(texto, type) {
      if (type == 1) {
        let regex = /Entrega:\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/;
        let resultado = texto.match(regex);
        if (resultado) {
          let day = resultado[1];
          let month = resultado[2];
          let year = resultado[3];

          return `${day}-${month}-${year}`
        } else {

          return null;
        }
      } else if (type == 2) {
        let regex = /Fecha:\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/;
        let resultado = texto.match(regex);
        if (resultado) {
          let day = resultado[1];
          let month = resultado[2];
          let year = resultado[3];

          return `${day}-${month}-${year}`
        } else {

          return null;
        }
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
    function compareDates(date1, date2) {
      if (date1 > date2) {
        return false
      } else {
        return true
      }
    }
    setScrollMode({
      mode: SCROLL_MODE_SWIPER_HORIZONTAL,
      options: {
        height: 390,
        count: 2,
      },
    })
    const widgets = ["calendar", "calendarS", "tasks", "events", "grades2", "calc", "newTask", "conf"]
    let w = 267; // Ancho de los widgets
    let spacing = 80; // Espaciado entre widgets
    let startY = 10; // Posición inicial en Y
    
    for (let i = 0; i < widgets.length; i++) {
      let src = widgets[Config.CardsOrder[i]]
      let x = i >= 4 ? 390 + (390 / 2 - w / 2) : 390 / 2 - w / 2; // Ajustar posición en X (izquierda o derecha)
      let y = startY + (i % 4) * spacing; // Calcular posición en Y
    console.log("Y: " + y)
      let widgetT = createWidget(widget.IMG, {
        x: x,
        y: y + 40,
        src: src + ".png"
      })
    
      // Agregar el evento según la imagen
      widgetT.addEventListener(event.CLICK_DOWN, (info) => {
        switch (src) {
          case "calendar":
            push({ url: 'pages/calendar', param: '...' });
            break;
          case "calendarS":
            push({ url: 'pages/index', param: JSON.stringify({ preview: false, type: 'normal' }) });
            break;
          case "tasks":
            push({ url: 'pages/Tasks', param: '...' });
            break;
          case "events":
            push({ url: 'pages/Events', param: '...' });
            break;
          case "grades2":
            push({ url: 'pages/gradesView', param: '...' });
            break;
          case "calc":
            push({ url: 'pages/calc', param: '...' });
            break;
          case "newTask":
            if (Config.profile != 3) {
              push({ url: 'pages/newTask', param: '...' });
            } else {
              push({ url: 'pages/newTaskW', param: '...' });
            }
            break;
          case "conf":
            push({ url: 'pages/conf', param: '...' });
            break;
          default:
            console.error("No action defined for this widget");
        }
      });
    }
    var h = time.getHours()
    var min = time.getMinutes()
    var undefDays = [];
    for (let z = 0; z < times.length; z++) {
      if (times[z].length == 0) {
        undefDays.push(z);
      } else {
      }
    }
    let omittedDays = 0
    var sum = 0
    /*let rect = createWidget(widget.FILL_RECT, {
      x: 35,
      y: 340,
      w: 390 - 70,
      h: 90,
      color: themeSlot,
      radius: 15
    })
    let text = createWidget(widget.TEXT, {
      x: 5,
      y: 350,
      w: 390,
      h: 180,
      color: themePrim,
      text_size: 25,
      align_h: align.CENTER_H,
      text: "No hay ninguna clase en\neste momento"
    })
    let timeUI = createWidget(widget.TEXT, {
      x: 40,
      y: 350,
      w: 390,
      h: 180,
      color: themePrim,
      text_size: 25,
      align_h: align.CENTER_H,
      text: ""
    })
    var cF
    var iH
    var iM
    var eH
    var eM
    console.log("nickName: " + isAdmin)
    let is = isAdmin == "flvluju"
    console.log("verify: " + is)
    if (isAdmin == "flvluju") {
      console.log("pro admin is on app")
      console.log("pro admin is on app")
      console.log("pro admin is on app")
      cF = [
        ["English", "Technology", "Languaje", "Recreo", "Physics", "History", "Philosophy"],
        ["Maths", "ICT", "Philosophy", "Recreo", "Physics", "History", "English"],
        ["ICT", "History", "Philosophy", "Recreo", "Technology", "Maths", "Languaje", "Physics"],
        ["Languaje", "Maths", "History", "Recreo", "Technology", "ICT", "English"],
        ["English", "Languaje", "Tutoría", "Recreo", "ICT", "Maths", "Physics", "Technology"]
      ]
      iH = ["8", "9", "10", "11", "11", "12", "13", "14"]
      eH = ["9", "10", "11", "11", "12", "13", "14", "15"]
      iM = ["30", "25", "20", "15", "45", "40", "35", "30"]
      eM = ["25", "20", "15", "45", "40", "35", "30", "25"]
    } else {
      cF = Calendar
      iH = initHour
      iM = initMinute
      eH = endHour
      eM = endMinute
    }
    for (let j = 0; j < 5; j++) {
      if (undefDays.includes(j)) {
 
        omittedDays++;  
        continue;  
      }
      for (let i = 0; i < cF[j].length; i++) {
        if (getText() != -1) {
          let colourNum = subjectsJson.indexOf(cF[j][i])
          rect.setProperty(prop.MORE, {
            x: 35,
            y: 340,
            w: 390 - 70,
            h: 90,
            color: themeSlot,
            radius: 15
          })
          text.setProperty(prop.MORE, {
            x: 75,
            y: 350,
            w: 390,
            h: 90,
            color: themePrim,
            text_size: 26,
            text: cF[j][i]
          })
          timeUI.setProperty(prop.MORE, {
            x: 75,
            y: 382,
            w: 390,
            h: 40,
            color: themePrim,
            text_size: 18,
            text: iH[j][i] + ":" + iM[j][i] + " - " + get(eH[j][i + 1], "h", j) + ":" + get(eM[j][i + 1], "m", j)
          })
          createWidget(widget.FILL_RECT, {
            x: 45,
            y: 350,
            w: 10,
            h: 70,
            color: subjectsColors[colourNum],
            radius: 12
          })
        }
      }
    }*/
    function get(arr, t, index) {
      if (arr == undefined) {
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
    function getText() {
      const currentClass = getCurrentClass(h, min);
      return currentClass
    }
    function convertToMinutes(hour, minute) {
      return parseInt(hour) * 60 + parseInt(minute);
    }
    const lastsH = [
      Config.lastHourLun,
      Config.lastHourMar,
      Config.lastHourMie,
      Config.lastHourJue,
      Config.lastHourVie
    ]
    const lastsM = [
      Config.lastMinLun,
      Config.lastMinMar,
      Config.lastMinMie,
      Config.lastMinJue,
      Config.lastMinVie
    ]
    function getCurrentClass(currentHour, currentMinute) {
      const currentTime = convertToMinutes(currentHour, currentMinute);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < Calendar[j].length; j++) {
          const classStart = convertToMinutes(initHour[i][j], initMinute[i][j]);
          const classEnd = convertToMinutes(get(endHour[j][i + 1], "h", j), get(endHour[j][i + 1], "m", j));
          if (currentTime >= classStart && currentTime <= classEnd) {
            return i + 1;
          }
        }
      }
      return -1;
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
    console.log("dates: " + datesDisplay)
  },
  onDestroy() {
   offGesture()

    vibrate && vibrate.stop()
  },
});
