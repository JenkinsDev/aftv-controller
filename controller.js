const {spawn} = require('child_process')

const KeyCodes = {
  'up': 'KEYCODE_DPAD_UP',
  'down': 'KEYCODE_DPAD_DOWN',
  'left': 'KEYCODE_DPAD_LEFT',
  'right': 'KEYCODE_DPAD_RIGHT',
  'enter': 'KEYCODE_DPAD_CENTER',
  'back': 'KEYCODE_BACK',
  'home': 'KEYCODE_HOME',
  'space': 'KEYCODE_SPACE',
  'a': 'KEYCODE_A',
  'b': 'KEYCODE_B',
  'c': 'KEYCODE_C',
  'd': 'KEYCODE_D',
  'e': 'KEYCODE_E',
  'f': 'KEYCODE_F',
  'g': 'KEYCODE_G',
  'h': 'KEYCODE_H',
  'i': 'KEYCODE_I',
  'j': 'KEYCODE_J',
  'k': 'KEYCODE_K',
  'l': 'KEYCODE_L',
  'm': 'KEYCODE_M',
  'n': 'KEYCODE_N',
  'o': 'KEYCODE_O',
  'p': 'KEYCODE_P',
  'q': 'KEYCODE_Q',
  'r': 'KEYCODE_R',
  's': 'KEYCODE_S',
  't': 'KEYCODE_T',
  'u': 'KEYCODE_U',
  'v': 'KEYCODE_V',
  'w': 'KEYCODE_W',
  'x': 'KEYCODE_X',
  'y': 'KEYCODE_Y',
  'z': 'KEYCODE_Z',
  'backspace': 'KEYCODE_DEL',
}

class AFTVController {
  constructor(ip) {
    this.ip = ip
  }

  connectToDevice() {
    return runADBCommand('connect ' + this.ip)
  }

  sendKeys(keys) {
    console.log(keys)
    let mappedKeys = keys.map(key => KeyCodes[key])
    runADBCommand('shell input keyevent ' + mappedKeys.join(' '))
  }

  sendKey(key) {
    let keyCode = KeyCodes[key]

    console.debug('Sending input keyevent :' + keyCode)
    runADBCommand('shell input keyevent ' + keyCode)
  }
}

function runADBCommand(command) {
  return new Promise((resolve, reject) => {
    const adb = spawn('adb', command.split(' '))

    let response = ''

    adb.stdout.on('data', data => {
      response = data.toString()
    })

    adb.stderr.on('data', data => {
      response = data.toString()
    })

    adb.on('exit', code => {
      console.log(response)

      if (code === 0 || code === 1) {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}
