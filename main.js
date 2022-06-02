const {app, BrowserWindow, Menu} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', function(){
  //Menu.setApplicationMenu(null);
  createWindow();
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})