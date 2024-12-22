import { Time } from '@zos/sensor'
import { createWidget, widget, align, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { offGesture } from '@zos/interaction'
import { setScrollLock} from '@zos/page'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
var alerted = false
var par
Page({
  state: {},
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



    var Data = decodeJSON
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
    createWidget(widget.FILL_RECT, {
      x: 0, // Centrado horizontalmente
      y: 0,
      w: 390,
      h: 450,
      radius: 0,
      color: themeBG
    });
    createWidget(widget.TEXT, {
      x: 20,
      y: 465 - 460,
      w: 350,
      h: 70,
      text: "Click on the cards to\nrearrange the initial menu.",
      align_h: align.CENTER_H,
      text_size: 20,
      color: themePrim
    })
    var addeds = []
    let cards = []; // Array para almacenar las tarjetas
    let cardWidth = 370; // Ancho de cada tarjeta
    let cardHeight = 35; // Altura de cada tarjeta
    let cardSpacing = 10; // Espacio entre tarjetas
    let screenWidth = 390; // Ancho de la pantalla
    let screenHeight = 450; // Alto de la pantalla
    let clickCount = 1; // Contador para los clics
    const Texts = ["CALENDAR", "LESSON PLAN", "TASK LIST", "EVENTS", "GRADES", "CALCULATOR", "NEW TASK", "SETTINGS"]
    // Crear las tarjetas numeradas y distribuirlas en el eje Y
    for (let i = 0; i < 8; i++) {
      let cardY = cardSpacing + i * (cardHeight + cardSpacing) + 55;

      // Crear el widget de la tarjeta
      let card = createWidget(widget.FILL_RECT, {
        x: (screenWidth - cardWidth) / 2, // Centrado horizontalmente
        y: cardY,
        w: cardWidth,
        h: cardHeight,
        radius: 12,
        color: themeSlot
      });
      let circle = createWidget(widget.CIRCLE, {
        center_x: 360,
        center_y: cardY + 5 + 12,
        radius: 15,
        color: Config.theme.triText
      })
      // Crear el widget de texto inicial de la tarjeta
      let text = createWidget(widget.TEXT, {
        x: 30,
        y: cardY,
        w: 250,
        text: Texts[i],
        text_size: 25,
        color: themePrim
      })
      // Almacenar las tarjetas en el array
      cards.push({
        cardWidget: card,
        textWidget: cardText,
        initialY: cardY,
        index: i // Índice de la tarjeta
      });

      // Evento de clic para mostrar el número de orden basado en el contador
      card.addEventListener(event.CLICK_DOWN, (info) => {
        console.log("C")
        if (clickCount <= 8 && !addeds.includes(i)) {
          createWidget(widget.CIRCLE, {
            center_x: 300 + 60,
            center_y: cardY + 5 + 12,
            radius: 15,
            color: 0x004fff
          })
          createWidget(widget.TEXT, {
            x: 295 + 60,
            y: cardY + 7,
            text: clickCount,
            color: themeSec
          })
          clickCount++
          addeds.push(i)
        }
      })
      
      text.addEventListener(event.CLICK_DOWN, (info) => {
        console.log("C")
        if (clickCount <= 8 && !addeds.includes(i)) {
          createWidget(widget.CIRCLE, {
            center_x: 300 + 60,
            center_y: cardY + 5 + 12,
            radius: 15,
            color: 0x004fff
          })
          createWidget(widget.TEXT, {
            x: 295 + 60,
            y: cardY + 7,
            text: clickCount,
            color: themeSec
          })
          clickCount++
          addeds.push(i)
        }
      })
      
      circle.addEventListener(event.CLICK_DOWN, (info) => {
        console.log("C")
        if (clickCount <= 8 && !addeds.includes(i)) {
          createWidget(widget.CIRCLE, {
            center_x: 300 + 60,
            center_y: cardY + 5 + 12,
            radius: 15,
            color: 0x004fff
          })
          createWidget(widget.TEXT, {
            x: 295 + 60,
            y: cardY + 7,
            text: clickCount,
            color: themeSec
          })
          clickCount++
          addeds.push(i)
        }
      })
    }
    
    // Array para almacenar las cartas
    // Array para almacenar las cartas

    // Crear 8 cartas
    setScrollLock({ lock: true, })
    /*let cards = []; // Array para almacenar las tarjetas
    let cardWidth = 100; // Ancho de cada tarjeta
    let cardHeight = 60; // Altura de cada tarjeta
    let cardSpacing = 10; // Espacio entre tarjetas
    let startY = null; // Posición inicial del dedo
    let selectedCardIndex = null; // Índice de la tarjeta seleccionada
    let screenWidth = 390; // Ancho de la pantalla
    let screenHeight = 450; // Alto de la pantalla
    
    // Calcular cuántas tarjetas caben en la pantalla (en términos de altura y espaciado)
    let totalCards = 4;
    let totalHeight = totalCards * (cardHeight + cardSpacing);
    let maxHeight = screenHeight - cardSpacing;
    
    // Crear las tarjetas numeradas y distribuirlas en el eje Y
    for (let i = 0; i < totalCards; i++) {
      let cardY = cardSpacing + i * (cardHeight + cardSpacing);
      
      let card = createWidget(widget.FILL_RECT, {
        x: (screenWidth - cardWidth) / 2, // Centrado horizontalmente
        y: cardY,
        w: cardWidth,
        h: cardHeight,
        radius: 12,
        color: themeSlot
      });
    
      let cardText = createWidget(widget.TEXT, {
        x: (screenWidth - cardWidth) / 2 + cardWidth / 2 - 10, // Centrar texto dentro de la tarjeta
        y: cardY + cardHeight / 2 - 10,
        w: cardWidth,
        h: cardHeight,
        text: (i + 1).toString(),
        text_size: 24,
        color: themePrim
      });
    
      // Almacenar las tarjetas en el array
      cards.push({
        cardWidget: card,
        textWidget: cardText,
        initialY: cardY,
        index: i // Índice de la tarjeta
      });
    }
    
    // Evento de movimiento para deslizar las tarjetas
    cards.forEach((card, index) => {
      let selector = card.cardWidget;
    
      selector.addEventListener(event.MOVE, (info) => {
        if (startY === null || selectedCardIndex !== index) {
          // Cuando se selecciona una tarjeta, guardar la posición inicial
          startY = info.y;
          selectedCardIndex = index;
        }
    
        // Calcular el desplazamiento en el eje Y
        let deltaY = info.y - startY; // Calcular el desplazamiento vertical
        let newY = card.initialY + deltaY; // Nueva posición de la tarjeta
        
        // Asegurarnos de que la tarjeta no se desplace fuera de la pantalla verticalmente
        if (newY < cardSpacing) newY = cardSpacing; // Limitar al borde superior
        if (newY + cardHeight > screenHeight - cardSpacing) newY = screenHeight - cardHeight - cardSpacing; // Limitar al borde inferior
        
        // Actualizar la posición de la tarjeta
        card.cardWidget.setProperty(prop.Y, newY); 
        card.textWidget.setProperty(prop.Y, newY + cardHeight / 2 - 10); // Mover el texto
    
        // Actualizar la posición inicial de la tarjeta para que el próximo movimiento sea relativo a la nueva posición
        card.initialY = newY;
      });
    });*/
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 420,
      w: 195,
      h: 30,
      color: 0x0ed145
    }).addEventListener(event.CLICK_DOWN, () => {
      if(addeds.length == 8){
      Config.CardsOrder = addeds
      writeFile("conf_keySch", Config)
      push({ url: 'pages/init', param: '...' })
      }else{
        showToast({
          content: "ake sure each card has a number"
        })
      }
    })
    createWidget(widget.IMG, {
      x: 195 / 2 - 117 / 2,
      y: 420,
      w: 117,
      h: 30,
      auto_scale: true,
      auto_scale_obj_fit: true,
      src: "y.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      if(addeds.length == 8){
      Config.CardsOrder = addeds
      writeFile("conf_keySch", Config)
      push({ url: 'pages/init', param: '...' })
      }else{
        showToast({
          content: "ake sure each card has a number"
        })
      }
    })
    createWidget(widget.FILL_RECT, {
      x: 195,
      y: 420,
      w: 195,
      h: 30,
      color: 0xec1c24
    }).addEventListener(event.CLICK_DOWN, () => {
      push({ url: 'pages/init', param: '...' })
    })
    createWidget(widget.IMG, {
      x: 195 + (195 / 2 - 117 / 2),
      y: 420,
      w: 117,
      h: 30,
      auto_scale: true,
      auto_scale_obj_fit: true,
      src: "n.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      push({ url: 'pages/init', param: '...' })
    })
  },
  onDestroy() {
    offGesture()

    vibrate && vibrate.stop()
  },
});