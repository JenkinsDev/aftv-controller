const {app, BrowserWindow} = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 800,
    frame: false
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.on('ready', createWindow)
