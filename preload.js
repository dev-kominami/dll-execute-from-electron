const electron = require("electron")

electron.contextBridge.exposeInMainWorld(
  // window.requires.xxxでレンダープロセスからアクセスできるようにする
  "requires", {
    register_callback: async () => electron.ipcRenderer.invoke("register_callback"),
    test_print: async () => electron.ipcRenderer.invoke("test_print")
  }
);