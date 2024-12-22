﻿
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { showToast } from '@zos/interaction'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
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

    createWidget(widget.STROKE_RECT, {
      x: 1,
      y: start_y,
      w: 385,
      h: 36,
      radius: 5,
      color: 0xffffff
    })

    const text_input = createWidget(widget.TEXT, {
      x: 3,
      y: start_y - 2,
      w: 375,
      h: 35,
      text_size: 24,
      color: 0xffffff
    })

    //Create groups
    const GROUP_LETTERS = createWidget(widget.GROUP)
    const GROUP_ALPHABET = createWidget(widget.GROUP)
    const GROUP_NUMERIC = createWidget(widget.GROUP)
    const GROUP_SYMBOLS = createWidget(widget.GROUP)

    const KEY_ABC = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "abc",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showABCButtons()
        }
      }
    })

    const KEY_DEF = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "def",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showDEFButtons()
        }
      }
    })

    const KEY_GHI = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: 'ghi',
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showGHIButtons()
        }
      }
    })

    const KEY_JKL = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "jkl",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showJKLButtons()
        }
      }
    })

    const KEY_MN = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "mnñ",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showMNButtons()
        }
      }
    })

    const KEY_OPQ = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "opq",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showOPQButtons()
        }
      }
    })

    const KEY_RST = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "rst",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showRSTButtons()
        }
      }
    })

    const KEY_UVW = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "uvw",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showUVWButtons()
        }
      }
    })

    const KEY_XYZ = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "xyz",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyPressed) {
          isKeyPressed = false;
          hideAllLettersButtons()
        } else {
          isKeyPressed = true;
          showXYZButtons()
        }
      }
    })

    const KEY_CAP = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "CAP",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        if (isKeyCapPressed) {
          KEY_CAP.setProperty(prop.MORE, {
            normal_color: 0x333333,
            press_color: 0x0986D4,
            x: 293,
            y: start_y + 50,
            w: 95,
            h: 55,
            text: "CAP",
            text_size: 20,
          })
          isKeyCapPressed = false;
          setKeysLowerCase(start_y);
        } else {
          KEY_CAP.setProperty(prop.MORE, {
            normal_color: 0x0986D4,
            press_color: 0x333333,
            x: 293,
            y: start_y + 50,
            w: 95,
            h: 55,
            text: "CAP",
            text_size: 20
          })
          isKeyCapPressed = true;
          setKeysUpperCase(start_y);
        }
      }
    })

    const KEY_NUMBER = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 107,
      w: 95,
      h: 55,
      text: "123",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        showNumericsButon(start_y);
      }
    })

    const KEY_ALPHABEICT = createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "ABC",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        hideNumericsButon(start_y);
        hideSymbolsButon(start_y);
      }
    })

    const KEY_SYMBOL = GROUP_LETTERS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "!@#",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        showSymbolsButon(start_y);
      }
    })

    const KEY_SPACE = createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 221,
      w: 289,
      h: 55,
      text: "SPACE",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter(' ', text_input);
      }
    })

    const KEY_DEL = createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 221,
      w: 95,
      h: 55,
      text: "DEL",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0xAD3C23,
      click_func: () => {
        removeCharacter(text_input);
      }
    })

    const KEY_A = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "a",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideABCButtons();
        addCharacter('a', text_input);
      }
    })

    const KEY_B = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "b",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideABCButtons();
        addCharacter('b', text_input);
      }
    })

    const KEY_C = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "c",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideABCButtons();
        addCharacter('c', text_input);
      }
    })

    const KEY_D = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "d",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideDEFButtons()
        addCharacter('d', text_input);
      }
    })

    const KEY_E = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "e",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideDEFButtons()
        addCharacter('e', text_input);
      }
    })

    const KEY_F = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "f",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideDEFButtons()
        addCharacter('f', text_input);
      }
    })

    const KEY_G = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "g",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideGHIButtons();
        addCharacter('g', text_input);
      }
    })

    const KEY_H = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "h",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideGHIButtons();
        addCharacter('h', text_input);
      }
    })

    const KEY_I = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "i",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideGHIButtons();
        addCharacter('i', text_input);
      }
    })

    const KEY_J = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "j",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideJKLButtons()
        addCharacter('j', text_input);
      }
    })

    const KEY_K = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "k",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideJKLButtons()
        addCharacter('k', text_input);
      }
    })

    const KEY_L = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "l",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideJKLButtons()
        addCharacter('l', text_input);
      }
    })

    const KEY_M = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "m",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideMNButtons()
        addCharacter('m', text_input);
      }
    })

    const KEY_N = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "n",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideMNButtons()
        addCharacter('n', text_input);
      }
    })

    const KEY_ENE = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "ñ",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideMNButtons()
        addCharacter('ñ', text_input);
      }
    })

    const KEY_O = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "o",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideOPQButtons();
        addCharacter('o', text_input);
      }
    })

    const KEY_P = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "p",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideOPQButtons();
        addCharacter('p', text_input);
      }
    })

    const KEY_Q = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "q",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideOPQButtons();
        addCharacter('q', text_input);
      }
    })

    const KEY_R = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "r",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideRSTButtons();
        addCharacter('r', text_input);
      }
    })

    const KEY_S = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "s",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideRSTButtons();
        addCharacter('s', text_input);
      }
    })

    const KEY_T = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "t",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideRSTButtons();
        addCharacter('t', text_input);
      }
    })

    const KEY_U = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "u",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideUVWButtons()
        addCharacter('u', text_input);
      }
    })

    const KEY_V = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "v",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideUVWButtons()
        addCharacter('v', text_input);
      }
    })

    const KEY_W = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "w",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideUVWButtons()
        addCharacter('w', text_input);
      }
    })

    const KEY_X = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "x",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideXYZButtons();
        addCharacter('x', text_input);
      }
    })

    const KEY_Y = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "y",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideXYZButtons();
        addCharacter('y', text_input);
      }
    })

    const KEY_Z = GROUP_ALPHABET.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "z",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        isKeyPressed = false;
        hideXYZButtons();
        addCharacter('z', text_input);
      }
    })

    //Numeric keys 

    const KEY_ONE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "1",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('1', text_input);
      }
    })

    const KEY_TWO = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "2",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('2', text_input);
      }
    })

    const KEY_THREE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: '3',
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('3', text_input);
      }
    })

    const KEY_FOUR = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "4",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('4', text_input);
      }
    })

    const KEY_FIVE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "5",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('5', text_input);
      }
    })

    const KEY_SIX = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "6",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('6', text_input);
      }
    })

    const KEY_SEVEN = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "7",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('7', text_input);
      }
    })

    const KEY_EIGHT = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "8",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('8', text_input);
      }
    })

    const KEY_NINE = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "9",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('9', text_input);
      }
    })

    const KEY_ZERO = GROUP_NUMERIC.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "0",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('0', text_input);
      }
    })

    //Symbols keys 

    const KEY_EXCLAMATION = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "!",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('!', text_input);
      }
    })

    const KEY_AT = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: "@",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('@', text_input);
      }
    })

    const KEY_NUMBER_SIGN = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 164,
      w: 95,
      h: 55,
      text: '#',
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('#', text_input);
      }
    })

    const KEY_MONEY = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "$",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('$', text_input);
      }
    })

    const KEY_PERCENT = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "%",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('%', text_input);
      }
    })

    const KEY_QUESTION = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 108,
      w: 95,
      h: 55,
      text: "?",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('?', text_input);
      }
    })

    const KEY_AMPERSAND = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 2,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "&",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('&', text_input);
      }
    })

    const KEY_OPEN_PARENTHESIS = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 99,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "(",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('(', text_input);
      }
    })

    const KEY_CLOSE_PARENTHESIS = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 196,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: ")",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter(')', text_input);
      }
    })

    const KEY_SLASH = GROUP_SYMBOLS.createWidget(widget.BUTTON, {
      x: 293,
      y: start_y + 50,
      w: 95,
      h: 55,
      text: "/",
      text_size: 20,
      normal_color: 0x333333,
      press_color: 0x0986D4,
      click_func: () => {
        addCharacter('/', text_input);
      }
    })
    createWidget(widget.IMG, {
      x: 0,
      y: 400,
      src: "y.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      if (text_value.length > 0) {
        let Vs = ""
        if (Config.profile == 2) {
          Vs = "V2"
        } else if (Config.profile == 3) {
          Vs = "V3"
        }
        Config.customSubjects.push(text_value)
        if (isTick == true) {
          Config.RestSubjects.push(text_value)
        }
        writeFile("conf_keySch", Config)
        push({ url: `pages/setUp${Vs}`, param: '...' })
      } else {
        showToast({
          content: "You must write unless one character."
        })
      }
    })
    createWidget(widget.IMG, {
      x: 195,
      y: 400,
      src: "n.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      let Vs = ""
      if (Config.profile == 2) {
        Vs = "V2"
      } else if (Config.profile == 3) {
        Vs = "V3"
      }
      push({ url: `pages/setUp${Vs}`, param: '...' })
    })

    //hide all the groups that contains the individual letter and numeric keys
    hideAllLettersButtons()
    GROUP_NUMERIC.setProperty(prop.VISIBLE, false)
    KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
    GROUP_SYMBOLS.setProperty(prop.VISIBLE, false)

    function hideABCButtons() {
      KEY_A.setProperty(prop.VISIBLE, false)
      KEY_B.setProperty(prop.VISIBLE, false)
      KEY_C.setProperty(prop.VISIBLE, false)
    }

    function showABCButtons() {
      KEY_A.setProperty(prop.VISIBLE, true)
      KEY_B.setProperty(prop.VISIBLE, true)
      KEY_C.setProperty(prop.VISIBLE, true)
    }

    function hideABCButtons() {
      KEY_A.setProperty(prop.VISIBLE, false)
      KEY_B.setProperty(prop.VISIBLE, false)
      KEY_C.setProperty(prop.VISIBLE, false)
    }

    function showDEFButtons() {
      KEY_D.setProperty(prop.VISIBLE, true)
      KEY_E.setProperty(prop.VISIBLE, true)
      KEY_F.setProperty(prop.VISIBLE, true)
    }

    function hideDEFButtons() {
      KEY_D.setProperty(prop.VISIBLE, false)
      KEY_E.setProperty(prop.VISIBLE, false)
      KEY_F.setProperty(prop.VISIBLE, false)
    }

    function showGHIButtons() {
      KEY_G.setProperty(prop.VISIBLE, true)
      KEY_H.setProperty(prop.VISIBLE, true)
      KEY_I.setProperty(prop.VISIBLE, true)
    }

    function hideGHIButtons() {
      KEY_G.setProperty(prop.VISIBLE, false)
      KEY_H.setProperty(prop.VISIBLE, false)
      KEY_I.setProperty(prop.VISIBLE, false)
    }

    function showJKLButtons() {
      KEY_J.setProperty(prop.VISIBLE, true)
      KEY_K.setProperty(prop.VISIBLE, true)
      KEY_L.setProperty(prop.VISIBLE, true)
    }

    function hideJKLButtons() {
      KEY_J.setProperty(prop.VISIBLE, false)
      KEY_K.setProperty(prop.VISIBLE, false)
      KEY_L.setProperty(prop.VISIBLE, false)
    }

    function showMNButtons() {
      KEY_M.setProperty(prop.VISIBLE, true)
      KEY_N.setProperty(prop.VISIBLE, true)
      KEY_ENE.setProperty(prop.VISIBLE, true)
    }

    function hideMNButtons() {
      KEY_M.setProperty(prop.VISIBLE, false)
      KEY_N.setProperty(prop.VISIBLE, false)
      KEY_ENE.setProperty(prop.VISIBLE, false)
    }

    function showOPQButtons() {
      KEY_O.setProperty(prop.VISIBLE, true)
      KEY_P.setProperty(prop.VISIBLE, true)
      KEY_Q.setProperty(prop.VISIBLE, true)
    }

    function hideOPQButtons() {
      KEY_O.setProperty(prop.VISIBLE, false)
      KEY_P.setProperty(prop.VISIBLE, false)
      KEY_Q.setProperty(prop.VISIBLE, false)
    }

    function showRSTButtons() {
      KEY_R.setProperty(prop.VISIBLE, true)
      KEY_S.setProperty(prop.VISIBLE, true)
      KEY_T.setProperty(prop.VISIBLE, true)
    }

    function hideRSTButtons() {
      KEY_R.setProperty(prop.VISIBLE, false)
      KEY_S.setProperty(prop.VISIBLE, false)
      KEY_T.setProperty(prop.VISIBLE, false)
    }

    function showUVWButtons() {
      KEY_U.setProperty(prop.VISIBLE, true)
      KEY_V.setProperty(prop.VISIBLE, true)
      KEY_W.setProperty(prop.VISIBLE, true)
    }

    function hideUVWButtons() {
      KEY_U.setProperty(prop.VISIBLE, false)
      KEY_V.setProperty(prop.VISIBLE, false)
      KEY_W.setProperty(prop.VISIBLE, false)
    }

    function showXYZButtons() {
      KEY_X.setProperty(prop.VISIBLE, true)
      KEY_Y.setProperty(prop.VISIBLE, true)
      KEY_Z.setProperty(prop.VISIBLE, true)
    }

    function hideXYZButtons() {
      KEY_X.setProperty(prop.VISIBLE, false)
      KEY_Y.setProperty(prop.VISIBLE, false)
      KEY_Z.setProperty(prop.VISIBLE, false)
    }

    function hideAllLettersButtons() {
      hideABCButtons()
      hideDEFButtons()
      hideGHIButtons()
      hideJKLButtons()
      hideMNButtons()
      hideOPQButtons()
      hideRSTButtons()
      hideUVWButtons()
      hideXYZButtons()
    }

    function setKeysUpperCase(_start_y) {

      KEY_ABC.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "ABC",
        text_size: 20
      })

      KEY_DEF.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "DEF",
        text_size: 20,
      })

      KEY_GHI.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: 'GHI',
        text_size: 20,
      })

      KEY_JKL.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "JKL",
        text_size: 20
      })

      KEY_MN.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "MNÑ",
        text_size: 20,
      })

      KEY_OPQ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: 'OPQ',
        text_size: 20,
      })

      KEY_RST.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "RST",
        text_size: 20
      })

      KEY_UVW.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "UVW",
        text_size: 20,
      })

      KEY_XYZ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: 'XYZ',
        text_size: 20,
      })

      KEY_A.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "A",
        text_size: 20,
      })

      KEY_B.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "B",
        text_size: 20,
      })

      KEY_C.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "C",
        text_size: 20,
      })

      KEY_D.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "D",
        text_size: 20,
      })

      KEY_E.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "E",
        text_size: 20,
      })

      KEY_F.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "F",
        text_size: 20,
      })

      KEY_G.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "G",
        text_size: 20,
      })

      KEY_H.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "H",
        text_size: 20,
      })

      KEY_I.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "I",
        text_size: 20,
      })

      KEY_J.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "J",
        text_size: 20,
      })

      KEY_K.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "K",
        text_size: 20,
      })

      KEY_L.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "L",
        text_size: 20,
      })

      KEY_M.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "M",
        text_size: 20,
      })

      KEY_N.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "N",
        text_size: 20,
      })

      KEY_ENE.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "Ñ",
        text_size: 20,
      })

      KEY_O.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "O",
        text_size: 20,
      })

      KEY_P.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "P",
        text_size: 20,
      })

      KEY_Q.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "Q",
        text_size: 20,
      })

      KEY_R.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "R",
        text_size: 20,
      })

      KEY_S.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "S",
        text_size: 20,
      })

      KEY_T.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "T",
        text_size: 20,
      })

      KEY_U.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "U",
        text_size: 20,
      })

      KEY_V.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "V",
        text_size: 20,
      })

      KEY_W.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "W",
        text_size: 20,
      })

      KEY_X.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "X",
        text_size: 20,
      })

      KEY_Y.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "Y",
        text_size: 20,
      })

      KEY_Z.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "Z",
        text_size: 20,
      })
    }

    function setKeysLowerCase(_start_y) {

      KEY_ABC.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "abc",
        text_size: 20,
      })

      KEY_DEF.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "def",
        text_size: 20,
      })

      KEY_GHI.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: 'ghi',
        text_size: 20,
      })

      KEY_JKL.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "jkl",
        text_size: 20,
      })

      KEY_MN.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "mnñ",
        text_size: 20,
      })

      KEY_OPQ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: 'opq',
        text_size: 20,
      })

      KEY_RST.setProperty(prop.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "rst",
        text_size: 20,
      })

      KEY_UVW.setProperty(prop.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "uvw",
        text_size: 20,
      })

      KEY_XYZ.setProperty(prop.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: 'xyz',
        text_size: 20,
      })

      KEY_A.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "a",
        text_size: 20,
      })

      KEY_B.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "b",
        text_size: 20,
      })

      KEY_C.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "c",
        text_size: 20,
      })

      KEY_D.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "d",
        text_size: 20,
      })

      KEY_E.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "e",
        text_size: 20,
      })

      KEY_F.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "f",
        text_size: 20,
      })

      KEY_G.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "g",
        text_size: 20,
      })

      KEY_H.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "h",
        text_size: 20,
      })

      KEY_I.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 164,
        w: 95,
        h: 55,
        text: "i",
        text_size: 20,
      })

      KEY_J.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "j",
        text_size: 20,
      })

      KEY_K.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "k",
        text_size: 20,
      })

      KEY_L.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "l",
        text_size: 20,
      })

      KEY_M.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "m",
        text_size: 20,
      })

      KEY_N.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "n",
        text_size: 20,
      })

      KEY_ENE.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "ñ",
        text_size: 20,
      })

      KEY_O.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "o",
        text_size: 20,
      })

      KEY_P.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "p",
        text_size: 20,
      })

      KEY_Q.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 107,
        w: 95,
        h: 55,
        text: "q",
        text_size: 20,
      })

      KEY_R.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "r",
        text_size: 20,
      })

      KEY_S.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "s",
        text_size: 20,
      })

      KEY_T.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "t",
        text_size: 20,
      })

      KEY_U.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "u",
        text_size: 20,
      })

      KEY_V.setProperty(widget.MORE, {
        x: 196,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "v",
        text_size: 20,
      })

      KEY_W.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "w",
        text_size: 20,
      })

      KEY_X.setProperty(widget.MORE, {
        x: 2,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "x",
        text_size: 20,
      })

      KEY_Y.setProperty(widget.MORE, {
        x: 99,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "y",
        text_size: 20,
      })

      KEY_Z.setProperty(widget.MORE, {
        x: 293,
        y: _start_y + 50,
        w: 95,
        h: 55,
        text: "z",
        text_size: 20,
      })
    }

    function showNumericsButon() {
      GROUP_LETTERS.setProperty(prop.VISIBLE, false)
      GROUP_NUMERIC.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, true)

    }

    function hideNumericsButon() {
      GROUP_NUMERIC.setProperty(prop.VISIBLE, false)
      GROUP_LETTERS.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
    }

    function showSymbolsButon() {
      GROUP_LETTERS.setProperty(prop.VISIBLE, false)
      GROUP_SYMBOLS.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, true)

    }

    function hideSymbolsButon() {
      GROUP_SYMBOLS.setProperty(prop.VISIBLE, false)
      GROUP_LETTERS.setProperty(prop.VISIBLE, true)
      KEY_ALPHABEICT.setProperty(prop.VISIBLE, false)
    }
    let yDes = 400 - 62 - 10
    let Rest = createWidget(widget.IMG, {
      x: 2,
      y: yDes,
      src: "unticked.png"
    })
    Rest.addEventListener(event.CLICK_DOWN, () => {
      if (isTick == false) {
        isTick = true
        Rest.setProperty(prop.MORE, {
          src: "ticked.png"
        })
      } else {
        isTick = false
        Rest.setProperty(prop.MORE, {
          src: "unticked.png"
        })
      }
    })
    const descriptionTick = createWidget(widget.TEXT, {
      x: 80,
      y: yDes + 5,
      w: 375,
      h: 35,
      text: "Light class",
      text_size: 24,
      color: 0xffffff
    })
    let infoRest = createWidget(widget.IMG, {
      x: 330,
      y: yDes + 6,
      src: "info.png"
    })
    infoRest.addEventListener(event.CLICK_DOWN, () => {
      let BG = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0x000000
      })
      let description = createWidget(widget.TEXT, {
        x: 10,
        y: 80,
        w: 370,
        h: 300,
        align_h: align.CENTER_H,
        text: "Mark it if you\nlike the class.\nThis will help you to see\nthe day in another way.",
        text_size: 24,
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
      })
    })
    //events
    function addCharacter(_value, text_input) {

      vibrate.stop()
      vibrate.scene = 24
      vibrate.start()
      if (text_value.length < 20) {
        //if CAP key is enabled the letter will be in capital otherwise lower case
        isKeyCapPressed || text_value.length == 0 ? text_value += _value.toUpperCase() : text_value += _value;

        text_input.setProperty(prop.MORE, {
          text: text_value,
        })
      } else {
        showToast({
          content: "You can´t add more than 20 characters, current: " + text_value.length + "."
        })
      }
    }

    function removeCharacter(text_input) {

      vibrate.stop()
      vibrate.scene = 24
      vibrate.start()

      text_value = text_value.slice(0, -1);

      text_input.setProperty(prop.MORE, {
        text: text_value,
      })
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
  },
  onDestroy() {
   offGesture()

    vibrate && vibrate.stop()
  },
});