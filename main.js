const { app, BrowserWindow } = require('electron')

let win

function createWindow () {

  if(process.platform == "darwin"){
    win = new BrowserWindow({
      width:900,
      height: 800,
      minHeight:650,
      minWidth:600,
      frame:true
     })
  }else{
    win = new BrowserWindow({
      width:900,
      height: 800,
      minHeight:650,
      minWidth:600,
      frame:true
     })
  }
  win.loadFile('./views/editor.html')

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}


const { Menu } = require('electron')

const template = [

  {

    label: "File",
    submenu: [
      { 
        label: "New File",
        click () { console.log("new file clicked") }
    
      },
      { label: "New Folder" },
      { type: "separator" },
      { label: "Save" },
      { label: "Save As" }
    ]

  },

  {
    label: 'View',
    submenu: [
      { label: 'Documents' },
      { label: 'Products' },
      { type: 'separator' },
      { label: 'First Level',
      
        submenu:[
          {
            label:"Second Level",
            submenu:[
              {
                label:"Third Level"
              }
            ]
          }
        ]
    
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },

  {
    label: 'Tools',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
      { role: 'zoomin' },
      { role: 'zoomout' },
    ]
  },

  {
    label: 'Settings',
    submenu: [
      { label: 'Themes' },
      { type: 'separator' },
      { role: 'close' }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )

  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)    

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})