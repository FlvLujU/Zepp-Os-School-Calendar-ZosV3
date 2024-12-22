
import { createWidget, widget, align, prop, event } from '@zos/ui'
import { Vibrator } from '@zos/sensor'
import { setStatusBarVisible } from '@zos/ui'
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
import * as ColorUtils from '../utils/color-conversion-algorithms'
//setLayerScrolling(false)
setStatusBarVisible(false)
const themes = [
  "rw", "ob", "by", "bb", "yg", "pc"
]
var conf = readFile("conf_keySch")
var Config = conf
var themeBG = Config.theme.bg
var themeUI = Config.theme.UI
var themePrim = Config.theme.primText
var themeSec = Config.theme.secText
var themeSlot = Config.theme.slot
var autoBright;
autoBright = Config.autoBright
var autoDark;
autoDark = Config.autoDark
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
var rY = 20
function readFile(filename) {
  return localStorage.getItem(filename);
}


function writeFile(filename, data) {
  const buffer = jsonToArrayBuffer(data);
  const file = hmFS.open_asset(filename, hmFS.O_RDWR | hmFS.O_TRUNC);
  hmFS.write(file, buffer, 0, buffer.byteLength);
  hmFS.close(file);
}
function decodeUint8Array(uint8array) {
  let decodedString = "";


  for (let i = 0; i < uint8array.length; i++) {
    decodedString += String.fromCharCode(uint8array[i]);
  }

  return decodedString;
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

var DEVICE_WIDTH = 390
var DEVICE_HEIGHT = 450
var hc = 0; // ángulo
let s = 0; // radio
let v = 0; // luminosidad

let colorPreview;
let inputColor = 0xffffff;
let inputColorName;
const colors = [themeBG, themeUI, themePrim, themeSec, themeSlot, Config.theme.triText]

// #region funciones
function hex2rgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function toDegree(radian) {
  return radian * (180 / Math.PI);
}

function lineLenght(dX, dY) {
  return Math.sqrt(Math.pow(Math.abs(dX), 2) + Math.pow(Math.abs(dY), 2));
}

function angleDeg(dX, dY) {
  let angle = Math.atan2(dY, dX);
  let angleDeg = toDegree(angle);
  if (angleDeg < 0) angleDeg += 360;
  return angleDeg;
}
let modifyWidget
function setColor() {
  let rgb = ColorUtils.hsvToRgb(hc, s, v);
  let color = ColorUtils.RGBToNumber(rgb[0], rgb[1], rgb[2]);
  up = createWidget(widget.BUTTON, {
    x: px(390 / 2 - 150),
    y: px(10),
    w: px(300),
    h: px(45),
    text: "Select",
    normal_color: color,
    press_color: color,
  })
  if (modifyWidget == 1) {
    BG.setProperty(prop.MORE, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: color
    });
  } else if (modifyWidget == 2) {
    sBG1.setProperty(prop.MORE, {
      x: 20,
      y: 450 / 2 - 100,
      w: 350,
      h: 100,
      color: color
    });
  } else if (modifyWidget == 3) {
    sBG2.setProperty(prop.MORE, {
      x: 20,
      y: 450 / 2,
      w: 350,
      h: 100,
      color: color
    });
  } else if (modifyWidget == 4) {
    sTxt1.setProperty(prop.COLOR, color);
  } else if (modifyWidget == 5) {
    sTxt2.setProperty(prop.COLOR, color);
  } else if (modifyWidget == 6) {
    sTxt3.setProperty(prop.COLOR, color);
  }
  colors[modifyWidget - 1] = color
}

let palette
let lightness
let lightnessMask
let pointer
let lightnessPointer
let subBG
let BG
let sBG1
let sBG2
let sTxt1
let sTxt2
let sTxt3
let up
let wanna = true
let select = false

