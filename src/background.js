
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win;



async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 350,
    minWidth: 600,
    backgroundColor: '#252424',
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  // win.webContents.openDevTools()
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.setMenu(null);
}


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  //creates inital window
  createWindow();

  enableFileProtocol();

  //firsh happens did-finish-load event and then ready-to-show event
  win.webContents.once('did-finish-load', () => {
    console.log('did-finish-load')
    sendFile();
  })
  win.once('ready-to-show', () => {
      console.log('ready-to-show');
      win.show();
  })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

function sendFile(){
  if(isDevelopment && process.argv[2]){
    let videoPath = process.argv[2];
    win.webContents.send("video-path-channel", videoPath);
  }
  else if(!isDevelopment && process.argv[1]){
    let videoPath = process.argv[1];
    win.webContents.send("video-path-channel", videoPath);
  }
  else{
    //application is started without "open with" video
  }
}


//why file protocol: https://github.com/electron/electron/issues/23757#issuecomment-640146333
function enableFileProtocol(){
  protocol.registerFileProtocol('file', (request, callback) => {
    //this is inital string
    //this is necessary for file protocol to work
    // pathname = pathname.replace('file:///', '');
    //this is necessary for whitespaces in path
    // pathname = pathname.replace(/%20/g, ' ');

    //shorthand
    const pathname = decodeURI(request.url.replace('file:///', ''));
    // console.log(pathname)
    callback(pathname);
  });
}

ipcMain.on('video-path-channel', (event, videoPath) => {
  // console.log(videoPath);
  win.webContents.send("video-path-channel", videoPath);
})