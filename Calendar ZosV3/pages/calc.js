import { Time } from '@zos/sensor'
import { createWidget, widget, align, prop, event, getTextLayout } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { offGesture } from '@zos/interaction'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    var jsonBase = readFile('task_keySch')

    var decodeJSON = jsonBase

    var conf = readFile("conf_keySch")
    setStatusBarVisible(false)


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
    let isTick = false
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
    var text_value = ''
    var start_y = 30
    var isKeyPressed = false
    var isKeyCapPressed = false
    var isKeyNumericPressed = false

    let input = "";
    let advancedMode = false; // Estado para alternar entre básico y avanzado
    let thirdPageMode = false; // Nuevo estado para el tercer modo
var PHI = 1.16183
    createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG
    });

    const display = createWidget(widget.TEXT, {
      x: 20,
      y: 20,
      w: 350,
      h: 150,
      color: themePrim,
      text_size: 30,
      align_h: align.LEFT,
      text: "0",
    });

    const basicButtons = [
      ["7", "8", "9", "+"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "*"],
      ["0", "(", ")", "/"],
      [""]
    ];

    const advancedButtons = [
      ["π", "e", "mod", "+"],
      ["sin(", "cos(", "tan(", "-"],
      ["|x|", "log(", "log10(", "*"],
      [".", "√", "³√", "/"]
    ];

    const thirdPageButtons = [
      ["acos(", "asin(", "atan(", "acosh("],
      ["asinh(", "atanh(", "coth(", "sinh("],
      ["cosh(", "tanh(", "csch(", "sech("],
      ["", "", "", ""]
    ];

    let buttonY = 150;
    let init = buttonY;
    let w = [];
    var can = false
    createButtons(basicButtons);
    let specButtonsY = buttonY - 60;
    createSpecialButtons()
    console.log("SPEC: " + specButtonsY);

    function createButtons(buttons) {
      buttonY = init;
      buttons.forEach((row) => {
        let buttonX = 20;
        row.forEach((label) => {
          if (label !== "") {
            let h = createWidget(widget.BUTTON, {
              x: buttonX,
              y: buttonY,
              w: 80,
              h: 50,
              radius: 25,
              text: label == "." ? "•" : label,
              color: label === "DEL" || label === "C" || label === "=" || label === "..." ? 0xffffff : themePrim,
              press_color: 0xd0d0d0,
              normal_color: label === "DEL" || label === "C" || label === "=" || label === "..." ? 0x004fff : themeSlot,
              text_size: 25,
              click_func: () => handleButtonClick(label),
            });
            w.push(h);
          }
          buttonX += 90;
        });
        buttonY += 60;
      });
      if(can == true){
        createSpecialButtons()
      }
    }

    function createSpecialButtons() {
      can = true
      const buttons = ["C", "=", "..."];
      const screenWidth = 390;
      const buttonWidth = 80;
      const spaceBetweenButtons = 10;
      const totalButtonWidth = buttonWidth * buttons.length;
      const totalSpaceBetweenButtons = spaceBetweenButtons * (buttons.length - 1);
      const totalUsedWidth = totalButtonWidth + totalSpaceBetweenButtons;
      const marginSpace = (screenWidth - totalUsedWidth) / 2;

      let buttonX = marginSpace;
      let buttonY = specButtonsY;

      buttons.forEach((label) => {
        if (label !== "") {
          let q = createWidget(widget.BUTTON, {
            x: buttonX,
            y:  currentMode == 2 ? buttonY - 60 : buttonY,
            w: buttonWidth,
            h: 50,
            radius: 25,
            text: label == "..." ? "•••" : label,
            color: label == "..." ? 0x000000 : 0xffffff,
            press_color: 0xd0d0d0,
            normal_color: label == "..." ? 0x6fbfff: 0x004fff,
            text_size: 25,
            click_func: () => handleButtonClick(label),
          });
          w.push(q)
        }
        buttonX += buttonWidth + spaceBetweenButtons;
      });
    }

    createSpecialButtons();

    createWidget(widget.IMG, {
      x: 310,
      y: 80,
      src: "delNum.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      deleteLastTerm();
    });

    function handleButtonClick(label) {
      if (label === "C") {
        clearDisplay();
      } else if (label === "=") {
        calculateResult();
      } else if (label === "...") {
        toggleMode();
      } else if (label === "DEL") {
        deleteLastTerm();
      } else {
        addInput(label);
      }
    }

    function deleteLastTerm() {
      const symbols = [
        "Math.PI", "Math.E", "Math.log10(", "Math.sqrt(", "Math.cbrt(", 
        "Math.sin(", "Math.cos(", "Math.tan(", "Math.log(", "Math.abs(", 
        "Math.acos(", "Math.asin(", "Math.atan(", "Math.acosh(", "Math.asinh(", 
        "Math.atanh(", "Math.coth(", "Math.sinh(", "Math.cosh(", "Math.tanh(", 
        "Math.csch(", "Math.sech("
      ];
    
      for (let symbol of symbols) {
        if (input.endsWith(symbol)) {
          input = input.slice(0, -symbol.length);
          display.setProperty(prop.MORE, { text: wrapText(input) });
          return;
        }
      }
    
      if (input.length > 0) {
        input = input.slice(0, -1);
        display.setProperty(prop.MORE, { text: wrapText(input) });
        if (input.endsWith("\n")) {
          row--;
        }
      }
      if(input.length == 0){
        row = 0;
        input = ""
        display.setProperty(prop.MORE, { text: "0" });
      }
    }
    
    var currentMode = 0

    function toggleMode() {
      // Primero, oculta todos los botones
      for (let i = 0; i < w.length; i++) {
        w[i].setProperty(prop.VISIBLE, false);
      }
      w = []; // Limpia los botones actuales

      // Cambia el modo según el valor de currentMode
      if (currentMode === 0) {
        // Cambia a modo avanzado
        currentMode = 1;
        createButtons(advancedButtons);
      } else if (currentMode === 1) {
        // Cambia a tercera página
        currentMode = 2;
        createButtons(thirdPageButtons);
      } else {
        // Vuelve al modo básico
        currentMode = 0;
        createButtons(basicButtons);
      }
    }

    function clearDisplay() {
      input = "";
      row = 0;
      display.setProperty(prop.MORE, { text: "0" });
    }

    function calculateResult() {

      var PHI = 1.161803
      console.log("PHI: " + PHI)
      try {
        const resultPrim = new Function('return ' + input)();
        const result = truncateToDecimals(resultPrim, 2);
        input = result.toString();
        display.setProperty(prop.MORE, { text: wrapText(input) });
      } catch (error) {
        console.log("ERROR: " + error)
        display.setProperty(prop.MORE, { text: "Syntax Error" });
      }
    }

    function truncateToDecimals(num, decimalPlaces) {
      const numStr = num.toString();
      const decimalIndex = numStr.indexOf('.');

      if (decimalIndex === -1) {
        return num;
      }

      return parseFloat(numStr.substring(0, decimalIndex + decimalPlaces + 1));
    }

    var row = 1;
    function addInput(label) {
      if (label === "^") {
        input += "**";
      } else if (["π", "e", "√", "³√", "log10(", "|x|", "cos(", "sin(", "tan(", "log(", "acos(", "asin(", "atan(", "acosh(", "asinh(", "atanh(", "coth(", "sinh(", "cosh(", "tanh(", "csch(", "sech(", "mod"].includes(label)) {
        input += label === "π" ? "Math.PI" :
          label === "e" ? "Math.E" :
          label === "³√" ? "Math.cbrt(" :
          label === "√" ? "Math.sqrt(" :
          label === "log10(" ? "Math.log10(" :
          label === "sin(" ? "Math.sin(" :
          label === "cos(" ? "Math.cos(" :
          label === "tan(" ? "Math.tan(" :
          label === "log(" ? "Math.log(" :
          label === "acos(" ? "Math.acos(" :
          label === "asin(" ? "Math.asin(" :
          label === "atan(" ? "Math.atan(" :
          label === "acosh(" ? "Math.acosh(" :
          label === "asinh(" ? "Math.asinh(" :
          label === "atanh(" ? "Math.atanh(" :
          label === "coth(" ? "Math.coth(" :
          label === "sinh(" ? "Math.sinh(" :
          label === "cosh(" ? "Math.cosh(" :
          label === "tanh(" ? "Math.tanh(" :
          label === "csch(" ? "Math.csch(" :
          label === "sech(" ? "Math.sech(" :
          label == "mod" ? "%" :
          "Math.abs(";
      } else {
        input += label;
      }
      display.setProperty(prop.MORE, { text: wrapText(input) });
    }
    

    function wrapText(text) {
      const maxWidth = 350;
      const buttonSpace = 70;
      const adjustedMaxWidth = maxWidth - buttonSpace;
      const textLength = text.length;
      const textArray = [];
      let tempText = "";
      let row = 1;

      for (let i = 0; i < textLength; i++) {
        tempText += text[i];

        const { width } = getTextLayout(tempText, {
          text_size: 30,
          text_width: row == 1 ? maxWidth : adjustedMaxWidth
        });

        if (width >= (row == 1 ? maxWidth : adjustedMaxWidth)) {
          textArray.push(tempText.slice(0, -1));
          tempText = text[i];
          row++;
        }
      }

      if (tempText.length > 0) {
        textArray.push(tempText);
      }

      return textArray.join("\n");
    }
  },
  onDestroy() {
   offGesture()

    vibrate && vibrate.stop()
  },
});