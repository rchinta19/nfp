const {app, BrowserWindow } = require("electron");

require('./index.js');
const path=require('path')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    icon: __dirname + '/Assets/icons/nfpc2.ico',
    webPreferences: {
      preload:path.join(__dirname,"preload.js"),
      nodeIntegration: true,
      // contextIsolation: true,
      // nodeIntegrationInWorker: true,
      // enableRemoteModule: true
    },
  });
  
  mainWindow.loadURL(`http://localhost:1919/`);
  mainWindow.focus();

  // mainWindow.loadFile(__dirname,"/build/index.html")
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}



app.on("ready", createWindow);

app.on("resize", function (e, x, y) {
  mainWindow.setSize(x, y);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});