const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

/**
 * dll実行の準備
 */
const ffi = require('ffi-napi')
const library_file = "./dll/Dll1.dll"; //dllファイル
const dll = ffi.Library(library_file, {
  register_callback: ["void", ["pointer"]], //callbackの場合の定義
  test_print: ["void", ["string"]],
});

const callback = ffi.Callback("void", ["string"], function(callback) {
  console.log("callback value:", callback)
});
/******************************************** */

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      enableRemoteModule: true,
      contextIsolation: true,
      devTools: true,
      sandbox: true
    }
  });

  /**
   * mainプロセスでddlを実行するためのhandlerを定義
   */
  ipcMain.handle('register_callback', async (_e, _arg) => {
    const res = dll.register_callback(callback)
    process.on('exit', function() {
      callback
    });
    return res;
  });

  ipcMain.handle('test_print', async (_e, _arg) => {
    dll.test_print("test print!!")
  });
  /************************************************** */

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})