
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
    minWidth: 500,
    backgroundColor: '#2e2c29',
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    }
  })

  // win.webContents.openDevTools()
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
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
  createWindow();
  enableFileProtocol();

  win.once('ready-to-show', () => {
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

// ipcMain.on("my-custom-channel", (event, item) => {
//   // console.log(process.argv)
//   win.webContents.send("my-custom-channel", process.argv);
//   //if user clicks on "open with" my electron app
//   //argv[1] is the file path
//   if(process.argv[1]){
//     let filePath = process.argv[1];
//     // only for testing:
//     filePath = "C:\\Users\\aleka\\Documents\\Projects\\video-player\\Big_Buck_Bunny_1080_10s_1MB.mp4";
//     //check for supported types before sending argument
//     // let fileExtension = filePath.split('.').pop();
//     // let possibleExtensions = ['mp4', 'webm', 'ogg'];
//     win.webContents.send("video-path-channel", filePath);
//   }
// });

//why file protocol: https://github.com/electron/electron/issues/23757#issuecomment-640146333
function enableFileProtocol(){
  protocol.registerFileProtocol('file', (request, callback) => {
    //this is inital string
    let pathname = request.url;
    //this is necessary for file protocol to work
    pathname = pathname.replace('file:///', '');
    //this is necessary for whitespaces in path
    pathname = pathname.replace(/%20/g, ' ');
    console.log(pathname)
    callback(pathname);
  });
}