import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { Vibrator} from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { replace } from '@zos/router'
import {offGesture } from '@zos/interaction'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    setStatusBarVisible(false)
    //setLayerScrolling(false)
    const time = new Time()
    var months =
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
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

    var jsonBase = readFile('task_keySch')

    var decodeJSON = jsonBase

    function decodeUint8Array(uint8array) {
      let decodedString = "";


      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    } var conf = readFile("conf_keySch")



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
    function readFile(filename) {
      return localStorage.getItem(filename);
    }
    
    
    var dates = decodeJSON.fechas
    var year, month, week;
    let cYear = time.getFullYear(), cMonth = time.getMonth(), cWeek = time.getDay(), cDay = time.getDay();

    if (cYear != year || cMonth != month) {
      year = cYear, month = cMonth;
      week = (cWeek + 35 - (cDay - 1)) % 7;
    }
    function getFirstDayOfMonth(year, month) {
      let date = new Date(year, month - 1, 1);
      return date.getDay();
    }

    function getDayNum(year, month) {
      return new Date(year, month, 0).getDate();
    }
    var impt = []
    var xr = []
    var yr = []
    function reColor() {
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
          let index = i + j * 7;
          impt[index].setProperty(prop.MORE, {
            x: xr[i],
            y: yr[index],
            src: ".png",
          });
        }
      }
    }
    var color = 0xea780d
    function renderCalendar(year, month) {
      let str = '\n\n\n\n';
      let firstDay = getFirstDayOfMonth(year, month);
      let dayNum = getDayNum(year, month);
      firstDay = (firstDay + 6) % 7;
      console.log("FIRST: " + firstDay)
      var initI = 1
      let cWeek = firstDay;
      reColor()
      var counter = 0
      let count = 0
      if (firstDay == 6) { // Cuando el primer día es domingo, ajustamos el cálculo
        count = firstDay + 1;  // Ajusta el valor de 'count' para la primera semana
     }
      if (cWeek == 5) {
        initI += 2
        cWeek = -1
      }
      if (cWeek == 6) {
        initI += 1
        cWeek = -1
      }
      for (let i = 0; i < firstDay + initI - 1; i++) {
        if (initI == 1) {
          str += '          ';
          count++
        } else {
          if (i == 0) {
            str += "\n"
          }
          cWeek = 0
        }
      }
      for (let i = initI; i <= dayNum; i++, cWeek++) {
        count++
        if (i < 10) str += '0';
        str += i + '     ';
        if (cWeek >= 4) {
          str += '\n';
          cWeek = -1
          i += 2;
          count += 2
          counter++
        }
      }

      calendar.setProperty(prop.MORE, {
        text: str
      });
      monthShow.setProperty(prop.MORE, {
        text: months[month - 1] + ' ' + year
      });


    }
      function renderEvents(year, month) {
        let str = '\n\n\n\n';
        let firstDay = getFirstDayOfMonth(year, month);
        let dayNum = getDayNum(year, month);
        firstDay = (firstDay + 6) % 7; // Ajusta para que domingo sea 6
        console.log("FIRST: " + firstDay);
      
        let initI = 1;
        let cWeek = firstDay; // Controla el día de la semana actual
        reColor();
        let count = 0;
      
        // Espacios iniciales antes del primer día del mes
        for (let i = 0; i < firstDay; i++) {
          str += '          '; // Espacios para días vacíos
          count++;
        }
      
        // Generar los días del mes
        for (let i = 1; i <= dayNum; i++, cWeek++) {
          count++;
          if (i < 10) str += '0'; // Agregar 0 para días del 1 al 9
          str += i + '     '; // Agregar el número del día
      
          let renderDate = String(i) + "/" + String(month) + "/" + String(year);
      
          if (dates.includes(renderDate)) {
            let array = buscarTipoFecha(renderDate);
      console.log("ARRAY: " + array)
            const setPropertiesForAll = (count, src) => {
              const impts = impt;
              const xrs = xr;
              const yrs = yr;
              impts[count - 1].setProperty(prop.MORE, {
                x: xrs[count - 1],
                y: yrs[count - 1],
                src: "CalendarEvents/" + src + ".png",
              });
            };
      
            let src = "";
            if (array.length === 1) {
              src = array.includes(1) ? "b" : array.includes(2) ? "g" : "r";
            } else if (array.length === 2) {
              if (array.includes(1) && array.includes(3)) src = "br";
              else if (array.includes(1) && array.includes(2)) src = "bg";
              else if (array.includes(2) && array.includes(3)) src = "gr";
            } else if (array.length === 3) {
              src = "bgr";
            }
      
            setPropertiesForAll(count, src);
            events[count - 1].addEventListener(event.CLICK_UP, function (info) {
              let data = buscarFecha(renderDate);
              renderPageDate(data, renderDate);
            });
          }
      
          // Cambio de línea después del domingo
          if (cWeek >= 6) {
            str += '\n';
            cWeek = -1; // Reinicia el contador de días de la semana
          }
        }
      
        // Configurar el texto del calendario
      }
      
    var colorv = 0xb1cdd0
    function renderCalendarEnd(year, month) {
      let str = '\n\n\n\n';
      let firstDay = getFirstDayOfMonth(year, month);
      let f = (firstDay + 6) % 7;
      let dayNum = getDayNum(year, month);

      if (firstDay == 0) {
        str += "          "
      }
      let mult = 1
      let count = (firstDay + 6) % 7
      if (firstDay == 6) { // Cuando el primer día es domingo, ajustamos el cálculo
        count = firstDay + 1;  // Ajusta el valor de 'count' para la primera semana
     }
      //console.log("initCount: " + count)
      var add = 0
      for (let i = 1; i <= dayNum; i++) {
        let dayOfWeek = new Date(year, month - 1, i).getDay();
        dayOfWeek = (dayOfWeek + 6) % 7;
        if (dayOfWeek === 5 || dayOfWeek === 6) {
          count++
          if (i < 10) str += '0';
          str += i + '     ';   
        } else {
          if (add < 1) {
          }
        }
        if (dayOfWeek === 6) {
          count += 5
          str += '\n';
          add++
        }
      }
      calendarEnd.setProperty(prop.MORE, {
        text: str
      });
    }
    function renderPageDate(data, date) {
      console.log("DATA: " + data)
      createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        h: 1111,
        w: 390,
        color: themeBG,
      })
      let maskMonth = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 70,
        color: themeUI
      })
      createWidget(widget.TEXT, {
        x: 40,
        y: 20,
        w: 255,
        h: 70,
        text: `Filtered: ${date}`,
        text_size: 25,
        color: themeSec
      })
      let refresh = createWidget(widget.IMG, {
        x: 390 - 98,
        y: 5,
        src: "refresh.png"
      }).addEventListener(event.CLICK_DOWN, (info) => {
        replace({ url: 'pages/calendar', param: '...' })
      })
      for (let i = 0; i < data[0].length; i++) {
        let txt = data[0][i].substring(0, data[0][i].indexOf("!"))
        createWidget(widget.FILL_RECT, {
          x: 10,
          y: 120 + 85 * i,
          w: 370,
          h: 80,
          radius: 12,
          color: themeSlot
        })
        let colourNum = subjectsJson.indexOf(data[1][i])
        createWidget(widget.FILL_RECT, {
          x: 20,
          y: 130 + 85 * i,
          w: 10,
          h: 60,
          color: subjectsColors[colourNum],
          radius: 12
        })
        createWidget(widget.TEXT, {
          x: 40,
          y: 125 + 85 * i,
          w: 390 - 20,
          h: 80,
          color: themePrim,
          text: txt,
          text_size: txt.indexOf("exercises") != -1 ? 17 : 18
        })
        createWidget(widget.FILL_RECT, {
          x: 350,
          y: 130 + 85 * i,
          w: 24,
          h: 7,
          color: txt.indexOf("exam") != -1 ? colorsT[0] : txt.indexOf("exercises") != -1 ? colorsT[1] : colorsT[2],
          radius: 3,
        })
      }
    }
    let mask = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG
    });
    let maskweekend = createWidget(widget.FILL_RECT, {
      x: 243,
      y: 147,
      w: 80,
      h: 160,
      radius: 12,
      color: themeSlot
    });
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 7; i++) {
        let p = 21
        var widgett = createWidget(widget.IMG, {
          x: i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40,
          y: (184 + p) - 8 + j * 26,
          src: ".png"
        })
        xr.push(i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40)
        yr.push((184 + p) - 8 + j * 26)
        impt.push(widgett)
      }
    }
    let maskMonth = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 70,
      color: themeUI
    });
    let dateCover = createWidget(widget.TEXT, {
      x: 50,
      y: 338,
      w: 81,
      h: 21,
    });
    var colorsT = [
      0x0004ff,
      0x09ff01,
      0xff0000
    ]
    let calendarDays = createWidget(widget.TEXT, {
      x: 2 + 390 / 8,
      y: 70,
      w: 390,
      h: 350,
      color: themePrim,
      text: `\n\n\nM        T       W       T        F`,
      text_size: 18,
      text_style: text_style.WRAP
    });
    let calendarDaysEnd = createWidget(widget.TEXT, {
      x: 2 + 390 / 8,
      y: 70,
      w: 390,
      h: 350,
      color: themeUI,
      text: `\n\n\n                                                     S       S`,
      text_size: 18,
      text_style: text_style.WRAP
    });
    let calendar = createWidget(widget.TEXT, {
      x: 2 + 390 / 8,
      y: 70,
      w: 300,
      h: 420,
      color: Config.theme.triText,
      text_size: 18,
      text_style: text_style.WRAP
    });
    let calendarEnd = createWidget(widget.TEXT, {
      x: 2 + 250,
      y: 70,
      w: 200,
      h: 350,
      color: 0xf96053,
      text_size: 18,
      text_style: text_style.WRAP
    });
    var events = []
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 7; i++) {
        var widgett = createWidget(widget.IMG, {
          x: i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40,
          y: 184 - 8 + j * 26,
          w: 24,
          h: 24,
          src: ".png"
        })
        events.push(widgett)
      }
    }
    let monthShow = createWidget(widget.TEXT, {
      x: 100,
      y: 10,
      w: 192,
      h: 40,
      color: themeSec,
      text_size: 30,
      align_h: align.CENTER_H,
    });
    dateCover.addEventListener(event.CLICK_UP, function (info) {

      let cYear = time.getFullYear(), cMonth = time.getMonth(), cWeek = time.getDay(), cDay = time.getDay();

      if (cYear != year || cMonth != month) {
        year = cYear, month = cMonth;
        week = (cWeek + 35 - (cDay - 1)) % 7;
        renderCalendar(year, month)
      }
    });
    function buscarFecha(fechaBuscada) {

      const data = decodeJSON;


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
          if (actividad.indexOf("Date: " + fechaBuscada) !== -1) {
            fechasEncontradas.push(actividad);
            asignaturasEncontradas.push(asignatura.nombre);
          } else if (actividad.indexOf("Deadline: " + fechaBuscada) !== -1) {
            fechasEncontradas.push(actividad);
            asignaturasEncontradas.push(asignatura.nombre);
          }
        });
      });


      dev.push(fechasEncontradas);
      dev.push(asignaturasEncontradas);


      if (fechasEncontradas.length > 0) {
        return dev;
      } else {
        return dev;
      }
    }
    console.log("decode: " + JSON.stringify(decodeJSON, null, 2));
    function buscarTipoFecha(fechaBuscada) {
      const data = decodeJSON;
      let arrrr = []; // Almacena los tipos de actividad asociados a la fecha buscada
    
      for (let asignatura of data.asignaturas) {
        const { examenes, tareas, proyectos } = asignatura.actividades;
    
        // Procesar Exams
        for (let examen of examenes) {
          let actividadLimpia = examen.replace(/\s+/g, ' ').trim(); // Eliminar espacios extra
          const tieneFecha = actividadLimpia.includes("Date: " + fechaBuscada);
          const tieneEntrega = actividadLimpia.includes("Deadline: " + fechaBuscada);
    
          if (tieneFecha || tieneEntrega) {
            console.log(`Exam encontrado: ${actividadLimpia}`);
            arrrr.push(1); // "1" para "exam"
          }
        }
    
        // Procesar Tareas
        for (let tarea of tareas) {
          let actividadLimpia = tarea.replace(/\s+/g, ' ').trim();
          const tieneFecha = actividadLimpia.includes("Date: " + fechaBuscada);
          const tieneEntrega = actividadLimpia.includes("Deadline: " + fechaBuscada);
    
          if (tieneFecha || tieneEntrega) {
            console.log(`Task encontrada: ${actividadLimpia}`);
            arrrr.push(2); // "2" para "exercises"
          }
        }
    
        // Procesar Proyectos
        for (let proyecto of proyectos) {
          let actividadLimpia = proyecto.replace(/\s+/g, ' ').trim();
          const tieneFecha = actividadLimpia.includes("Date: " + fechaBuscada);
          const tieneEntrega = actividadLimpia.includes("Deadline: " + fechaBuscada);
    
          if (tieneFecha || tieneEntrega) {
            console.log(`Proyecto encontrado: ${actividadLimpia}`);
            arrrr.push(3); // "3" para "proyect"
          }
        }
      }
    
      // Eliminar duplicados en los tipos detectados
      arrrr = eliminarDuplicados(arrrr);
    
      return arrrr.length > 0 ? arrrr : 0;
    }
    
    function eliminarDuplicados(array) {
      return [...new Set(array)];
    }

    function preButtonClick(button) {
      if (month == 1) year--, month = 12;
      else month--;
      let day = getDayNum(year, month);
      week = (week + 35 - day) % 7;
      if (week == 0) week = 7;
      renderCalendar(year, month)
      renderCalendarEnd(year, month);
      renderEvents(year, month)
    }
    let preButton = createWidget(widget.BUTTON, {
      x: 0,
      y: 450 - 80,
      w: 390 / 2,
      h: 80,
      press_color: 0xe9efe8,
      normal_color: themeSlot,
      color: themePrim,
      text_size: 33,
      text: 'Prev.',
      click_func: preButtonClick
    });
    function nextButtonClick(button) {
      let day = getDayNum(year, month);
      if (month == 12) year++, month = 1;
      else month++;
      week = (week + day) % 7;
      if (week == 0) week = 7;
      console.log("DATE: " + week, month, year)
      renderCalendar(year, month);
      renderCalendarEnd(year, month);
      renderEvents(year, month)
    };
    let nextButton = createWidget(widget.BUTTON, {
      x: 390 / 2,
      y: 370,
      w: 390 / 2,
      h: 80,
      press_color: 0xe9efe8,
      normal_color: themeSlot,
      color: themePrim,
      text_size: 33,
      text: 'Next.',
      click_func: nextButtonClick
    });
    let day = getDayNum(year, month);
    let decInit = 15
    let s = 2 + 390 / 8
    let y = 340
    let my = 10
    let b = createWidget(widget.FILL_RECT, {
      x: s - decInit,
      y: y,
      w: 24,
      h: 7,
      color: colorsT[0],
      radius: 3,
    })
    let textb = createWidget(widget.TEXT, {
      x: s + 24 + 5 - decInit,
      y: y - my,
      w: 100,
      h: 70,
      color: themePrim,
      text: "Exams"
    })
    let l = 95
    let dec = 20
    let g = createWidget(widget.FILL_RECT, {
      x: s + l + dec - decInit,
      y: y,
      w: 24,
      h: 7,
      color: colorsT[1],
      radius: 3,
    })
    let textg = createWidget(widget.TEXT, {
      x: s + l + 24 + 5 + dec - decInit,
      y: y - my,
      w: 190,
      h: 70,
      color: themePrim,
      text: "Tasks"
    })
    let r = createWidget(widget.FILL_RECT, {
      x: s + l * 2 + dec - decInit,
      y: y,
      w: 24,
      h: 7,
      color: colorsT[2],
      radius: 3,
    })
    let textr = createWidget(widget.TEXT, {
      x: s + l * 2 + 24 + 5 + dec - decInit,
      y: y - my,
      w: 190,
      h: 70,
      color: themePrim,
      text: "Projects"
    })
    week = (week + day) % 7;
    if (week == 0) week = 7;
    renderCalendar(year, month);
    renderCalendarEnd(year, month);
    renderEvents(year, month)
  },
  onDestroy() {
   offGesture()

  },
});