class PaletteSelect {
  constructor(x, y, color) {
    if (wanna) {
      subBG = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0x000000
      });
    }
    palette = createWidget(widget.IMG, {
      x: x,
      y: y,
      src: 'Palette_r.png'
    });

    palette.addEventListener(event.CLICK_DOWN, function (info) {
      let posX = info.x - x;
      let posY = info.y - y;
      let dX = posX - px(260 / 2);
      let dY = posY - px(260 / 2);

      let angle = angleDeg(dX, dY);
      hc = angle / 360;
      let lenght = lineLenght(dX, dY);
      if (lenght > px(250 / 2)) lenght = px(250 / 2);
      s = lenght / px(250 / 2);

      if (pointer) {
        pointer.setProperty(prop.MORE, {
          pos_x: px((260 + s * 250) / 2),
          angle: hc * 360,
        });
      }
      setColor();

      let rgbNew = ColorUtils.hsvToRgb(hc, s, 1);
      let colorNew = ColorUtils.RGBToNumber(rgbNew[0], rgbNew[1], rgbNew[2]);
      if (lightness) lightness.setProperty(prop.COLOR, colorNew);
    });

    palette.addEventListener(event.MOVE, function (info) {
      let posX = info.x - x;
      let posY = info.y - y;
      let dX = posX - px(260 / 2);
      let dY = posY - px(260 / 2);

      let angle = angleDeg(dX, dY);
      hc = angle / 360;
      let lenght = lineLenght(dX, dY);
      if (lenght > px(250 / 2)) lenght = px(250 / 2);
      s = lenght / px(250 / 2);
      if (pointer) {
        pointer.setProperty(prop.MORE, {
          pos_x: px((260 + s * 250) / 2),
          angle: hc * 360,
        });
      }
      setColor();

      let rgbNew = ColorUtils.hsvToRgb(hc, s, 1);
      let colorNew = ColorUtils.RGBToNumber(rgbNew[0], rgbNew[1], rgbNew[2]);
      if (lightness) lightness.setProperty(prop.COLOR, colorNew);
    });
console.log("CGCG")
    let colorString = "#" + color.toString(16).padStart(6, '0');
    const rgb = hex2rgb(colorString);
    const r = rgb.r;
    const g = rgb.g;
    const b = rgb.b;

    let hsv = ColorUtils.rgbToHsv(r, g, b);
    hc = hsv[0]; // ángulo
    s = hsv[1]; // radio
    v = hsv[2]; // luminosidad
let m = hc
let n = s
let P = v
    let pointer = createWidget(widget.IMG, {
      x: x - px(10),
      y: y - px(10),
      w: px(260 + 20),
      h: px(260 + 20),
      //pos_x: px((260 + n*250) / 2),
      pos_y: px(260 / 2),
      center_x: px((260 + 20) / 2),
      center_y: px((260 + 20) / 2),
      //angle: m*360,
      src: 'Pointer_r.png'
    });
    console.log("FH")
    //pointer.setEnable(false);

    lightness = createWidget(widget.FILL_RECT, {
      x: x + px(5),
      y: y + px(275),
      w: px(250),
      h: px(35),
      color: color
    });
console.log("FDHGD")
    lightnessMask = createWidget(widget.IMG, {
      x: x,
      y: y + px(270),
      src: 'LightnessMask.png'
    });

    lightnessPointer = createWidget(widget.IMG, {
      x: x + px(p * 250),
      y: y + px(270 - 5),
      src: 'Pointer.png'
    });
    lightnessPointer.setEnable(false);

    lightnessMask.addEventListener(event.CLICK_DOWN, function (info) {
      let posX = info.x - x + px(5);
      let scale = posX / px(250);
      if (scale > 1) scale = 1;
      if (scale < 0) scale = 0;
      v = scale;

      if (lightnessPointer) {
        lightnessPointer.setProperty(prop.X, px(x + v * 250));
      }
      setColor();
    });

    lightnessMask.addEventListener(event.MOVE, function (info) {
      let posX = info.x - x + px(5);
      let scale = posX / px(250);
      if (scale > 1) scale = 1;
      if (scale < 0) scale = 0;
      v = scale;

      if (lightnessPointer) {
        lightnessPointer.setProperty(prop.X, x + px(v * 250));
      }
      setColor();
    });
  }
}

