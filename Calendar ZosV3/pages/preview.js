
import { Vibrator } from '@zos/sensor'
import { push } from '@zos/router'
import { offGesture } from '@zos/interaction'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const vibrate = new Vibrator()
Page({
  state: {},
  build() {
    push({
      url: 'pages/index',
      param: JSON.stringify({
        preview: true,
        type: 'normal'
      })
    })
  },
  onDestroy() {
   offGesture()
  },
});