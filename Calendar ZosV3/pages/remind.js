import { Time } from '@zos/sensor'
import { createWidget, widget, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { offGesture } from '@zos/interaction'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    setStatusBarVisible(false)
    setLayerScrolling(false)
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
    
    
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      h: 9999,
      w: 390,
      color: themeBG,
    })
    var date = String(time.getDay()) + "/" + String(time.getMonth()) + "/" + String(time.getFullYear())
    var data = buscarFecha(String(time.getDay()) + "/" + String(time.getMonth()) + "/" + String(time.getFullYear()))
    renderPageDate(data, date)
    function renderPageDate(data, date) {
      createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        h: 9999,
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
        text: `Today agenda:`,
        text_size: 25,
        color: themeSec
      })
      let refresh = createWidget(widget.IMG, {
        x: 390 - 105,
        y: 5,
        src: "refresh.png"
      }).addEventListener(event.CLICK_DOWN, (info) => {
        push({ url: 'pages/init', param: '...' })
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
          y: 130 + 85 * i - 10, 
          w: 390 - 20,
          h: 80,
          color: themePrim,
          text: txt, 
          text_size: 18
        })
      }
    }
    function buscarFecha(fechaBuscada) {
      
      const data = JSON.parse(decodeJSON);

      
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
        
        
        return dev; 
      } else {
        
        return dev; 
      }
    };
  },
  onDestroy() {
   offGesture()

  },
});