Page({
  onInit(options) {
    inputColorName = options;
  },
  build() {
    BG = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 400,
      color: themeSlot
    })
    let selectBG = createWidget(widget.STROKE_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 400,
      radius: 20,
      line_width: 5,
      color: 0x0090ff
    })
    sBG1 = createWidget(widget.FILL_RECT, {
      x: 20,
      y: 450 / 2 - 100,
      w: 350,
      h: 100,
      color: themeBG
    })
    sBG2 = createWidget(widget.FILL_RECT, {
      x: 20,
      y: 450 / 2,
      w: 350,
      h: 100,
      color: themeUI
    })
    let selectsBG1 = createWidget(widget.STROKE_RECT, {
      x: 15,
      y: 450 / 2 - 105,
      w: 360,
      h: 110,
      radius: 20,
      line_width: 5,
      color: 0x0090ff
    })
    let selectsBG2 = createWidget(widget.STROKE_RECT, {
      x: 15,
      y: 450 / 2 - 5,
      w: 360,
      h: 110,
      radius: 20,
      line_width: 5,
      color: 0x0090ff
    })
    let wS = 120
    sTxt1 = createWidget(widget.TEXT, {
      x: 50,
      y: 450 / 2 - 100 + 10,
      h: 80,
      w: wS,
      text: "Text",
      text_size: 60,
      color: themePrim
    })
    let selectsTxt1 = createWidget(widget.STROKE_RECT, {
      x: 45,
      y: 450 / 2 - 95,
      w: wS + 10,
      h: 90,
      radius: 20,
      line_width: 5,
      color: 0x0090ff
    })
    sTxt2 = createWidget(widget.TEXT, {
      x: 50,
      y: 450 / 2 + 10,
      w: wS,
      h: 80,
      text: "Text",
      text_size: 60,
      color: themeSec
    })
    let selectsTxt2 = createWidget(widget.STROKE_RECT, {
      x: 45,
      y: 450 / 2 + 5,
      w: wS + 10,
      h: 90,
      radius: 20,
      line_width: 5,
      color: 0x0090ff
    })
    sTxt3 = createWidget(widget.TEXT, {
      x: 20,
      y: 450 / 2 + 105,
      w: 350,
      h: 160,
      text: "Select a component to modify his\ncolor. Everything above the confirmation buttons is editable, including this text.",
      align_h: align.CENTER_H,
      text_size: 14,
      color: Config.theme.triText
    })
    let selectsTxt3 = createWidget(widget.STROKE_RECT, {
      x: 15,
      y: 450 / 2 + 100,
      w: 360,
      h: 70,
      radius: 20,
      line_width: 5,
      color: 0x0090ff
    })
    selectBG.setProperty(prop.VISIBLE, false)
    selectsBG2.setProperty(prop.VISIBLE, false)
    selectsBG1.setProperty(prop.VISIBLE, false)
    selectsTxt1.setProperty(prop.VISIBLE, false)
    selectsTxt2.setProperty(prop.VISIBLE, false)
    selectsTxt3.setProperty(prop.VISIBLE, false)
    const fImg = createWidget(widget.IMG, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      src: ".png"
    })
    fImg.addEventListener(event.CLICK_DOWN, function (info) {
      if (info.x >= 50 && info.x <= 190 && info.y >= 450 / 2 - 100 + 10 && info.y <= 450 / 2 + 10) {
        modifyWidget = 4
        console.log("current: " + modifyWidget)
        selectBG.setProperty(prop.VISIBLE, false)
        selectsBG1.setProperty(prop.VISIBLE, false)
        selectsBG2.setProperty(prop.VISIBLE, false)
        selectsTxt1.setProperty(prop.VISIBLE, true)
        selectsTxt2.setProperty(prop.VISIBLE, false)
        selectsTxt3.setProperty(prop.VISIBLE, false)
      } else if (info.x >= 50 && info.x <= 190 && info.y >= 450 / 2 + 10 && info.y <= 450 / 2 + 100 + 10) {
        modifyWidget = 5
        console.log("current: " + modifyWidget)
        selectBG.setProperty(prop.VISIBLE, false)
        selectsBG1.setProperty(prop.VISIBLE, false)
        selectsBG2.setProperty(prop.VISIBLE, false)
        selectsTxt1.setProperty(prop.VISIBLE, false)
        selectsTxt2.setProperty(prop.VISIBLE, true)
        selectsTxt3.setProperty(prop.VISIBLE, false)
      } else if (info.x >= 20 && info.x <= 370 && info.y >= 450 / 2 - 100 && info.y <= 450 / 2) {
        modifyWidget = 2
        console.log("current: " + modifyWidget)
        selectBG.setProperty(prop.VISIBLE, false)
        selectsBG1.setProperty(prop.VISIBLE, true)
        selectsBG2.setProperty(prop.VISIBLE, false)
        selectsTxt1.setProperty(prop.VISIBLE, false)
        selectsTxt2.setProperty(prop.VISIBLE, false)
        selectsTxt3.setProperty(prop.VISIBLE, false)
      } else if (info.x >= 20 && info.x <= 370 && info.y >= 450 / 2 && info.y <= 450 / 2 + 100) {
        modifyWidget = 3
        console.log("current: " + modifyWidget)
        selectBG.setProperty(prop.VISIBLE, false)
        selectsBG1.setProperty(prop.VISIBLE, false)
        selectsBG2.setProperty(prop.VISIBLE, true)
        selectsTxt1.setProperty(prop.VISIBLE, false)
        selectsTxt2.setProperty(prop.VISIBLE, false)
        selectsTxt3.setProperty(prop.VISIBLE, false)
      } else if (info.x >= 20 && info.x <= 370 && info.y >= 450 / 2 + 105 && info.y <= 450 / 2 + 105 + 160) {
        modifyWidget = 6
        console.log("current: " + modifyWidget)
        selectBG.setProperty(prop.VISIBLE, false)
        selectsBG1.setProperty(prop.VISIBLE, false)
        selectsBG2.setProperty(prop.VISIBLE, false)
        selectsTxt1.setProperty(prop.VISIBLE, false)
        selectsTxt2.setProperty(prop.VISIBLE, false)
        selectsTxt3.setProperty(prop.VISIBLE, true)
      } else {
        modifyWidget = 1
        console.log("current: " + modifyWidget)
        selectBG.setProperty(prop.VISIBLE, true)
        selectsBG1.setProperty(prop.VISIBLE, false)
        selectsBG2.setProperty(prop.VISIBLE, false)
        selectsTxt1.setProperty(prop.VISIBLE, false)
        selectsTxt2.setProperty(prop.VISIBLE, false)
        selectsTxt3.setProperty(prop.VISIBLE, false)
      }
    })
    new PaletteSelect((390 - px(260)) / 2, (450- px(260 + 60)) / 2, inputColor);
    var current = false
    lightnessMask.setProperty(prop.VISIBLE, false)
    lightnessPointer.setProperty(prop.VISIBLE, false)
    palette.setProperty(prop.VISIBLE, false)
    pointer.setProperty(prop.VISIBLE, false)
    lightness.setProperty(prop.VISIBLE, false)
    if (wanna) {
      subBG.setProperty(prop.VISIBLE, false)
    }
    up = createWidget(widget.BUTTON, {
      x: px(390 / 2 - 150),
      y: px(10),
      w: px(300),
      h: px(45),
      text: "Change",
      radius: 10,
      text_size: 30,
      press_color: 0x0060ff,
      normal_color: 0x0090ff,
      click_func: () => {
        if (!current) {
          current = true
          up.setProperty(prop.MORE, {
            x: px(390 / 2 - 150),
            y: px(10),
            w: px(300),
            h: px(45),
            normal_color: 0x0090ff,
            text: "Select",
          })
          lightnessMask.setProperty(prop.VISIBLE, true)
          lightnessPointer.setProperty(prop.VISIBLE, true)
          palette.setProperty(prop.VISIBLE, true)
          pointer.setProperty(prop.VISIBLE, true)
          lightness.setProperty(prop.VISIBLE, true)
          if (wanna) {
            subBG.setProperty(prop.VISIBLE, true)
          }
        } else {
          current = false
          up.setProperty(prop.MORE, {
            x: px(390 / 2 - 150),
            y: px(10),
            w: px(300),
            h: px(45),
            normal_color: 0x0090ff,
            text: "Change",
          })
          lightnessMask.setProperty(prop.VISIBLE, false)
          lightnessPointer.setProperty(prop.VISIBLE, false)
          palette.setProperty(prop.VISIBLE, false)
          pointer.setProperty(prop.VISIBLE, false)
          lightness.setProperty(prop.VISIBLE, false)
          if (wanna) {
            subBG.setProperty(prop.VISIBLE, false)
          }
        }
      }
    });
    createWidget(widget.IMG, {
      x: 0,
      y: 400,
      src: "y.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      Config.theme.bg = String(colors[0])
      Config.theme.UI = String(colors[1])
      Config.theme.primText = String(colors[2])
      Config.theme.secText = String(colors[3])
      Config.theme.slot = String(colors[4])
      Config.theme.triText = String(colors[5])
      writeFile("conf_keySch", Config)
      push({ url: 'pages/init', param: '...' })
    })
    createWidget(widget.IMG, {
      x: 195,
      y: 400,
      src: "n.png"
    }).addEventListener(event.CLICK_DOWN, () => {
      push({ url: 'pages/init', param: '...' })
    })
  },
  onDestroy() {

  },
});
